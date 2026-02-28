'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_types', {
      type_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      type_name: {
        type: Sequelize.ENUM('Organization', 'Branch', 'Root'),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account_types');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_account_types_type_name";');
  }
};