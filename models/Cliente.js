const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pessoa = require('./Pessoa');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pessoa,
            key: 'id' 
        }
    }
}, { tableName: 'cliente', timestamps: false });

Cliente.belongsTo(Pessoa, { foreignKey: 'pessoa_id' });

module.exports = Cliente;
