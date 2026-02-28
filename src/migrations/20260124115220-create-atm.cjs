'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('atms', {
      atm_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      branch_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'branches',
          key: 'branch_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' 
      },
      location_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'locations',
          key: 'location_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      allows_withdrawal: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      allows_deposit: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
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

    await queryInterface.addIndex('atms', ['branch_id'], {
      name: 'idx_atm_branch'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('atms');
  }
};