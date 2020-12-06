'use strict';

const fs = require('fs');

const postObjs = [];

for (let i = 1; i <=100; i++) {
  const { body, score } = JSON.parse(fs.readFileSync(`${__dirname}/fetch/bulkData/question${i}.txt`,'utf-8'));
  postObjs.push({ body, userId: 1, threadId: i, isQuestion: true, score, createdAt: new Date(), updatedAt: new Date() });
}

for (let i = 1; i <= 100; i++) {
  const { answers } = JSON.parse(fs.readFileSync(`${__dirname}/fetch/bulkData/question${i}.txt`,'utf-8'));
  answers.forEach(({ body, score }, idx) => {
    postObjs.push({ body, userId: 1, threadId: i, isQuestion: false, score, createdAt: new Date(), updatedAt: new Date() });
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', postObjs);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
