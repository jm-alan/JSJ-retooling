'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Thread.associate = function (models) {
    Thread.belongsTo(models.User, { foreignKey: 'userId' });
    Thread.hasMany(models.Post, { foreignKey: 'threadId' });
  };
  return Thread;
};
