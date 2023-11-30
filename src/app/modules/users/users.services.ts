import { IUser } from './users.interface';
import { UserModel } from './users.model';

const createUsersIntoDB = async (user: IUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

// const getSingleUserFromDB = async (id: number) => {
//   const result = await UserModel.findOne({ id });
//   return result;
// };

const updateUser = async (id: number, userData: IUser) => {
  const result = await UserModel.updateOne({ id, userData });
  return result;
};

export const userServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  // getSingleUserFromDB,
  updateUser,
};
