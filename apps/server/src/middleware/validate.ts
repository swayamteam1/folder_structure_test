import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';

export const validate = (validateFn: (body: any) => { isValid: boolean; errors: any }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { isValid, errors } = validateFn(req.body);
    if (!isValid) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    next();
  };
};

export default validate;
