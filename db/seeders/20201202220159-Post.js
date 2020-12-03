'use strict';

const fs = require('fs');

const threadObjs = [];

const threadStrings = fs.readFileSync(__dirname + '/bulkData/questions.txt', 'utf-8').split('\n gfg');
threadStrings.forEach((threadJSON, index) => {
  if (threadJSON) {
    const { question } = JSON.parse(threadJSON);
    threadObjs.push({ body: question, userId: 1, threadId: index + 1, isQuestion: true, score: 0, createdAt: new Date(), updatedAt: new Date() });
  }
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', threadObjs);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
