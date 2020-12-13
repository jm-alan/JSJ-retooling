const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { Thread, Post } = require('../db/models');
const { asyncHandler } = require('../utils');

router.get('/new-question', csrfProtection, function (req, res) {
  if (res.locals.authenticated) {
    res.render('newQuestion', {
      csrfToken: req.csrfToken(),
      bodyVal: '',
      titleVal: ''
    });
  } else {
    res.redirect('/users/login');
  }
});

router.post(
  '/new-question',
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
      res.render('newQuestion', {
        errors,
        csrfToken: req.csrfToken(),
        bodyVal: req.body.body,
        titleVal: req.body.title
      });
    }
  })
);

module.exports = router;
