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

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  console.log(result, userId);
  return result;
};

// const updateUserFromDB = async (id: number, userData: IUser) => {
//   console.log(id, userData);
//   const result = await UserModel.findByIdAndUpdate(id, userData, {
//     new: true,
//   });
//   return result;
// };

const updateUserFromDB = async (id: number, userData: IUser) => {
  const result = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.findByIdAndDelete(userId);
  return result;
};

export const userServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
