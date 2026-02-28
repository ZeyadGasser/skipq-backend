'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizations', {
      org_id: {
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
      org_name: {
        type: Sequelize.CITEXT,
        allowNull: false,
        unique: true
      },
      org_abbreviation: {
        type: Sequelize.CITEXT,
        allowNull: false,
        unique: true
      },
      org_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      org_social_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      org_picture: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'locations',
          key: 'location_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('organizations');
  }
};