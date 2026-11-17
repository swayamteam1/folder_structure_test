const jwt = require('jsonwebtoken');
const config = require('../config/environment');

exports.generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};
