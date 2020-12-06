const express = require('express');
const { Post, Thread, Score } = require('../db/models');
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

  await postObj.update({ score });

}

router.delete('/:id(\\d+)', asyncHandler(async(req, res) => {
  const postDeleting = await Post.findByPk(req.params.id);
  if (!res.locals.authenticated) res.json({ success: false, reason: 'anon' })
  else if (!postDeleting) res.json({ success: false, reason: 'DNE' });
  else if (postDeleting.userId !== req.session.auth.userId) res.json({ success: 'false', reason: 'diff' });
  else {
    if (postDeleting.isQuestion) {
      const allPosts =
        await Post.findAll({ where: {
          threadId: postDeleting.threadId
        }});
      allPosts.forEach(async post => {
        await Score.destroy({
          where: {
            postId: post.id
          }
        });
        await post.destroy();
      });
      const thread = await Thread.findByPk(postDeleting.threadId);
      thread.destroy();
      res.json({ success: true, isQuestion: true });
    } else if (!postDeleting.isQuestion) {
      await Score.destroy({
        where: {
          postId: postDeleting.id
        }
      });
      await postDeleting.destroy();
      res.json({ success: true, isQuestion: false });
    }
  }
}));

module.exports = router;
