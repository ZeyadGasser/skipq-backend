'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      location_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

     
      coordinates: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: false
      },

      governorate_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'governorates',
          key: 'governorate_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
    });

 
    await queryInterface.addIndex('locations', ['governorate_id'], {
      name: 'idx_locations_governorate_id'
    });


    await queryInterface.addIndex('locations', ['coordinates'], {
      name: 'idx_locations_coordinates_spatial',
      using: 'GIST'//Generalized Search Tree
      /**
 * GiST (Generalized Search Tree) with R-Tree:
 * ------------------------------------------
 * - Unlike B+Tree (which handles 1D sorting), GiST manages 2D spatial relationships.
 * - Architecture: Organizes data into hierarchical, overlapping "Bounding Boxes".
 * - Logic: Clusters nearby points into Root boxes, then subdivided into Child boxes.
 * - Performance: Queries (like Nearest Neighbor) only scan relevant boxes and 
 * ignore the rest of the map, ensuring O(log N) search complexity for spatial data.
 */
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};