export class IAuthRepository {
  async checkRefreshToken(hashRefreshToken) {
    throw new Error("Method not implemented");
  }
  async createTokenRecord({ account_id, refresh_token_hash }) {
    throw new Error("Method not implemented");
  }
  async revokeToken(hashRefreshToken) {
    throw new Error("Method not implemented");
  }
}
