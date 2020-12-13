const { Thread } = require('../db/models');

module.exports = async () => {
  const threads = await Thread.findAll({
    order: [['createdAt', 'DESC']],
    limit: 100
  });
  const threadIds = threads.map((thread) => thread.id);
  return threadIds;
};
