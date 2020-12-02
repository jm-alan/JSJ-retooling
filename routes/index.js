const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Javascript Jungle' });
});

router.get('/login', function (req, res, next) {
  res.redirect('/users/login');
});

router.get('/signup', function (req, res, next) {
  res.redirect('/users');
});

module.exports = router;
