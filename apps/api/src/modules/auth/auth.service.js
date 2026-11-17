const bcrypt = require('bcryptjs');
const repository = require('./auth.repository');
const { generateToken } = require('../../services/tokenService');

exports.register = async ({ email, password, name }) => {
  const existing = await repository.findByEmail(email);
  if (existing) {
    const error = new Error('A user with this email already exists');
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

exports.login = async ({ email, password }) => {
  const user = await repository.findByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
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

exports.getCurrentUser = async (userId) => {
  return await repository.findById(userId);
};
