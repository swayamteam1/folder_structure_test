import { Request, Response, NextFunction } from 'express';
import * as service from './auth.service';
import { sendSuccess } from '../../utils/response';
import { HTTP_STATUS } from '../../constants/httpStatus';
import type { AuthenticatedRequest } from '../../types';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.register(req.body);
    return sendSuccess(res, result, 'Registered successfully', HTTP_STATUS.CREATED);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.login(req.body);
    return sendSuccess(res, result, 'Login successful');
  } catch (err) {
    next(err);
  }
};

export const me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await service.getCurrentUser(req.user!.id);
    return sendSuccess(res, user, 'Profile retrieved');
  } catch (err) {
    next(err);
  }
};

export default { register, login, me };
