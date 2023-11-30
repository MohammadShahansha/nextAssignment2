import { Schema, model } from 'mongoose';
import { IUser } from './users.interface';

// const userSchema = new Schema<IUser>({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     avatar: String

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  // orders: [
  //   {
  //     productName: {
  //       type: String,
  //     },
  //     price: {
  //       type: Number,
  //     },
  //     quantity: {
  //       type: Number,
  //     },
  //   },
  // ],
});

export const UserModel = model<IUser>('User', userSchema);
