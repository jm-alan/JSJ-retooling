'use strict';

const fs = require('fs');

const threadObjs = [];

for (let i = 1; i <= 100; i++) {
  const threadJSON = fs.readFileSync(__dirname + `/fetch/bulkData/questions-and-threads/question${i}.txt`, 'utf-8');
  threadObjs.push({ title: JSON.parse(threadJSON).title, userId: 1, createdAt: new Date(), updatedAt: new Date() });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Threads', threadObjs);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Threads', null, {});
  }
};
