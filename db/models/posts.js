'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    threadId: DataTypes.INTEGER,
    isQuestion: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.Thread, { foreignKey: 'threadId' });
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.belongsToMany(models.User, { through: models.Score });
  };
  return Post;
};
