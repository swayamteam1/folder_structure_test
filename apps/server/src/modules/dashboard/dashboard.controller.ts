import { Request, Response, NextFunction } from 'express';
import * as service from './dashboard.service';
import { sendSuccess } from '../../utils/response';

export const getStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await service.getStats();
    return sendSuccess(res, stats, 'Dashboard statistics');
  } catch (err) {
    next(err);
  }
};

export default { getStats };
