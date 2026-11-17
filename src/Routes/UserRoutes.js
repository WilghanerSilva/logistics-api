import {Router} from 'express';
import {UserController} from '../Controllers/UserControllers.js';

export const userRouter = Router();

// definindo as rotas
// pegando da tabela USERS
userRouter.get('/users', UserController.ListUsers);

// Criando um usuario na tabela USERS
userRouter.post('/users', UserController.CreateUser);