import { Schema, model } from 'mongoose';
import { IUser, userStaticModel } from './users.interface';
import bcript from 'bcrypt';
import config from '../../config';

// const userSchema = new Schema<IUser>({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     avatar: String
// , userStaticModel

const userSchema = new Schema<IUser, userStaticModel>({
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
  orders: [
    {
      productName: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcript.hash(
    user.password,
    Number(config.bcript_salt_round),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<IUser, userStaticModel>('user', userSchema);
