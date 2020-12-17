const { Post, Thread } = require('../db/models');
const { Op } = require('sequelize');

module.exports = async (searchTerm) => {
  const threads = await Thread.findAll({
    where: {
      title: {
        [Op.like]: `%${searchTerm}%`
      }
    },
    order: [['createdAt', 'DESC']],
    limit: 100
  });
  const bodyThreads = await Post.findAll({
    where: {
      body: {
        [Op.like]: `%${searchTerm}%`
      },
      isQuestion: true
    },
    order: [['createdAt', 'DESC']],
    limit: 100
  });

  const threadIds = threads.map(thread => thread.id);
  const bodyThreadIds = bodyThreads.map(post => post.threadId);
  // console.log("body threads ids", bodyThreadIds);
  const finalThreads = new Set();
  threadIds.forEach(el => finalThreads.add(el));
  bodyThreadIds.forEach(el => finalThreads.add(el));
  return Array.from(finalThreads);
};
