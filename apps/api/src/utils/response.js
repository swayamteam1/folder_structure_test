const { OK, BAD_REQUEST } = require('../constants/httpStatus');

function sendSuccess(res, data = null, message = 'Success', statusCode = OK) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function sendError(res, message = 'An error occurred', statusCode = BAD_REQUEST, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
}

function sendPaginated(res, items = [], pagination = {}, message = 'Fetched data successfully') {
  return res.status(OK).json({
    success: true,
    message,
    data: items,
    pagination
  });
}

module.exports = {
  sendSuccess,
  sendError,
  sendPaginated
};
