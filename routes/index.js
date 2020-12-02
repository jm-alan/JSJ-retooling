const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Javascript Jungle' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login'});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Login', errors: ["this is messed up", "test error"] });
});

module.exports = router;
