const express = require('express');
const { Post, Score } = require('../db/models');
const { asyncHandler, requireAuth } = require('../utils/server-utils');

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
        console.log('Blank, upvote, +1');
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote') {
        await Score.create({ userId, postId, isLiked: false });
        await updateScore(postVoting);
        console.log('Blank, downvote, -1');
        res.json({ success: true, score: postVoting.score });
      }
    } else {
      if (method === 'upvote' && userVote.isLiked === true) {
        await userVote.destroy();
        await updateScore(postVoting);
        console.log('Upvote, already liked, destroy, -1');
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'upvote' && userVote.isLiked === false) {
        await userVote.update({ isLiked: true });
        await updateScore(postVoting);
        console.log('Upvote, from downvote, flip, +2');
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote' && userVote.isLiked === false) {
        await userVote.destroy();
        await updateScore(postVoting);
        console.log('Downvote, already disliked, destroy, +1');
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote' && userVote.isLiked === true) {
        await userVote.update({ isLiked: false });
        await updateScore(postVoting);
        console.log('Downvote, from upvote, flip, -2');
        res.json({ success: true, score: postVoting.score });
      }
    }
  }
  res.end();
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
