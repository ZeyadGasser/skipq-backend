import { IOtpRepository } from "../interfaces/IOtpRepository.js";
import { AccountOTP } from "../models/account.otp.model.js";
//********************Class AuthRepository************************************ */
export class OtpRepository extends IOtpRepository {
  /***************generateOtp(account_id, otp_code, expires_at)*************************** */
  async generateOtp(account_id, otp_code, expires_at) {
    return await AccountOTP.create({
      account_id,
      otp_code,
      expires_at,
      attempts: 0,
    });
  }
  /*******************markAsUsed(otp_id)************************* */
  async markAsUsed(otp_id) {
    const otp = await AccountOTP.findByPk(otp_id);
    if (!otp) return null;
    otp.used_at = new Date();
    await otp.save();
    return otp;
  }
  /*******************incrementAttempts(otp_id)**************************** */
  async incrementAttempts(otp_id) {
    const otp = await AccountOTP.findByPk(otp_id);
    if (!otp) return null;
    otp.attempts += 1;
    await otp.save();
    return otp;
  }
  /******************getLatestOtp(account_id)******************************** */
  async getLatestOtp(account_id) {
    return await AccountOTP.findOne({
      where: { account_id, used_at: null },
      order: [["created_at", "DESC"]],
    });
  }

  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
  /*********************************************** */
}
