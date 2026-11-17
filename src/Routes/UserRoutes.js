import {Router} from 'express';
import {UserController} from '../Controllers/UserControllers.js';

export const userRouter = Router();

// definindo as rotas
userRouter.get('/users', UserController.ListUsers);
userRouter.post('/users', UserController.CreateUser);