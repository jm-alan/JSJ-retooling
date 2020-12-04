// 100 most popular questions

const db = require("../db/models");
const { Op } = require("sequelize");

const mostPopular = async () => {
  const threads = await db.Thread.findAll({

    include: [{
      model: db.Post
    }],
    order: [[db.Post, "score", "DESC"]],
    limit: 100

  });
  const threadIds = threads.map((thread) => thread.id);
  return threadIds;
};

const mostRecent = async () => {
  const threads = await db.Thread.findAll({
    order: [["createdAt", "DESC"]],
    limit: 100,
  });
  const threadIds = threads.map((thread) => thread.id);
  return threadIds;
};

const getThreadsByIds = async (idArray) => {
  let returnArr = []
  for (let i = 0; i < idArray.length; i++) {
    const result = await db.Thread.findByPk(idArray[i], {
      include: [{
        model: db.Post
      }, {
        model: db.User
      }]
    })
    returnArr.push(result)
  }
  return returnArr
};

module.exports = {
  mostPopular,
  mostRecent,
  getThreadsByIds,
};
