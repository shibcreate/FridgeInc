require('dotenv').config();
const { sign, verify } = require('jsonwebtoken')
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const accessToken = sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];
  if (!accessToken)
    return res.status(401).json({ error: "User not authenticated" });
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET)
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const checkAuth = (req, res, next) => {
  if (typeof req.cookies['access-token'] === 'undefined' || req.cookies['access-token'] === null) {
    req.user = null;
  } else {
    const token = req.cookies['access-token'];
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
    next();
  };

  module.exports = { createToken, validateToken, checkAuth }