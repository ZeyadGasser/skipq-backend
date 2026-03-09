import { ACCOUNT_STATUS } from "../utils/account.status.js";
import { ACCOUNT_TYPE } from "../utils/account.types.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateJWT.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import { sequelize } from "../config/db.js";
import { setTimeout } from "timers/promises";
export class AccountService {
  constructor(accountRepository, userService, tokenRepository,authService,otpRepository) {
    this.accountRepository = accountRepository;
    this.userService = userService;
    this.tokenRepository = tokenRepository;
    this.authService = authService;
    this.otpRepository = otpRepository;
  }
  async createAccount(accountData, transaction) {
    //// Using `this` to access class properties and methods correctly within the class; without `this`, JavaScript will treat them as undefined local variables

    const user_id = await this.userService.createUser(accountData, transaction);
    // generate strong random password (unknown to anyone)
    // hash it with bcrypt using 10 rounds to slow down brute‑force attacks
    const randomPassword = crypto.randomBytes(32).toString("hex");
    //const randomPassword = "12345678910"// for test
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const dataToSave = {
      account_email: accountData.account_email,
      account_password_hash: hashedPassword,
      status_id: ACCOUNT_STATUS.PENDING,
      type_id: ACCOUNT_TYPE.ORGANIZATION,
      user_id: user_id,
    };
    const createdAccount = await this.accountRepository.createAccount(
      dataToSave,
      transaction,
    );
    return createdAccount.account_id;
  }

