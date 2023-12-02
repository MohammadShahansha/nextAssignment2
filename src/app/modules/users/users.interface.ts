import { Model } from 'mongoose';

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: {
    productName: string;
    price: number;
    quantity: number;
  }[];
};

export interface userStaticModel extends Model<IUser> {
  isUserExists(id: number): Promise<IUser | null>;
}

// export type userInstanceMethod = {
//   isUserExist(id: number): Promise<IUser | null>;
// };
// export type userInstanceModel = Model<
//   IUser,
//   Record<string, never>,
//   userInstanceMethod
// >;
