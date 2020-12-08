'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    isLiked: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Score.associate = function (models) {
    Score.belongsTo(models.User, { foreignKey: 'userId' });
    Score.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  return Score;
};
