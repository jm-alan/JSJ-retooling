// 100 most popular questions

const db = require('../db/models');
const { Op } = require('sequelize');

const mostPopular = async () => {
  const threads = await db.Thread.findAll({ include: db.Post, order: [['score', 'DESC']], limit: 100 });
  const threadIds = threads.map(thread => thread.id);
  return threadIds;
};

const mostRecent = async () => {
  const threads = await db.Thread.findAll({ include: db.Post, order: [['createdAt', 'DESC']], limit: 100 });
  const threadIds = threads.map(thread => thread.id);
  return threadIds;
};

const getThreadsByIds = async (idArray) => {
  return await db.Thread.findAll({
    where: {
      id: {
        [Op.or]: [...idArray]
      }
    },
    include: db.Post
  });
};

module.exports = {
  mostPopular,
  mostRecent,
  getThreadsByIds
};
