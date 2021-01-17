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

  Thread.prototype.createSeedQuestion = async function ({ body, score }) {
    return this.createPost({ body, score, isQuestion: true, userId: this.userId });
  };
  Thread.prototype.createSeedAnswer = async function ({ body, score, userId }) {
    return this.createPost({ body, score, userId, isQuestion: false });
  };
  Thread.prototype.createQuestion = async function ({ body }) {
    return await this.createPost({ body, score: 0, isQuestion: true, userId: this.userId });
  };
  Thread.prototype.createAnswer = async function ({ body, userId }) {
    return await this.createPost({ body, score: 0, isQuestion: false, userId });
  };
  return Thread;
};
