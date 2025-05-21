import React, { useState, useEffect } from "react";
import {
  Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography
} from "@mui/material";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [showChangePass, setShowChangePass] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
    });
    window.location.href = "/"; // redirect to home
  };

  const handleChangePassword = async () => {
    const res = await fetch("http://localhost:5000/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(passwords),
    });
    if (res.ok) {
      alert("Password changed");
      setShowChangePass(false);
    } else {
      const { message } = await res.json();
      alert(message || "Failed");
    }
  };

  const handleDeleteAccount = async () => {
    const res = await fetch("http://localhost:5000/api/auth/delete", {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("Account deleted");
      window.location.href = "/";
    } else {
      alert("Delete failed");
    }
  };

  return (
    <>
      <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        Profile
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem disabled>Hello, {user.name}</MenuItem>
        <MenuItem onClick={() => setShowChangePass(true)}>Change Password</MenuItem>
        <MenuItem onClick={() => setShowDeleteConfirm(true)}>Delete Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Change Password Modal */}
      <Dialog open={showChangePass} onClose={() => setShowChangePass(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setPasswords({ ...passwords, oldPassword: e.target.value })
            }
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="dense"
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChangePass(false)}>Cancel</Button>
          <Button onClick={handleChangePassword}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to permanently delete your account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>No</Button>
          <Button onClick={handleDeleteAccount} color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
