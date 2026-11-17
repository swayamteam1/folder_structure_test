import jwt from 'jsonwebtoken';
import { config } from '../config/environment';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as any
  });
};

export default { generateToken };
