import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { TransportadoraBD } from './TransportadoraModels.js'; 

export const Encomenda = sequelize.define('Encomenda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  codigoRastreio: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: 'O campo codigoRastreio é obrigatório!' },
      notEmpty: { msg: 'O campo codigoRastreio não pode ser vazio!' }
    }
  },
  origem: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo origem é obrigatório!' },
      notEmpty: { msg: 'O campo origem não pode ser vazio!' }
    }
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo destino é obrigatório!' },
      notEmpty: { msg: 'O campo destino não pode ser vazio!' }
    }
  },
  dataPostagem: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo dataPostagem é obrigatório!' },
      notEmpty: { msg: 'O campo dataPostagem não pode ser vazio!' }
    }
  },
  previsaoEntrega: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O campo previsaoEntrega é obrigatório!' },
      notEmpty: { msg: 'O campo previsaoEntrega não pode ser vazio!' }
    }
  },

}, {
  tableName: 'Encomenda',
  updatedAt: false
});
