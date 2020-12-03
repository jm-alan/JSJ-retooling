const express = require('express');
const router = express.Router();
const { mostPopular, mostRecent, getThreadById } = require('../utils/queryFunctions');

router.get('/threads', (req, res) => {
  console.log(req.query.banana.split(','))
});

module.exports = router;
