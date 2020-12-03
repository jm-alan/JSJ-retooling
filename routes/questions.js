const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../utils/server-utils');

router.get('/:id', asyncHandler(async (req, res) => {
  const thread = await db.Thread.findByPk(req.params.id);
  const threadQuestion =
    await db.Post.findOne({
      where: {
        threadId: thread.id,
        isQuestion: true
      }
    });
  const threadAnswers =
    await db.Post.findAll({
      where: {
        threadId: thread.id,
        isQuestion: false
      },
      order: [['score', 'DESC']]
    });
  res.render('threadPage', {
    title: thread.title,
    threadQuestion,
    threadAnswers
  });
}));

module.exports = router;
