const service = require('./auth.service');
const { sendSuccess } = require('../../utils/response');
const { CREATED } = require('../../constants/httpStatus');

exports.register = async (req, res, next) => {
  try {
    const result = await service.register(req.body);
    return sendSuccess(res, result, 'Registered successfully', CREATED);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await service.login(req.body);
    return sendSuccess(res, result, 'Login successful');
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await service.getCurrentUser(req.user.id);
    return sendSuccess(res, user, 'Profile retrieved');
  } catch (err) {
    next(err);
  }
};
