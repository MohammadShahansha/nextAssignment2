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

const updateUserFromDB = async (userId: string, userData: IUser) => {
  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// const updateUserFromDB = async (
//   userId: string,
//   userData: IUser,
// ): Promise<IUser | null> => {
//   const result = await UserModel.findOneAndUpdate(
//     { userId: userId },
//     userData,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
//   return result;
// };

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

// const updateOrdersFromDB = async (userId: string, userData: IUser) => {
//   const result = await UserModel.findOneAndUpdate({ userId }, userData, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

const updateOrdersFromDB = async (
  userId: string,
  ordersData: { poductName: string; price: number; quantity: number }[],
): Promise<IUser | null> => {
  try {
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: { $each: [ordersData] } } },
      { new: true, runValidators: true },
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllOrdersFromDB = async () => {
  const result = await UserModel.aggregate([{ $project: { orders: 1 } }]);
  return result;
};
const getTotalPriceFromDB = async () => {
  const result = await UserModel.aggregate([{ $project: { orders: 1 } }]);
  return result;
};

export const userServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  updateOrdersFromDB,
  getAllOrdersFromDB,
  getTotalPriceFromDB,
};
