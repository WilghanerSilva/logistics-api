import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

// modelo das tabelas do bd
export const TransportadoraBD = sequelize.define('TransportadoraTable', {
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
    }
});