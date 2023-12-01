// import { Model } from 'mongoose';

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
  orders?: [
    {
      productName: string;
      price: number;
      quantity: number;
    },
  ];
};

// export interface userStaticModel extends Model<IUser> {
//   isUserExists(id: string): Promise<IUser | null>;
// }

// export type userStaticMethod = {
//   isUserExists(id: string): Promise<IUser>;
// };
// export type userStaticModel = Model<
//   IUser,
//   Record<string, never>,
//   userStaticMethod
// >;
