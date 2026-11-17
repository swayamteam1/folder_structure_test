const service = require('./dashboard.service');
const { sendSuccess } = require('../../utils/response');

exports.getStats = async (req, res, next) => {
  try {
    const stats = await service.getStats();
    return sendSuccess(res, stats, 'Dashboard statistics');
  } catch (err) {
    next(err);
  }
};
