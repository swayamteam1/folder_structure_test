import { Request, Response, NextFunction } from 'express';
import * as service from './roles.service';
import { sendSuccess } from '../../utils/response';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await service.getAllRoles();
    return sendSuccess(res, roles, 'Roles retrieved');
  } catch (err) {
    next(err);
  }
};

export default { getAll };
