const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Veiculo = require('./Veiculo');
const Mecanico = require('./Mecanico');

const Servico = sequelize.define('Servico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    veiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Veiculo,
            key: 'id'
        }
    },
    mecanico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Mecanico, key: 'id'
        }
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fim: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'servico',
    timestamps: false
});

Servico.belongsTo(Veiculo, { foreignKey: 'veiculo_id' });
Servico.belongsTo(Mecanico, { foreignKey: 'mecanico_id' });

module.exports = Servico;
