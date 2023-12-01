import express from 'express';
import { userController } from './users.controller';
const router = express.Router();

router.post('/', userController.creatUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/orders', userController.updateOrderUser);
router.get('/:userId/orders', userController.getAllOrders);
router.get('/:userId/orders/total-price', userController.getTotalPrice);

export const userRouts = router;
