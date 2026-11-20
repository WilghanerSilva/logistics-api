import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const EncomendaBD = sequelize.define('EncomendaTable', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false, // Impede que o campo seja omitido ou nulo
        validate: {
            notNull: { msg: 'O campo nome é obrigatório!' },
            notEmpty: { msg: 'Campo não pode ser vazio!' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Opcional: impede cadastrar dois e-mails iguais
        validate: {
            notNull: { msg: 'O campo email é obrigatório!' },
            isEmail: { msg: 'Email inválido!' }
        }
    }
});