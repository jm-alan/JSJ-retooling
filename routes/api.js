const express = require('express');
const router = express.Router();
const { mostPopular, mostRecent, getThreadById } = require('../utils/queryFunctions');
const { asyncHandler } = require('../utils/server-utils');

router.get('/threads', (req, res) => {
  const threads = [];
  req.query.list.split(',')
    .forEach(async id => {
      threads.push(await getThreadById(id));
    });
  res.json({ threadObjects });
});

router.get('/recent', asyncHandler(async (req, res) => {
  const threads = await mostRecent();
  res.json({ threads });
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const threads = await mostPopular();
  res.json({ threads });
}));

module.exports = router;
