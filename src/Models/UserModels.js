import {DataTypes} from 'sequelize';
import {sequelize} from '../database.js';



// criando um exemplo pra fazer teste
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {msg: 'Campo não pode ser vazio!'}
        }
    },

    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {msg: 'Email inválido!'},
        }
    }
});