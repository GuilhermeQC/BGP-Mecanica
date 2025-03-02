const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pessoa = require('./Pessoa');

const Mecanico = sequelize.define('Mecanico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    funcao: { type: DataTypes.STRING(45), allowNull: false },
    pessoa_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Pessoa, key: 'id' } }
}, { tableName: 'mecanico', timestamps: false });

Mecanico.belongsTo(Pessoa, { foreignKey: 'pessoa_id' });

module.exports = Mecanico;
 
