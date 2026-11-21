import { app } from './app.js';
import { sequelize } from './database.js';

const PORT = process.env.PORT ?? 3000;

await sequelize.sync();
app.listen(PORT, () => console.log(`http://localhost:${PORT}  |  docs: http://localhost:${PORT}/docs`));

// configura a coneção com o bd