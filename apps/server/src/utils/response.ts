import { Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';

export function sendSuccess(res: Response, data: any = null, message: string = 'Success', statusCode: number = HTTP_STATUS.OK) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function sendError(res: Response, message: string = 'An error occurred', statusCode: number = HTTP_STATUS.BAD_REQUEST, errors: any = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
}

export function sendPaginated(res: Response, items: any[] = [], pagination: any = {}, message: string = 'Fetched data successfully') {
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message,
    data: items,
    pagination
  });
}

export default {
  sendSuccess,
  sendError,
  sendPaginated
};
