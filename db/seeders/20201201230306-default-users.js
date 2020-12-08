'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          userName: 'Admin',
          email: 'admin@javascriptjungle.com',
          hashedPassword: '$2a$10$PIoUWAjK78TNhHczxGEc1eDqjZsVT3fCBdJr9GKucj58Ykr1MllZC',
          firstName: 'Admin',
          lastName: 'Istrator',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userName: 'demo_user',
          email: 'demo@demo.com',
          hashedPassword:
            '$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu',
          firstName: 'Demo',
          lastName: 'Demo',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
