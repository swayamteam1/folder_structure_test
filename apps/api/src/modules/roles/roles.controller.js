const service = require('./roles.service');
const { sendSuccess } = require('../../utils/response');

exports.getAll = async (req, res, next) => {
  try {
    const roles = await service.getAllRoles();
    return sendSuccess(res, roles, 'Roles retrieved');
  } catch (err) {
    next(err);
  }
};
