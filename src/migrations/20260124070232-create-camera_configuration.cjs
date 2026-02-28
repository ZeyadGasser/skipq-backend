'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('camera_configurations', {
      camera_config_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      branch_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true, // Forces One-to-One
        references: {
          model: 'branches',
          key: 'branch_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('camera_configurations');
  }
};