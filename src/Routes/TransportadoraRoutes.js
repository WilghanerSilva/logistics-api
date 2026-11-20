import { Router } from 'express';
import { Controller } from '../Controllers/TransportadoraController.js';

export const TransportadoraRouter = Router();

TransportadoraRouter.get('/api/v1/transportadora/list', Controller.list);
TransportadoraRouter.post('/api/v1/transportadora/create', Controller.create);
TransportadoraRouter.get('/api/v1/transportadora/get/:id', Controller.listDataById);
TransportadoraRouter.put('/api/v1/transportadora/update/:id', Controller.update);
TransportadoraRouter.delete('/api/v1/transportadora/delete/:id', Controller.delete);
