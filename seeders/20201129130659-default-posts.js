'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Posts', postObjs.map(({ }) => ({})));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
