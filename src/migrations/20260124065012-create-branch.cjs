'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('branches', {
      branch_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      account_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: 'accounts',
          key: 'account_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      branch_name: {
        type: Sequelize.CITEXT,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      org_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'organizations',
          key: 'org_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      location_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: 'locations',
          key: 'location_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      org_abbreviation: {
        type: Sequelize.CITEXT,
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

    await queryInterface.addIndex('branches', ['branch_name'], {
      name: 'idx_branch_name'
    });
    await queryInterface.addIndex('branches', ['org_abbreviation'], {
      name: 'idx_org_abbreviation'
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('branches');
  }
};