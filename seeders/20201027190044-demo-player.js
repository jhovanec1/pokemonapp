'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Players",
      [
        {
            name: 'Player1',
            password: 'player1',
            email: 'player1@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            teamId: 1,
        },
        {
            name: 'Player2',
            password: 'player2',
            email: 'player2@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            teamId: 1,
        },
        {
            name: 'Player3',
            password: 'player3',
            email: 'player3@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            teamId: 1,
        }
    ],
    {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
