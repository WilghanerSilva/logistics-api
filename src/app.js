import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { ValidationError } from 'sequelize';
import { TransportadoraRouter } from './Routes/TransportadoraRoutes.js';
import { EncomendaRouter } from './Routes/EncomendaRoutes.js';
import { MovimentacaoRouter } from './Routes/MovimentacaoRoutes.js';
import { swaggerSpec } from './swagger.js';

export const app = express();

app.use(express.json());
app.use('/', EncomendaRouter);
app.use('/', TransportadoraRouter);
app.use('/', MovimentacaoRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});