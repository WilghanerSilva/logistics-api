import { readFileSync } from 'node:fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
import { ValidationError } from 'sequelize';
import { TransportadoraRouter } from './Routes/TransportadoraRoutes.js';
import { EncomendaRouter } from './Routes/EncomendaRoutes.js';

const openapi = parse(readFileSync(new URL('../docs/openapi.yaml', import.meta.url), 'utf8'));
export const app = express();

app.use(express.json());
app.use('/', EncomendaRouter);
app.use('/', TransportadoraRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});