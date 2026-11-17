const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const { UNAUTHORIZED, FORBIDDEN } = require('../constants/httpStatus');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).json({
      success: false,
      message: 'Authentication token required'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired authentication token'
    });
  }
};

exports.authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(FORBIDDEN).json({ success: false, message: 'Access denied' });
    }
    const hasRole = req.user.roles.some((r) => allowedRoles.includes(r));
    if (!hasRole) {
      return res.status(FORBIDDEN).json({
        success: false,
        message: 'Insufficient permissions for this resource'
      });
    }
    next();
  };
};
