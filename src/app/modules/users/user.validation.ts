import { z } from 'zod';
export const userSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  age: z.number(),
  email: z.string().min(1).email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).default([]),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    )
    .optional(),
});
