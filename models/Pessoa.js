const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pessoa = sequelize.define('Pessoa', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(45), allowNull: false },
    data_nasc: { type: DataTypes.DATE, allowNull: false },
    cpf: { type: DataTypes.STRING(45), allowNull: false, unique: true },
    telefone: { type: DataTypes.STRING(45), allowNull: false }
}, { tableName: 'pessoa', timestamps: false });

module.exports = Pessoa;
 
