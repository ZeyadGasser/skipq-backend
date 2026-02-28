'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('denominations', {
      denomination_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('denominations');
  }
};