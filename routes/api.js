const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const { Thread, Post, User } = require('../db/models');
const { asyncHandler, requireAuth } = require('../utils');
const { searchThreads } = require('../utils');

router.get('/new/:mode/:page(\\d+)', asyncHandler(async (req, res, next) => {
  let { params: { mode, page } } = req;
  mode = mode.toString();
  const count = await Thread.count();
  const pages = Math.ceil((count) / 10);
  if (!mode.match(/[(recent)(popular)]/)) return next(new Error('No.'));
  if (page > pages) return next(new Error('No.'));
  const sort = mode === 'popular' ? 'score' : 'createdAt';
  const threads = await Thread.findAll({
    include: [
      User,
      {
        model: Post,
        where: { isQuestion: true },
        attributes: ['score', 'createdAt']
      }
    ],
    order: [
      [Post, sort, 'DESC']
    ],
    limit: 10,
    offset: page * 10 - 10
  });
  for (let i = 0; i < threads.length; i++) {
    threads[i] = {
      title: threads[i].title,
      id: threads[i].id,
      User: threads[i].User,
      userId: threads[i].userId,
      numberOfAnswers: await threads[i].countPosts({ where: { isQuestion: false } }),
      score: threads[i].Posts[0].score,
      createdAt: threads[i].createdAt
    };
  }
  return res.json({ threads });
}));

router.get('/threads/count', asyncHandler(async (req, res) => {
  const count = await Thread.count();
  res.json({ count });
}));

router.get('/search', asyncHandler(async (req, res) => {
  const threads = await searchThreads(req.query.search);
  res.json({ threads });
})
);

router.get('/build', requireAuth, (_req, res) => {
  const { locals: { authenticated, user: { dataValues: { id: userId } } } } = res;
  if (!authenticated) return res.send('Nope.');
  if (userId !== 3) return res.send('Nope.');

  for (let i = 1; i <= 100; i++) {
    const { body, score } = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../db/seeders/fetch/bulkData/questions-and-threads/question${i}.txt`), 'utf-8'));
    Thread.findByPk(i)
      .then(thread => thread.createSeedQuestion({ body, score }))
      .then(() => {
        if (i === 100) console.log('Question build complete.');
      });
  }

  for (let i = 1; i <= 100; i++) {
    const { answers } = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../db/seeders/fetch/bulkData/questions-and-threads/question${i}.txt`), 'utf-8'));
    answers.forEach(({ body, score }, idx) => {
      Thread.findByPk(i)
        .then(thread => thread.createSeedAnswer({ body, score, userId: Math.floor(Math.random() * 2 + 1) }))
        .then(() => {
          if (i === 100 && idx === answers.length - 1) console.log('Answer build complete.');
        });
    });
  }
  res.end();
});

module.exports = router;
