'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_otps', {
      otp_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      account_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      otp_code: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      attempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      used_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Indexes
    await queryInterface.addIndex('account_otps', ['account_id'], { name: 'idx_otps_account_id' });
    await queryInterface.addIndex('account_otps', ['account_id', 'used_at'], { name: 'idx_otps_account_id_used_at' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account_otps');
  },
};