import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { TransportadoraBD } from './TransportadoraModels.js'; 

// modelo das tabelas do bd
export const EncomendaBD = sequelize.define('EncomendaTable', {
   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    encomenda: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'O campo encomenda é obrigatório!' },
            notEmpty: { msg: 'Campo não pode ser vazio!' }
        }
    },
    identificadorRastreamento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Este identificador de rastreamento já existe!' },
        validate: {
            notNull: { msg: 'O identificador de rastreamento é obrigatório!' },
            notEmpty: { msg: 'Campo não pode ser vazio!' }
        }
    },
    localizacao: { // geocodigo => Plus Code (OLC)
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'O campo localização é obrigatório!' },
            notEmpty: { msg: 'Campo não pode ser vazio!' }
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            notNull: { msg: 'O campo data é obrigatório!' },
            isDate: { msg: 'Data inválida!' }
        }
    },
    previsaoEntrega: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: 'A previsão de entrega é obrigatória!' },
            isDate: { msg: 'Data de previsão inválida!' }
        }
    },
    historicoMovimentacoes: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    }
});


// chaves estrangeiras

TransportadoraBD.hasMany(EncomendaBD, {
    foreignKey: {
        name: 'transportadoraId',
        allowNull: false
    },
    as: 'encomendas'
});

EncomendaBD.belongsTo(TransportadoraBD, {
    foreignKey: {
        name: 'transportadoraId',
        allowNull: false
    },
    as: 'transportadora'
});