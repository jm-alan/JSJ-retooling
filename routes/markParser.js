const marked = require('marked');
const express = require('express');
const cleaner = require('sanitize-html');
const router = express.Router();

router.post('/parse', (req, res) => {
  res.json();
});

module.exports = router;
