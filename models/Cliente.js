module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    });

    Cliente.associate = (models) => {
        Cliente.hasMany(models.OS, { foreignKey: "clienteId", as: "cliente_os" });
    };

    return Cliente;
}
