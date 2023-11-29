import { Request, Response } from 'express';
import { userServices } from './users.services';

const creatUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUsersIntoDB(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  creatUser,
};
