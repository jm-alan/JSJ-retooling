'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    [models.Post, models.Thread, models.Score]
      .forEach(model => {
        User.hasMany(model, { foreignKey: 'userId' });
      });
    User.belongsToMany(models.Post, { through: models.Score });
  };
  return User;
};
