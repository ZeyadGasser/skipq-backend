'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      role_name: {
        type: Sequelize.ENUM('SUPER_ADMIN', 'BRANCH_MANAGER', 'DEVELOPER_ADMIN'),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_roles_role_name";');
  }
};