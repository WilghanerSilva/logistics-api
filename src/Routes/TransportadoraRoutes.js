import { Router } from 'express';
import { Controller } from '../Controllers/TransportadoraController.js';

export const TransportadoraRouter = Router();

/**
 * @openapi
 * /api/v1/transportadora:
 *   get:
 *     tags:
 *       - Transportadora
 *     summary: Lista as transportadoras
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: false
 *         description: Busca parcial pelo nome
 *         schema:
 *           type: string
 *         example: express
 *     responses:
 *       200:
 *         description: Lista de transportadoras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   nome:
 *                     type: string
 *                     example: Global Express
 *                   formatoData:
 *                     type: string
 *                     example: ISO8601
 *                   listaStatus:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: [PICKED_UP, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
TransportadoraRouter.get('/api/v1/transportadora', Controller.list);
/**
 * @openapi
 * /api/v1/transportadora/create:
 *   post:
 *     tags:
 *       - Transportadora
 *     summary: Cadastra uma transportadora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - formatoData
 *               - listaStatus
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Nova Transportadora
 *               formatoData:
 *                 type: string
 *                 description: Formato em que a transportadora registra as datas
 *                 example: ISO8601
 *               listaStatus:
 *                 type: array
 *                 description: Códigos de status usados pela transportadora, na ordem do fluxo de entrega
 *                 items:
 *                   type: string
 *                 example: [POSTADO, EM_TRANSITO, ENTREGUE]
 *     responses:
 *       201:
 *         description: Transportadora criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 nome:
 *                   type: string
 *                   example: Nova Transportadora
 *                 formatoData:
 *                   type: string
 *                   example: ISO8601
 *                 listaStatus:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [POSTADO, EM_TRANSITO, ENTREGUE]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos ou campo obrigatório ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [O campo nome é obrigatório!]
 */
TransportadoraRouter.post('/api/v1/transportadora/create', Controller.create);
TransportadoraRouter.get('/api/v1/transportadora/:id', Controller.listDataById);
TransportadoraRouter.get('/api/v1/transportadora/:id/encomendas', Controller.listEncomendas);
TransportadoraRouter.put('/api/v1/transportadora/update/:id', Controller.update);
TransportadoraRouter.delete('/api/v1/transportadora/delete/:id', Controller.delete);
