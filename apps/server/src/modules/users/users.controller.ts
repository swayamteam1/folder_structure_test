import { Request, Response, NextFunction } from 'express';
import * as service from './users.service';
import { sendSuccess } from '../../utils/response';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.getAllUsers();
    return sendSuccess(res, users, 'Users retrieved successfully');
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.getUserById(parseInt(req.params.id, 10));
    return sendSuccess(res, user, 'User retrieved');
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.updateUser(parseInt(req.params.id, 10), req.body);
    return sendSuccess(res, updated, 'User updated successfully');
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.deleteUser(parseInt(req.params.id, 10));
    return sendSuccess(res, null, 'User deleted successfully');
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, update, remove };
