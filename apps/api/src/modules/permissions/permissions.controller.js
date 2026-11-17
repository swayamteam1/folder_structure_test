const service = require('./permissions.service');
const { sendSuccess } = require('../../utils/response');

exports.getAll = async (req, res, next) => {
  try {
    const permissions = await service.getAllPermissions();
    return sendSuccess(res, permissions, 'Permissions retrieved');
  } catch (err) {
    next(err);
  }
};
