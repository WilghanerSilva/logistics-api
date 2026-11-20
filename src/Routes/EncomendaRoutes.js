import { Router } from 'express';
import { Controller } from '../Controllers/EncomendaController.js';

export const EncomendaRouter = Router();

EncomendaRouter.get('/api/v1/encomenda/list', Controller.list);
EncomendaRouter.post('/api/v1/encomenda/create', Controller.create);
EncomendaRouter.get('/api/v1/encomenda/get/:id', Controller.listDataById);
EncomendaRouter.put('/api/v1/encomenda/update/:id', Controller.update);
EncomendaRouter.delete('/api/v1/encomenda/delete/:id', Controller.delete);
