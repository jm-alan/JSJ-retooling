// 100 most popular questions

const db = require('../db/models');
const { Op } = require('sequelize');

const mostPopular = async () => {
  const threads = await db.Thread.findAll({ order: [['score', 'DESC']], limit: 100 });
  const threadIds = threads.forEach(thread => thread.id);
  return threadIds;
};

const mostRecent = async () => {
  const threads = await db.Thread.findAll({ order: [['createdAt', 'DESC']], limit: 100 });
  const threadIds = threads.forEach(thread => thread.id);
  return threadIds;
};

const getThreadsByIds = async (idArray) => {
  return await db.Thread.findAll({
    where: {
      id: {
        [Op.or]: [...idArray]
      }
    }
  });
};

module.exports = {
  mostPopular,
  mostRecent,
  getThreadsByIds
};
