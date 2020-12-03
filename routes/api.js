const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils/server-utils');
const { mostPopular, mostRecent, getThreadsByIds } = require('../utils/queryFunctions');

router.get('/recent', asyncHandler(async (req, res) => {
  const array = mostRecent();
  res.json({ array });
}));

router.get('/threads', asyncHandler(async (req, res) => {
  const idArray = req.query.list.split(',');
  const array = await getThreadsByIds(idArray);
  res.json({ array });
}));

module.exports = router;
