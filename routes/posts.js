const express = require('express');
const { Post, Score } = require('../db/models');
const { asyncHandler } = require('../utils/server-utils');

const router = express.Router();

router.post('/:id(\\d+)/:method', asyncHandler(async (req, res) => {
  if (res.locals.authenticated) {
    const { method } = req.params;
    const { userId } = req.session.auth;
    const postId = req.params.id;
    const postVoting =
      await Post.findByPk(postId);
    const userVote =
      await Score.findOne({
        where: {
          userId,
          postId
        }
      });
    if (!userVote) {
      if (method === 'upvote') {
        await Score.create({ userId, postId, isLiked: true });
        await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote') {
        await Score.create({ userId, postId, isLiked: false });
        await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      }
    } else {
      if (method === 'upvote' && userVote.isLiked === true) {
        await userVote.destroy();
        await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'upvote' && userVote.isLiked === false) {
        await userVote.update({ isLiked: true });
        await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote' && userVote.isLiked === false) {
        await userVote.destroy();
        await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote' && userVote.isLiked === true) {
        await userVote.update({ isLiked: false });
        await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      }
    }
  } else {
    res.json({ success: false, reason: 'anon' });
  }
}));

async function updateScore (postObj) {
  const likes =
    await Score.findAll({
      where: {
        postId: postObj.id,
        isLiked: true
      }
    });
  const dislikes =
    await Score.findAll({
      where: {
        postId: postObj.id,
        isLiked: false
      }
    });
  const score = likes.length - dislikes.length;
  console.log(score);
  await postObj.update({ score });
  console.log('New score:', postObj.score);
}

module.exports = router;