  /************************************************************************************** */
  async login({ targetAccount }) {
    const role_id = await this.accountRepository.getUserRole(
      targetAccount.account_email,
    );
    if (!role_id) return null;
    const accessPayload = {
      account_email: targetAccount.account_email,
      role_id: role_id,
    };
    const accessToken_ = generateAccessToken(accessPayload);

    const refreshPayload = {
      account_email: targetAccount.account_email,
      role_id:role_id,
    };
    const Account=await this.accountRepository.getAccountByEmail(targetAccount.account_email);
    const refreshToken_ = generateRefreshToken(refreshPayload);
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken_).digest('hex');
    await this.authService.saveRefreshToken({
        account_id: Account.account_id, 
        tokenHash: refreshTokenHash
    });   
     return {
      accessToken: accessToken_,
      refreshToken: refreshToken_,
    };
  }
  /******************************************************************************* */
 //TODO Should move from here 
 
  async auth_service(account_email, password) {
    const targetAccount =
      await this.accountRepository.getAccountByEmail(account_email);
    // Use dummy hash when account doesn't exist to prevent timing attacks
    //  Security issue (Timing Attack):
    // Response time differs if email exists or not:
    //   - Email not found → returns immediately
    //   - Email exists but password wrong → takes longer due to bcrypt.compare
    // An attacker could measure this time difference to detect valid emails
    const passwordHash = targetAccount
      ? targetAccount.account_password_hash
      : "$2b$10$abcdefghijklmnopqrstuvwxyz123456";

    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!targetAccount || !isPasswordValid) return null;

    return targetAccount;
  }

  /******************************************************************************* */
  /**
   * Email Sending Trade-offs:
   *
   * Using `await sendEmail()` ensures that:
   * - The API only returns success if the email was actually sent.
   * - We can properly handle failures and return an error response.
   * - The flow is reliable and predictable.
   *
   * However, the downside is:
   * - SMTP (especially Gmail) can take 4–6 seconds to respond.
   * - The API response time increases because we wait for the email server.
   *
   * If we remove `await`:
   * - The API becomes very fast (better user experience).
   * - The email is sent in the background.
   * - But we lose immediate certainty that the email was delivered successfully.
   *
   * If you want to follow a production mindset:
   * Implement a Background Job Queue (e.g., BullMQ + Redis).
   * - Push the email task to a queue.
   * - Return API response immediately.
   * - Let a worker handle sending the email.
   * - Add automatic retries in case of failure.
   *
   * This gives you both:
   * Fast API responses
   * Reliable email delivery with retry mechanism
   */

  /**
   * 
/**
 * IMPLEMENTATION NOTE: 
 * This is a temporary synchronous retry mechanism to ensure Reliability.
 * It prevents 'ghost tokens' by deleting the token if the email fails after 3 attempts.
 * * --- TRADE-OFFS & ARCHITECTURAL OPTIONS ---
 * 1. Synchronous (Current): 100% Reliable, but slow API (user waits for SMTP).
 * 2. Fire & Forget: Fastest API, but 0% Reliability (Original issue: swallowed errors).
 * 3. In-Memory Queue: Fast, no extra infra, but risk of Data Loss if server restarts.
 * 4. DB-based Queue: Reliable and Fast, uses existing DB, but adds database overhead.
 * 5. Redis Queue (BullMQ): Best Performance/Reliability, but requires Redis setup.
 * * NEXT STEP: Transition to a Background Job Queue (Redis/DB-based) for better UX.
 */

  async sendResetPasswordEmail(account_id) {
    const account = await this.accountRepository.getAccountById(account_id);
    if (!account) return null;

    const existingToken =
      await this.tokenRepository.getValidResetTokenByAccountId(account_id);
    if (existingToken) {
      throw new Error("Reset email already sent. Please check your email.");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.tokenRepository.createResetToken({
      account_id,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

    const resetLink = `${process.env.APP_BASE_URL}${resetToken}`;

    let attempts = 0;
    let sent = false;

    while (attempts < 3 && !sent) {
      try {
        attempts++;
        await sendEmail(
          account.account_email,
          "Reset Your Password",
          `Click here to reset your password: ${resetLink}`,
        );
        sent = true;
      } catch (error) {
        console.error(`Attempt ${attempts} failed:`, error.message);
        if (attempts === 3) {
          await this.tokenRepository.deleteByHash(tokenHash);
          throw new Error("Failed to send email. Please try again later.");
        }
        await setTimeout(2000);
      }
    }

    return true;
  }
  /******************************************************************************* */
  async validateResetPasswordToken(token) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const account = await this.tokenRepository.getAccountByTokenHash(tokenHash);
    if (!account) {
      return null;
    }

    return account;
  }
  /******************************************************* */
  async resetPassword(account, password) {
    const t = await sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.accountRepository.updatePassword(account, hashedPassword, t);
      await this.tokenRepository.markTokenAsUsed(account.account_id, t);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  /*********************************************************************** */
  async getAccountByEmail(account_email){
    return this.accountRepository.getAccountByEmail(account_email);
  }
    /*********************************************************************** */
    async sendOtpEmailWithRetry(email, otp_code) {
  let attempts = 0;
  let sent = false;

  while (attempts < 3 && !sent) {
    try {
      attempts++;
      await sendEmail(
        email,
        "Your OTP Code",
        `Your OTP code is: ${otp_code}. It expires in 5 minutes.`
      );
      sent = true;
    } catch (error) {
      console.error(`Attempt ${attempts} failed:`, error.message);

      if (attempts === 3) {
        throw new Error("Failed to send OTP email. Please try again later.");
      }

        await setTimeout(2000);
    }
  }
}
    /*********************************************************************** */
    //Todo should move to Otp service layer
  async generateOtp(account){
    const accountOtp=await this.otpRepository.getLatestOtp(account.account_id);
///start if 
    if(!accountOtp|| accountOtp.expires_at < new Date()){
      
      const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires_at = new Date(Date.now() + 5 * 60 * 1000); 
      await this.otpRepository.generateOtp(account.account_id, otp_code, expires_at);
      await this.sendOtpEmailWithRetry(account.account_email, otp_code);
   }///End if 
   if(accountOtp &&accountOtp.attempts<5&& accountOtp.expires_at > new Date()){
       await this.otpRepository.incrementAttempts(accountOtp.otp_id);
       await this.sendOtpEmailWithRetry(account.account_email, accountOtp.otp_code);

   }

  }
      /*********************************************************************** */
async getOtpByAccountId(account_id){
  return await this.otpRepository.getLatestOtp(account_id);
}
/*********************************************************************** */
async generateTokenForOtp(account_id,otp_id){
   const existingToken =
      await this.tokenRepository.getValidResetTokenByAccountId(account_id);
    if (existingToken) {
      throw new Error("A reset request is already in process. Please try again later.");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.tokenRepository.createResetToken({
      account_id,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });
    await this.otpRepository.markAsUsed(otp_id);
  return resetToken;
}
/*********************************************************************** */
/*********************************************************************** */
/*********************************************************************** */
/*********************************************************************** */

}
