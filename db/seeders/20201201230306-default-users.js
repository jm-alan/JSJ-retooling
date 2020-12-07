"use strict";

const fs = require('fs');

const userObjs = [];

const userJSONs = fs.readFileSync(`${__dirname}/fetch/bulkData/users/users1.txt`, 'utf-8').split('\n');

userJSONs.forEach(userJSON => {
  userObjs.push(userJSON);
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users",
      [
        {
          userName: "demo_user",
          email: "demo@demo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Demo",
          lastName: "Demo",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
