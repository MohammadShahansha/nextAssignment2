import { Request, Response } from 'express';
import { userServices } from './users.services';
import { userSchema } from './user.validation';

const creatUser = async (req: Request, res: Response) => {
  try {
    const zodParseData = userSchema.parse(req.body);
    const result = await userServices.createUsersIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
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
    const { userId } = req.params;
    const userNumber = Number(userId);
    const result = await userServices.getSingleUserFromDB(userNumber);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const userData = req.body;
    const result = await userServices.updateUserFromDB(userIdNumber, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userNumber = Number(userId);
    await userServices.deleteUserFromDB(userNumber);
    res.status(200).json({
      success: true,
      message: 'Users deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// order update------------
const updateOrderUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ordersData = req.body.orders;
    await userServices.updateOrdersFromDB(userId, ordersData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userNumber = Number(userId);
    const result = await userServices.getAllOrdersFromDB(userNumber);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userNumber = Number(userId);
    const result = await userServices.getTotalPriceFromDB(userNumber);
    const totalPrice = result?.orders?.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  creatUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateOrderUser,
  getAllOrders,
  getTotalPrice,
};
