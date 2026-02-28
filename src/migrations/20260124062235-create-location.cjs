'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      location_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false
      },
      governorate: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });

    await queryInterface.addIndex('locations', ['governorate'], {
      name: 'idx_governorate'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};