import { Encomenda } from './EncomendaModels.js';
import { Transportadora } from './TransportadoraModels.js';
import { Movimentacao } from './MovimentacaoModels.js';

Transportadora.hasMany(Encomenda, { foreignKey: 'transportadoraID', onDelete: 'CASCADE' });
Encomenda.belongsTo(Transportadora, { foreignKey: 'transportadoraID', onDelete: 'CASCADE' });
Encomenda.hasMany(Movimentacao, { foreignKey: 'encomendaID', onDelete: 'CASCADE' });
Movimentacao.belongsTo(Encomenda, { foreignKey: 'encomendaID', onDelete: 'CASCADE' });

export { Encomenda, Transportadora, Movimentacao };
