module.exports = function (sequelize, dataTypes) {
  const banner = sequelize.define("Banner", {
    imageUrl: {
      type: dataTypes.STRING(500),
      allowNull: false,
    },
    href: {
      type: dataTypes.STRING(500),
      allowNull: false,
    },
  });
  return banner;
};
