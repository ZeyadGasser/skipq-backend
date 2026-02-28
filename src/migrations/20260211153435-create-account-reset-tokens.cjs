"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account_reset_tokens", {
      reset_token_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      account_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "accounts",
          key: "account_id",
        },
        onDelete: "CASCADE",
      },
      token_hash: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("account_reset_tokens", ["account_id"]);
    await queryInterface.addIndex("account_reset_tokens", ["token_hash"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account_reset_tokens");
  },
};