'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      service_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      camera_view_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'camera_views',
          key: 'camera_view_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Index for faster lookups when checking services for a specific camera
    await queryInterface.addIndex('services', ['camera_view_id'], {
      name: 'idx_service_camera_view'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};