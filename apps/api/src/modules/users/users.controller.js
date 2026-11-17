const service = require('./users.service');
const { sendSuccess } = require('../../utils/response');

exports.getAll = async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    return sendSuccess(res, users, 'Users retrieved successfully');
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await service.getUserById(req.params.id);
    return sendSuccess(res, user, 'User retrieved');
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await service.updateUser(req.params.id, req.body);
    return sendSuccess(res, updated, 'User updated successfully');
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await service.deleteUser(req.params.id);
    return sendSuccess(res, null, 'User deleted successfully');
  } catch (err) {
    next(err);
  }
};
