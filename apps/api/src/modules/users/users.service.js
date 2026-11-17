const repository = require('./users.repository');

exports.getAllUsers = async () => {
  return await repository.findAll();
};

exports.getUserById = async (id) => {
  const user = await repository.findById(id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

exports.updateUser = async (id, data) => {
  return await repository.update(id, data);
};

exports.deleteUser = async (id) => {
  return await repository.delete(id);
};
