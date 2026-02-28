export const requireRole = (role_id) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //USER_ROLES.DEVELOPER_ADMIN

    if (req.user.role_id !== role_id) {
      return res.status(403).json({
        message:
          "You do not have the required permissions to perform this action",
      });
    }

    next();
  };
};
