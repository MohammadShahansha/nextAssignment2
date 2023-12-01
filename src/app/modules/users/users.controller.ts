import { Request, Response } from 'express';
import { userServices } from './users.services';
import { userSchema } from './user.validation';

const creatUser = async (req: Request, res: Response) => {
  try {
    // const { user } = req.body;
    console.log(req.body);
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
    // const userIdNumber = Number(userId);
    const userData = req.body;
    console.log(userId, req.body);
    const result = await userServices.updateUserFromDB(userId, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const { userId } = req.params;
    const userNumber = Number(userId);
    await userServices.deleteUserFromDB(userNumber);
    res.status(200).json({
      success: true,
      message: 'Users deleted successfully!',
    });
  } catch (err) {
    console.log(err);
  }
};

// order update------------
const updateOrderUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // const userIdNumber = Number(userId);
    const ordersData = req.body.orders;
    console.log(userId, ordersData);
    const result = await userServices.updateOrdersFromDB(userId, ordersData);
    res.status(200).json({
      success: true,
      message: 'User Ordered successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    // console.log(req.params);
    const { userId } = req.params;
    const userNumber = Number(userId);
    const result = await userServices.getAllOrdersFromDB(userNumber);
    res.status(200).json({
      success: true,
      message: 'get ordered successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    // console.log(req.params);
    const { userId } = req.params;
    const userNumber = Number(userId);
    const result = await userServices.getTotalPriceFromDB(userNumber);
    // console.log(result);
    const totalPrice = result?.orders?.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    );
    res.status(200).json({
      success: true,
      message: 'get ordered successfully!',
      data: {
        totalPrice: totalPrice,
      },
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
  deleteUser,
  updateOrderUser,
  getAllOrders,
  getTotalPrice,
};
