exports.adminProtect = (req, res, next) => {
    const { username, password } = req.body || {};
  
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return next();
    }
  
    return res.status(401).json({ message: "Unauthorized" });
  };
  