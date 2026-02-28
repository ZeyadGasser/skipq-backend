'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_statuses', {
      status_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status_name: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Pending', 'Suspended', 'Rejected'),
        allowNull: false
       }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account_statuses');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_account_statuses_status_name";');
  }
};