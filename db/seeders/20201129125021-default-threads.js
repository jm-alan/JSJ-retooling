'use strict';
const fs = require('fs');

const threadObjs = [];
for (let i = 1; i <= 100; i++) {
  const fileBuffer = fs.readFileSync(`/home/josh/appIO/Project1/JavaScriptJungle/utils/threads/page${i}.txt`, 'utf8');
  fileBuffer.split(',\n').forEach(threadJSON => {
    if (threadJSON) {
      threadObjs.push(JSON.parse(threadJSON));
    }
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Threads', threadObjs.map(({ title, userId }) => ({ title, userId, createdAt: new Date(), updatedAt: new Date() })));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Threads', null, {});
  }
};
