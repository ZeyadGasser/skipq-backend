'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('account_refresh_tokens', {
      refresh_token_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      account_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      refresh_token_hash: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true, 
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      revoked_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

    });

    await queryInterface.addIndex(
      'account_refresh_tokens',
      ['account_id'],
      {
        name: 'idx_refresh_tokens_account_id',
      }
    );

    await queryInterface.addIndex(
      'account_refresh_tokens',
      ['account_id', 'revoked_at'],
      {
        name: 'idx_refresh_tokens_account_id_revoked_at',
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('account_refresh_tokens');

  }
};