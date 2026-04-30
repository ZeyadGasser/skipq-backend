import crypto from "crypto";

export class AuthService {
  constructor(AuthRepository) {
    this.AuthRepository = AuthRepository;
  }
  /***************checkRefreshToken(refreshToken)*************************** */
  async checkRefreshToken(refreshToken) {
    const hashRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    return await this.AuthRepository.checkRefreshToken(hashRefreshToken);
  }
  /********** saveRefreshToken({ account_id, tokenHash })****************************** */
  async saveRefreshToken({ account_id, tokenHash }) {
    return await this.AuthRepository.createTokenRecord({
      account_id,
      refresh_token_hash: tokenHash,
    });
  }
  /************************************************ */
  async revokeToken(refreshToken) {
    const hashRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    return await this.AuthRepository.revokeToken(hashRefreshToken);
  }
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
}
