'use strict';

const dataRevenues = require('../data/revenues.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Revenues', dataRevenues, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Revenues', null, {});
  }
};
