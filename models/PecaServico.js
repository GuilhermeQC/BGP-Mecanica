const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Servico = require('./Servico');
const Peca = require('./Peca');

const PecaServico = sequelize.define('PecaServico', {
    servico_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Servico, key: 'id' } },
    peca_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Peca, key: 'id' } }
}, { tableName: 'peca_servico', timestamps: false });

PecaServico.belongsTo(Servico, { foreignKey: 'servico_id' });
PecaServico.belongsTo(Peca, { foreignKey: 'peca_id' });

module.exports = PecaServico;
