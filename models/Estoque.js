module.exports = (sequelize, DataTypes) => {
    const Estoque = sequelize.define('Estoque', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        data_aquisicao: {
            type: DataTypes.DATE,
            allowNull: false
        },
        valor_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantidade: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    Estoque.associate = (models) => {
        Estoque.belongsToMany(models.OS, {
            through: "PecaServico",
            foreignKey: "Estoque_id",
            as: "pecas_in_os",
        });
    };

    return Estoque;
}
