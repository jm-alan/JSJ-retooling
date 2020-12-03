// 100 most popular questions

const db = require('../db/models');

const mostPopular = async () => {
  const threads = await db.Thread.findAll({ where: { isQestion: true }, order: ['score', 'DESC'], limit: 100 });
  const threadIds = threads.forEach(thread => thread.id);
  return threadIds;
};

const mostRecent = async () => {
  const threads = await db.Thread.findAll({ where: { isQuestion: true }, order: ['createdAt', 'DESC'], limit: 100 });
  const threadIds = threads.forEach(thread => thread.id);
  return threadIds;
};

const getThreadById = async (id) => {
  return await db.Thread.findByPk(id);
};

module.exports = {
  mostPopular,
  mostRecent,
  getThreadById
};
