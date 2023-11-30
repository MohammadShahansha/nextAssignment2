import { Request, Response } from 'express';
import { userServices } from './users.services';

const creatUser = async (req: Request, res: Response) => {
  try {
    // const { user } = req.body;
    console.log(req.body);
    const result = await userServices.createUsersIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.params);
    const { userId } = req.params;
    const userNumber = Number(userId);
    const result = await userServices.getSingleUserFromDB(userNumber);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const userData = req.body;
    const result = await userServices.updateUser(userIdNumber, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  creatUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
