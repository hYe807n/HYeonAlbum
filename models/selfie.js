module.exports = function (sequelize, DataTypes) {
  const selfie = sequelize.define("Selfie", {
    weather: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    short: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    feeling: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 0,
    },
  });
  return selfie;
};
