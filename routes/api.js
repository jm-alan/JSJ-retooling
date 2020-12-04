const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../utils/server-utils");
const {
  mostPopular,
  mostRecent,
  getThreadsByIds,
  searchThreads
} = require("../utils/queryFunctions");

router.get(
  "/threads",
  asyncHandler(async (req, res) => {
    const idArray = req.query.whatever.split(",");
    const threadObjects = await getThreadsByIds(idArray);
    res.json({ threadObjects });
  })
);

router.get(
  "/recent",
  asyncHandler(async (req, res) => {
    const threads = await mostRecent();
    res.json({ threads });
  })
);

router.get(
  "/popular",
  asyncHandler(async (req, res) => {
    const threads = await mostPopular();
    res.json({ threads });
  })
);

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    const threads = await searchThreads(req.query.search);
    res.json({ threads });
  })
);

module.exports = router;
