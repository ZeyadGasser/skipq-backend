import { IAuthRepository } from "../interfaces/IAuthRepository.js";
import { AccountRefreshToken } from "../models/account.refresh.tokens.model.js";
//********************Class AuthRepository************************************ */
export class AuthRepository extends IAuthRepository {
  /***************checkRefreshToken(hashRefreshToken)*************************** */
  async checkRefreshToken(hashRefreshToken) {
    return await AccountRefreshToken.findOne({
      where: {
        refresh_token_hash: hashRefreshToken,
        revoked_at: null,
      },
    });
  }
  /****************createTokenRecord({ account_id, refresh_token_hash })******************************** */
  async createTokenRecord({ account_id, refresh_token_hash }) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return await AccountRefreshToken.create({
      account_id,
      refresh_token_hash,
      expires_at: expiresAt,
    });
  }
  /****************revokeToken(hashRefreshToken)******************************* */
  async revokeToken(hashRefreshToken) {
    return await AccountRefreshToken.update(
      { revoked_at: new Date() },
      {
        where: {
          refresh_token_hash: hashRefreshToken,
          revoked_at: null,
        },
      },
    );
  }
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
}
