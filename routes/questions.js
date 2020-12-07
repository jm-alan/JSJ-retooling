const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../utils/server-utils');
const cleaner = require('sanitize-html');

router.get(
  '/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const thread = await db.Thread.findByPk(req.params.id);
    const threadQuestion = await db.Post.findOne({
      where: {
        threadId: thread.id,
        isQuestion: true
      },
      include: [db.User]
    });
    let threadAnswers = await db.Post.findAll({
      where: {
        threadId: thread.id,
        isQuestion: false
      },
      include: [db.User],
      order: [['score', 'DESC']]
    });
    // Sanitizing HTML in answers, just in case.
    threadAnswers = threadAnswers.map(({ body, score, id }) => ({ body: cleaner(body), score, id }));
    res.render('threadPage', {
      title: thread.title,
      threadQuestion,
      threadAnswers,
      csrfToken: req.csrfToken()
    });
  })
);
// s
router.post(
  '/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    if (res.locals.authenticated) {
      const newPost = await db.Post.create({
        isQuestion: req.body.isQuestion,
        body: req.body.answerInput,
        threadId: req.params.id,
        userId: req.session.auth.userId,
        score: 0
      });
      res.json({ success: true, id: newPost.id });
    } else {
      res.json({ success: false, reason: 'anon' });
    }
  })
);

module.exports = router;
