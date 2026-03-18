'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('branches', ['org_id'], {
      name: 'idx_branches_org_id'
    });

    await queryInterface.addIndex('branches', ['location_id'], {
      name: 'idx_branches_location_id'
    });
    


  },

  async down(queryInterface, Sequelize) {
 
    await queryInterface.removeIndex('branches', 'idx_branches_org_id');
    await queryInterface.removeIndex('branches', 'idx_branches_location_id');
  }
};