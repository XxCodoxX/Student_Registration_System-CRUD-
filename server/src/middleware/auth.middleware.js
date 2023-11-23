const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
    const bearer = req.headers['authorization'];
    let token = bearer.split(" ")[1];

  if (!token) return res.status(401).json({type:"Error", message: "Access denied" });
  

  jwt.verify(token, process.env.JWT_AUTH_TOKEN, (err, user) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({type:"Error", message: 'Token expired' });
        } else {
          return res.status(403).json({type:"Error", message: 'Invalid token' });
        }
      }
    req.user = user;
    next();
  });
}

module.exports = authMiddleware;