'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('atm_denomination_stocks', {
      atm_id: {
        type: Sequelize.BIGINT,
        primaryKey: true, 
        allowNull: false,
        references: {
          model: 'atms',
          key: 'atm_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      denomination_id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        references: {
          model: 'denominations',
          key: 'denomination_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('atm_denomination_stocks');
  }
};