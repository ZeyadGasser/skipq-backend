import { ITokenRepository } from "../interfaces/ITokenRepository.js";
import { AccountResetToken as ResetTokenModel } from "../models/account.reset.tokens.model.js";
import { Op } from "sequelize";
import { Account } from "../models/account.model.js";
import * as associations from "../models/index.js";
export class TokenRepository extends ITokenRepository {
  async createResetToken(data) {
    return await ResetTokenModel.create(data);
  }
  async getValidResetTokenByAccountId(account_id) {
    return await ResetTokenModel.findOne({
      where: {
        account_id,
        used: false,
        expires_at: {
          [Op.gt]: new Date(),
        },
      },
    });
  }

  async getAccountByTokenHash(tokenHash) {
    const resetToken = await ResetTokenModel.findOne({
      where: {
        token_hash: tokenHash,
        used: false,
        expires_at: { [Op.gt]: new Date() },
      },
      include: [{ model: Account, attributes: ["account_id"] }],
    });

    return resetToken?.Account || null;
  }

  async deleteByHash(tokenHash) {
    return await ResetTokenModel.destroy({
      where: { token_hash: tokenHash },
    });
  }

  async deleteAllByAccountId(account_id) {
    return await ResetTokenModel.destroy({
      where: { account_id },
    });
  }

  async cleanupExpiredTokens() {
    return await ResetTokenModel.destroy({
      where: {
        [Op.or]: [
          { expires_at: { [Op.lte]: new Date() } }, //lte = "less than or equal"
          { used: true },
        ],
      },
    });
  }

  async markTokenAsUsed(account_id, transaction) {
    return await ResetTokenModel.update(
      { used: true },
      {
        where: {
          account_id: account_id,
          used: false,
        },
        transaction,
      },
    );
  }
}
