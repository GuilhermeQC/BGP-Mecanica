const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Peca = sequelize.define('Peca', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(45), allowNull: false },
    data_aquisicao: { type: DataTypes.DATE, allowNull: false },
    valor_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'peca', timestamps: false });

module.exports = Peca;
