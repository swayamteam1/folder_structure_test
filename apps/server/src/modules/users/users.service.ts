import * as repository from './users.repository';

export const getAllUsers = async () => {
  return await repository.findAll();
};

export const getUserById = async (id: number) => {
  const user = await repository.findById(id);
  if (!user) {
    const error: any = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const updateUser = async (id: number, data: any) => {
  return await repository.update(id, data);
};

export const deleteUser = async (id: number) => {
  return await repository.remove(id);
};

export default { getAllUsers, getUserById, updateUser, deleteUser };
