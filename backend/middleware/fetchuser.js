const jwt = require("jsonwebtoken");
const JWT_SECRET = 'jai-mata-di';

const fetchuser = (req, res, next) => {
  // Get token from header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid Token" });
  }
};

module.exports = fetchuser;
