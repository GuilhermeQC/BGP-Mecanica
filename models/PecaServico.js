module.exports = (sequelize, DataTypes) => {
    const PecaServico = sequelize.define('PecaServico', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return PecaServico;
}
