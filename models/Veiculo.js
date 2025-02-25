 const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Veiculo = sequelize.define('Veiculo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cliente_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cliente, key: 'id' } },
    marca: { type: DataTypes.STRING(45), allowNull: false },
    modelo: { type: DataTypes.STRING(45), allowNull: false },
    ano: { type: DataTypes.INTEGER, allowNull: false },
    placa: { type: DataTypes.STRING(10), allowNull: false, unique: true }
}, { tableName: 'carro', timestamps: false });

Veiculo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

module.exports = Veiculo;
