"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
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
        },
        {
          userName: "Kelsie_Pouros4",
          email: "Vance4@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Aida",
          lastName: "Boyle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Dangelo22",
          email: "Maxie.Mraz@hotmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Vena",
          lastName: "Funk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Fannie_Barrows40",
          email: "Fern.Auer75@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Justen",
          lastName: "Kilback",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Zoila_Kohler45",
          email: "Caesar.Parisian35@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Quinton",
          lastName: "Schneider",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Hilario_Hills",
          email: "Janelle_Bode67@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Adam",
          lastName: "Donnelly",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Lorenz_Senger78",
          email: "Johathan_Schulist63@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Dashawn",
          lastName: "Rohan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Brandi33",
          email: "Christina.Bruen47@hotmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Charlie",
          lastName: "Deckow",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Madilyn_Botsford66",
          email: "Lindsey_Kutch@hotmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Jordi",
          lastName: "White",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Aliza_Cronin",
          email: "Mollie_Lesch@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Ricardo",
          lastName: "Considine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Deven44",
          email: "Jeffery.Windler@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Hector",
          lastName: "Hills",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Asha.Braun85",
          email: "Liza31@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Emmalee",
          lastName: "Satterfield",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Darwin96",
          email: "Cruz_Denesik93@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Vernon",
          lastName: "Shanahan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Else55",
          email: "Tito82@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Leopold",
          lastName: "Sawayn",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Carlotta70",
          email: "Marta43@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Arch",
          lastName: "Okuneva",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Nathan.Kuhlman98",
          email: "Virginie72@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Baylee",
          lastName: "Batz",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Vada.Wolf7",
          email: "Kaylee_Abernathy@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Maryam",
          lastName: "Reilly",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Jabari.Kuhlman12",
          email: "Frankie_Gutmann6@hotmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Camryn",
          lastName: "Batz",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Otto.Schroeder28",
          email: "Terrence.Mayert2@yahoo.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Evan",
          lastName: "Gutmann",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Mavis40",
          email: "Alanna.Bernier19@gmail.com",
          hashedPassword:
            "$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu",
          firstName: "Serena",
          lastName: "MacGyver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
  },
};
