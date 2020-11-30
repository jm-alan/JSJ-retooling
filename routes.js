const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('./db/models');

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  res.redirect('/page/1');
}));

router.get('/page/:pg(\\d+)', asyncHandler(async (req, res) => {
  const threads = await db.Thread.findAll({ limit: 10, offset: (req.params.pg * 10) - 10 });
  res.render('home', {
    pageTitle: 'Home',
    threads
  });
}));

router.get('/book/add', csrfProtection, (req, res) => {
  res.render('book-add', {
    title: 'Add Book',
    csrfToken: req.csrfToken()
  });
});

const questionValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Body cannot be empty')
];

router.post('/book/add', csrfProtection, questionValidators,
  asyncHandler(async (req, res) => {
    const {
      title,
      body
    } = req.body;

    const thread = db.Thread.build({
      title
    });

    const post = db.Post.build({
      body
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await thread.save();
      await post.save();
      res.redirect(`/questions/${thread.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('/', {
        pageTitle: 'Ask a Question',
        title,
        body,
        errors,
        csrfToken: req.csrfToken()
      });
    }
  }));

router.get('/question/:id(\\d+)/edit', csrfProtection,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);
    res.render('post-edit', {
      pageTitle: 'Edit Post',
      book,
      csrfToken: req.csrfToken()
    });
  }));

router.post('/question/:id(\\d+)/edit', csrfProtection, questionValidators,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postToUpdate = await db.Post.findByPk(postId);

    const {
      body
    } = req.body;

    const book = {
      body
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await postToUpdate.update(book);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('post-edit', {
        pageTitle: 'Edit Post',
        body,
        errors,
        csrfToken: req.csrfToken()
      });
    }
  })
);

router.get('/post/:id(\\d+)/delete', csrfProtection, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await db.Book.findByPk(postId);
  const isQuestion = post.isQuestion;
  res.render('post-delete', {
    title: 'Delete Post',
    post,
    isQuestion,
    csrfToken: req.csrfToken()
  });
}));

router.post('/post/:id(\\d+)/delete', csrfProtection, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await db.Book.findByPk(postId);
  const thread = post.isQuestion ? post.threadId : null;
  const allPosts = thread ? db.Post.findAll({ where: { threadId: thread.id } }) : null;
  if (allPosts) {
    allPosts.forEach(post => {
      post.destroy();
    });
    thread.destroy();
  } else await post.destroy();
  res.redirect('/');
}));

module.exports = router;
