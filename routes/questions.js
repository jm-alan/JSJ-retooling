const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const router = express.Router();
const { Post, Thread, User } = require('../db/models');
const { asyncHandler } = require('../utils');

router.get(
  '/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = req.session.auth
      ? req.session.auth.userId
      : null;
    const thread = await Thread.findByPk(req.params.id);
    const threadId = thread.id;
    const threadQuestion = await Post.findOne({
      where: {
        threadId,
        isQuestion: true
      },
      include: [User]
    });
    const threadAnswers = await Post.findAll({
      where: {
        threadId,
        isQuestion: false
      },
      include: [User],
      order: [['score', 'DESC']]
    });

    res.render('threadPage', {
      title: thread.title,
      threadQuestion,
      threadAnswers,
      userId,
      csrfToken: req.csrfToken()
    });
  })
);

router.get('/new', csrfProtection, function (req, res) {
  if (res.locals.authenticated) {
    res.render('new-question', {
      csrfToken: req.csrfToken(),
      bodyVal: '',
      titleVal: ''
    });
  } else {
    res.redirect('/users/login');
  }
});

router.post('/',
  csrfProtection,
  asyncHandler(async (req, res) => {
    if (!res.locals.authenticated) return res.send('You must be logged in to ask a question.');

    const errors = [];

    if (!req.body.title) {
      errors.push('The question must have a title.');
    }

    if (!req.body.body) {
      errors.push('The question must have a body.');
    }

    if (errors.length === 0) {
      const threadObj = {
        title: req.body.title,
        userId: res.locals.user.dataValues.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const thread = await Thread.create(threadObj);
      const postObj = {
        body: req.body.body,
        userId: res.locals.user.dataValues.id,
        threadId: thread.id,
        isQuestion: true,
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await Post.create(postObj);
      res.redirect(`/questions/${thread.id}`);
    } else {
      res.render('new-question', {
        errors,
        csrfToken: req.csrfToken(),
        bodyVal: req.body.body,
        titleVal: req.body.title
      });
    }
  }));

module.exports = router;
