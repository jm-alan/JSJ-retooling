'use strict';

const fs = require('fs');

const threadObjs = [];

const threadStrings = fs.readFileSync(__dirname + '/bulkData/questions.txt', 'utf-8').split('\n gfg');
threadStrings.forEach(threadJSON => {
  if (threadJSON) {
    const { title } = JSON.parse(threadJSON);
    threadObjs.push({ title, userId: 1, createdAt: new Date(), updatedAt: new Date() });
  }
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Threads', threadObjs);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Threads', null, {});
  }
};
