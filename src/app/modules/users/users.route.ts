import express from 'express';
import { userController } from './users.controller';
const router = express.Router();

router.post('/', userController.creatUser);
router.get('/', userController.getAllUsers);
// router.get('/:userId', userController.getSingleUser);
export const userRouts = router;
