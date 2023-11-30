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

// const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     const result = await userServices.getSingleUserFromDB(userId);
//     res.status(200).json({
//       success: true,
//       message: 'Users fetched successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const userController = {
  creatUser,
  getAllUsers,
  // getSingleUser,
};
