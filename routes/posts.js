const express = require('express');
const csrf = require('csurf');
const cleaner = require('sanitize-html');
const csrfProtection = csrf({ cookie: true });
const { Post, Thread, Score } = require('../db/models');
const { asyncHandler } = require('../utils');

const router = express.Router();

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
  if (res.locals.authenticated) {
    const newPost = await Post.create({
      isQuestion: false,
      body: cleaner(req.body.answerInput),
      threadId: req.body.threadId,
      userId: req.session.auth.userId,
      score: 0
    });
    res.json({ success: true, id: newPost.id, body: newPost.body });
  } else {
    res.json({ success: false, reason: 'anon' });
  }
}));

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
        await upvote(postVoting);
        // await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote') {
        await Score.create({ userId, postId, isLiked: false });
        await downvote(postVoting);
        // await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      }
    } else {
      if (method === 'upvote' && userVote.isLiked === true) {
        await userVote.destroy();
        await downvote(postVoting);
        // await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'upvote' && userVote.isLiked === false) {
        await userVote.update({ isLiked: true });
        await flipVoteUp(postVoting);
        // await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote' && userVote.isLiked === false) {
        await userVote.destroy();
        await upvote(postVoting);
        // await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      } else if (method === 'downvote' && userVote.isLiked === true) {
        await userVote.update({ isLiked: false });
        await flipVoteDown(postVoting);
        // await updateScore(postVoting);
        res.json({ success: true, score: postVoting.score });
      }
    }
  } else {
    res.json({ success: false, reason: 'anon' });
  }
}));

async function upvote (postObj) {
  await postObj.increment('score');
}

async function downvote (postObj) {
  await postObj.decrement('score');
}

async function flipVoteUp (postObj) {
  await postObj.increment('score', { by: 2 });
}

async function flipVoteDown (postObj) {
  await postObj.decrement('score', { by: 2 });
}

// async function updateScore (postObj) {
//   const likes =
//     await Score.findAll({
//       where: {
//         postId: postObj.id,
//         isLiked: true
//       }
//     });
//   const dislikes =
//     await Score.findAll({
//       where: {
//         postId: postObj.id,
//         isLiked: false
//       }
//     });
//   const score = likes.length - dislikes.length;

//   await postObj.update({ score });
// }

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const postDeleting = await Post.findByPk(req.params.id);
  if (!res.locals.authenticated) res.json({ success: false, reason: 'anon' });
  else if (!postDeleting) res.json({ success: false, reason: 'DNE' });
  else if (postDeleting.userId !== req.session.auth.userId) res.json({ success: false, reason: 'diff' });
  else {
    if (postDeleting.isQuestion) {
      const threadId = postDeleting.threadId;
      const allPosts =
        await Post.findAll({
          where: {
            threadId
          }
        });
      for (const post of allPosts) {
        await Score.destroy({
          where: {
            postId: post.id
          }
        });
        await post.destroy();
      }
      await Thread.destroy({
        where: {
          id: threadId
        }
      });
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
