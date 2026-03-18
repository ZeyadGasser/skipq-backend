import { router as organizationRoute } from "./organization.routes.js";
import { router as accountRoute } from "./account.routes.js";
import { router as branchRoute } from "./branch.routes.js";
import * as httpStatus from "../utils/http.status.js";
import { rateLimiter } from "../middlewares/rate.limiter.middleware.js";

export const mapRoutes = (app) => {
  // routes
  app.use("/api/organizations",rateLimiter(60 * 1000, 100), organizationRoute);

  app.use("/api/auth", rateLimiter(60 * 1000, 100), accountRoute);

  app.use("/api/organizations/:orgId/branches", rateLimiter(60 * 1000, 100), branchRoute);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      status: httpStatus.ERROR,
      message: `Route ${req.originalUrl} Not Found`,
    });
  });

  // Error handler
  // In Express 5, any error thrown inside an async controller
  // is automatically caught and passed directly to this Error Middleware.
  // There's no need to wrap controllers with an async wrapper like asyncRubber.
  app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
      status: httpStatus.ERROR,
      message: err.message || "Internal Server Error",
    });
  });
};
