const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const obj = {
    title: 'This is a JS post!',
    threadId: 14,
    userId: 32,
    userName: 'JSIsAWESOME',
    numberOfAnswers: 10,
    score: 1,
    timeStamp: 'created 5 mins ago by '
  };
  const obj2 = {
    title: 'JS is the best I love it more that I\'ve ever loved anything in my entire life. I love it even more than I love water bottles. Those things are awesome too! JS is the best I love it more that I\'ve ever loved anything in my entire life. I love it even more than I love water bottles. Those things are awesome too!',
    threadId: 14,
    userId: 32,
    userName: 'JSIsAWESOME2',
    numberOfAnswers: 10,
    score: 1,
    timeStamp: 'created 5 mins ago by '
  };
  res.render('index', {
    title: 'Javascript Jungle',
    questions: [obj2, obj, obj, obj, obj, obj, obj, obj, obj, obj]
  });
});

router.get('/login', function (req, res, next) {
  res.redirect('/users/login');
});

router.get('/signup', function (req, res, next) {
  res.redirect('/users');
});

module.exports = router;
