import { IUser } from './users.interface';
import { UserModel } from './users.model';

const createUsersIntoDB = async (user: IUser) => {
  // const userModel = new UserModel(user)
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
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
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await UserModel.findOne({ userId }).select('-password');
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
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found');
  }
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
  const userIdNumber = Number(userId);
  if (!(await UserModel.isUserExists(userIdNumber))) {
    throw new Error('User not found');
  }

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

const getAllOrdersFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  console.log(result, userId);
  return result;
};
const getTotalPriceFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await UserModel.findOne({ userId }, { orders: 1 });
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
