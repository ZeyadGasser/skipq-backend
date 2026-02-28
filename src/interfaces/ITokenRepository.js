export class ITokenRepository {
  async createResetToken(data) {
    throw new Error("Method not implemented");
  }
  async getValidResetTokenByAccountId(account_id) {
    throw new Error("Method not implemented");
  }
  async getAccountByTokenHash(tokenHash) {
    throw new Error("Method not implemented");
  }
  async deleteByHash(tokenHash) {
    throw new Error("Method not implemented");
  }
  async deleteAllByAccountId(account_id) {
    throw new Error("Method not implemented");
  }
  async markTokenAsUsed(account_id, transaction) {
    throw new Error("Method not implemented");
  }
  async cleanupExpiredTokens() {
    throw new Error("Method not implemented");
  }
}
