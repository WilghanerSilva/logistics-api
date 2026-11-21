import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Transportadora = sequelize.define('Transportadora', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo nome é obrigatório!' },
      notEmpty: { msg: 'Campo não pode ser vazio!' }
    }
  },
  formatoData: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo Formato Data é obrigatório' },
      notEmpty: { msg: 'O campo não pode ser vazio!' }
    }
  },

  listaStatus: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    validate: {
      notNull: { msg: 'O campo listaStatus é obrigatório!' },
      notEmpty: { msg: 'O campo listaStatus não pode ser vazio!' }
    }
  }
}, {
  tableName: 'Transportadora',
  updatedAt: false,
});
