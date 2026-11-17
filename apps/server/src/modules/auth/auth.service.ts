import bcrypt from 'bcryptjs';
import * as repository from './auth.repository';
import { generateToken } from '../../services/tokenService';

export const register = async ({ email, password, name }: any) => {
  const existing = await repository.findByEmail(email);
  if (existing) {
    const error: any = new Error('A user with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await repository.createUser(email, passwordHash, name);

  const token = generateToken({
    id: user.id,
    email: user.email,
    roles: user.roles
  });

  return { user, token };
};

export const login = async ({ email, password }: any) => {
  const user = await repository.findByEmail(email);
  if (!user) {
    const error: any = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error: any = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    roles: user.roles
  });

  const { password_hash, ...safeUser } = user;
  return { user: safeUser, token };
};

export const getCurrentUser = async (userId: number) => {
  return await repository.findById(userId);
};

export default { register, login, getCurrentUser };
