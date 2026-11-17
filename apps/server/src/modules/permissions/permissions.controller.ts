import { Request, Response, NextFunction } from 'express';
import * as service from './permissions.service';
import { sendSuccess } from '../../utils/response';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const permissions = await service.getAllPermissions();
    return sendSuccess(res, permissions, 'Permissions retrieved');
  } catch (err) {
    next(err);
  }
};

export default { getAll };
