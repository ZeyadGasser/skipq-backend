'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('governorates', {
      governorate_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
    
      boundary: {
        type: Sequelize.GEOMETRY('POLYGON', 4326), 
        allowNull: false
      }
    });

    await queryInterface.addIndex('governorates', ['name'], {
      name: 'idx_governorate_name'
    });

   
    await queryInterface.addIndex('governorates', ['boundary'], {
      name: 'idx_governorate_boundary',
      using: 'GIST'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('governorates');
  }
};