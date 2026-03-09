export class IOtpRepository {
  async generateOtp(account_id, otp_code, expires_at) {
    throw new Error("Method not implemented");
  }

  async markAsUsed(otp_id) {
    throw new Error("Method not implemented");
  }

  async incrementAttempts(otp_id) {
    throw new Error("Method not implemented");
  }

  async getLatestOtp(account_id) {
    throw new Error("Method not implemented");
  }
}