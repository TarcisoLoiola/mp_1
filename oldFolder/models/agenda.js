module.exports = (sequelize, DataTypes) => {

    const agendas = sequelize.define("agendas", {
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scheduledDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmed: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return agendas;
  };