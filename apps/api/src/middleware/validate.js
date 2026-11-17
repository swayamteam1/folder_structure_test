const { BAD_REQUEST } = require('../constants/httpStatus');

module.exports = (validateFn) => {
  return (req, res, next) => {
    const { isValid, errors } = validateFn(req.body);
    if (!isValid) {
      return res.status(BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    next();
  };
};
