const express = require("express");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const router = express.Router();
const db = require("../db/models");
const { asyncHandler } = require("../utils/server-utils");

router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const thread = await db.Thread.findByPk(req.params.id);
    const threadQuestion = await db.Post.findOne({
      where: {
        threadId: thread.id,
        isQuestion: true,
      },
      include: [db.User],
    });
    const threadAnswers = await db.Post.findAll({
      where: {
        threadId: thread.id,
        isQuestion: false,
      },
      include: [db.User],
      order: [["score", "DESC"]],
    });
    res.render("threadPage", {
      title: thread.title,
      threadQuestion,
      threadAnswers,
      csrfToken: req.csrfToken(),
    });
  })
);
//s
router.post(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    // console.log(req.body);
    const newPost = await db.Post.create({
      isQuestion: req.body.isQuestion,
      body: req.body.answerInput,
      threadId: req.params.id,
      userId: req.session.auth.userId,
      score: 0,
    });
    res.json(newPost);
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const deletePost = await db.Post.findByPk(req.params.id);
    const thread = deletePost.isQuestion
      ? await db.Thread.findByPk(deletePost.threadId)
      : null;
    const posts = deletePost.isQuestion
      ? await db.Post.findAll({ where: { threadId: deletePost.threadId } })
      : null;

    if (posts) {
      posts.forEach(async (post) => {
        const scores = await db.Score.findAll({
          where: {
            postId: post.id,
          },
        });
        scores.forEach(async (score) => {
          await score.destroy();
        });
        await post.destroy();
      });
      await thread.destroy();
      res.json({ success: true, isQuestion: true });
    } else {
      const scores = await db.Score.findAll({
        where: {
          postId: deletePost.id,
        },
      });
      scores.forEach(async (score) => {
        await score.destroy();
      });
      await deletePost.destroy();
      res.json({ success: true, isQuestion: false });
    }
  })
);

module.exports = router;
