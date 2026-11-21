import { Router } from 'express';
import { Controller } from '../Controllers/TransportadoraController.js';

export const TransportadoraRouter = Router();

TransportadoraRouter.get('/api/v1/transportadora', Controller.list);
TransportadoraRouter.post('/api/v1/transportadora/create', Controller.create);
TransportadoraRouter.get('/api/v1/transportadora/:id', Controller.listDataById);
TransportadoraRouter.get('/api/v1/transportadora/:id/encomendas', Controller.listEncomendas);
TransportadoraRouter.put('/api/v1/transportadora/update/:id', Controller.update);
TransportadoraRouter.delete('/api/v1/transportadora/delete/:id', Controller.delete);
