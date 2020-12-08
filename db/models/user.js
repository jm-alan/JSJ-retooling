'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      hashedPassword: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {}
  );
  User.associate = function (models) {
    const columnMapping = {
      through: 'Score',
      otherKey: 'postId',
      foreignKey: 'userId'
    };
    [models.Post, models.Thread, models.Score].forEach((model) => {
      User.hasMany(model, { foreignKey: 'userId' });
    });
    User.belongsToMany(models.Post, columnMapping);
  };
  return User;
};
