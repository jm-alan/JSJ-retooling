const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../utils/server-utils');

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const thread = await db.Thread.findByPk(req.params.id);
  const threadQuestion =
    await db.Post.findOne({
      where: {
        threadId: thread.id,
        isQuestion: true
      },
      include: [db.User]
    });
  const threadAnswers =
    await db.Post.findAll({
      where: {
        threadId: thread.id,
        isQuestion: false
      },
      include: [db.User],
      order: [['score', 'DESC']]
    });
  res.render('threadPage', {
    title: thread.title,
    threadQuestion,
    threadAnswers,
    csrfToken: req.csrfToken()
  });
}));

router.post('/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log(req.body);
  // const newPost = await db.Post.create({ body: req.body.answerInput, threadId: req.params.id, userId: req.session.auth.userId, score: 0 });
  // res.json(newPost);
  }));

module.exports = router;
