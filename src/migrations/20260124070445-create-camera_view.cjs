'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('camera_views', {
      camera_view_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      camera_config_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'camera_configurations',
          key: 'camera_config_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      target_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'view_targets',
          key: 'target_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      waitingPeopleCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      channel_number: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      stream_url: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    // Composite index to speed up lookups for a specific camera channel on a config
    await queryInterface.addIndex('camera_views', ['camera_config_id', 'channel_number'], {
      name: 'idx_camera_channel'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('camera_views');
  }
};