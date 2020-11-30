'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    passHash: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    const fKey = { foreignKey: 'userId' };
    [models.Post, models.Thread].forEach(model => {
      User.hasMany(model, fKey);
    });
  };
  return User;
};
