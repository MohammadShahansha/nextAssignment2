import express from 'express';
import { userController } from './users.controller';
const router = express.Router();

router.post('/api/users', userController.creatUser);
export const userRouts = router;
