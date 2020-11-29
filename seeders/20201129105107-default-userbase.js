'use strict';
const fs = require('fs');

const userObjs = [];
for (let i = 1; i <= 50; i++) {
  const fileBuffer = fs.readFileSync(`/home/josh/appIO/Project1/JavaScriptJungle/utils/userObjsPage${i}.txt`, 'utf8');
  fileBuffer.split('\n').forEach((userJSON, idx) => {
    if (userJSON) {
      userObjs.push(JSON.parse(userJSON));
    }
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', userObjs.map(({ userName, hashedPass, email, firstName, lastName }) => {
      return { userName, passHash: hashedPass, email, firstName, lastName, createdAt: new Date(), updatedAt: new Date() };
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
