module.exports = (sequelize, DataTypes) => {
    const OS = sequelize.define('OS', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "ativo",
        }
    });

    OS.associate = (models) => {
        OS.belongsTo(models.OS, { foreignKey: "clienteId", as: "cliente_os" });
        OS.belongsToMany(models.Estoque, {
            through: "PecaServico",
            foreignKey: "OS_id",
            as: "pecas_in_os",
        });
    };

    return OS;
}
