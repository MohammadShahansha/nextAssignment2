import { IUser } from './users.interface';
import { User } from './users.model';

const createUsersIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

export const userServices = {
  createUsersIntoDB,
};
