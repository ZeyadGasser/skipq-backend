import { accountController } from "../container.js";
export const validateResetPasswordToken = async (req, res, next) => {
  const token = req.body.token;

  if (!token || !req.body.password) {
    return res.status(400).json({ message: "Token  or password not found" });
  }

  try {
    const account =
      await accountController.accountService.validateResetPasswordToken(token);

    if (!account) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    req.account = account;

    next();
  } catch (error) {
    next(error);
  }
};
