// 100 most popular questions

const db = require("../db/models");
const { Op } = require("sequelize");
const { body } = require("express-validator");

const mostPopular = async () => {
  const threads = await db.Thread.findAll({
    include: [
      {
        model: db.Post,
      },
    ],
    order: [[db.Post, "score", "DESC"]],
    limit: 100,
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

const searchThreads = async (searchTerm) => {
  const threads = await db.Thread.findAll({
    where: {
      title: { [Op.like]: `%${searchTerm}%` },
    },
    order: [["createdAt", "DESC"]],
    limit: 100,
  });
  const bodyThreads = await db.Post.findAll({
    where: {
      body: { [Op.like]: `%${searchTerm}%` },
      isQuestion: true,
    },
    order: [["createdAt", "DESC"]],
    limit: 100,
  });
  // console.log("threads", threads);
  // console.log("body threads", bodyThreads);
  const threadIds = threads.map((thread) => thread.id);
  const bodyThreadIds = bodyThreads.map((posts) => posts.threadId);
  // console.log("body threads ids", bodyThreadIds);
  const finalThreads = new Set();
  threadIds.forEach((el) => {
    finalThreads.add(el);
  });
  bodyThreadIds.forEach((el) => {
    finalThreads.add(el);
  });
  return Array.from(finalThreads);
};

const getThreadsByIds = async (idArray) => {
  let returnArr = [];
  for (let i = 0; i < idArray.length; i++) {
    const result = await db.Thread.findByPk(idArray[i], {
      include: [
        {
          model: db.Post,
        },
        {
          model: db.User,
        },
      ],
    });
    returnArr.push(result);
  }
  return returnArr;
};

module.exports = {
  mostPopular,
  mostRecent,
  getThreadsByIds,
  searchThreads,
};
