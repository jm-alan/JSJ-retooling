const { Post, Thread } = require('../db/models');

module.exports = async () => {
  const threads = await Thread.findAll({
    include: [
      {
        model: Post,
        where: {
          isQuestion: true
        }
      }
    ],
    order: [[Post, 'score', 'DESC']],
    limit: 100
  });
  const threadIds = threads.map((thread) => thread.id);
  return threadIds;
};
