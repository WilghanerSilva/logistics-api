import { Router } from 'express';
import { Controller } from '../Controllers/MovimentacaoController.js';

export const MovimentacaoRouter = Router();

MovimentacaoRouter.get('/api/v1/movimentacao/list', Controller.list);
MovimentacaoRouter.post('/api/v1/movimentacao/create', Controller.create);
