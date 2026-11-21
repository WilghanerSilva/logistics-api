import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Movimentacao = sequelize.define('Movimentacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo status é obrigatório!' },
      notEmpty: { msg: 'O campo status não pode ser vazio!' },
      async pertenceATransportadora(status) {
        const { Encomenda, Transportadora } = sequelize.models;
        const encomenda = await Encomenda.findByPk(this.encomendaID, { include: Transportadora });
        if (!encomenda) throw new Error(`Encomenda ${this.encomendaID} não encontrada!`);
        const { nome, listaStatus } = encomenda.Transportadora;
        if (!listaStatus.includes(status)) {
          throw new Error(`Status "${status}" não existe na transportadora ${nome}. Válidos: ${listaStatus.join(', ')}`);
        }
      }
    }
  },
  latitude: {
    type: DataTypes.DECIMAL(8, 6),
    allowNull: false,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
    validate: { min: -180, max: 180 }
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo local é obrigatório!' },
      notEmpty: { msg: 'O campo local não pode ser vazio!' }
    }
  },
  dataHora: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo dataHora é obrigatório!' },
      notEmpty: { msg: 'O campo dataHora não pode ser vazio!' }
    }
  },
}, {
  tableName: 'Movimentacao',
  name: { singular: 'Movimentacao', plural: 'Movimentacoes' },
  updatedAt: false
})
