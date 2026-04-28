'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('atms', 'isActive');

    await queryInterface.addColumn('atms', 'atm_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('atms', 'atm_name');

    // ensure clean state
    await queryInterface.sequelize.query(`
      ALTER TABLE atms DROP COLUMN IF EXISTS "isActive";
    `);

    await queryInterface.addColumn('atms', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  }
};