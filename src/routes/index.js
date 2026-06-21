import { router as organizationRoute } from "./organization.routes.js";
import { router as accountRoute } from "./account.routes.js";
import { router as branchRoute } from "./branch.routes.js";
import { router as atmRoute } from "./atm.routes.js";
import * as httpStatus from "../utils/http.status.js";
import { rateLimiter } from "../middlewares/rate.limiter.middleware.js";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from  "../../swagger.js"
export const mapRoutes = (app) => {
  // routes
  app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

  app.use("/api/organizations", rateLimiter(60 * 1000, 100), organizationRoute);

  app.use("/api/auth", rateLimiter(60 * 1000, 100), accountRoute);

  app.use(
    "/api/organizations/:orgId/branches",
    rateLimiter(60 * 1000, 100),
    branchRoute,
  );

  app.use(
    "/api/organizations/:orgId/banks",
    rateLimiter(60 * 1000, 100),
    atmRoute,
  );

  //for test
  /**
   * @openapi
   * /api/national-bank/v1:
   *  get:
   *    tags:
   *      - National Bank
   *    summary: Get national bank ATM mock status
   *    responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Invalid request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       500:
   *         description: Internal server error
   */
  app.get("/api/national-bank/v1", (req, res) => {
    return res.json({
      isActive: true,
      countPeople: 50,
      denominations: [{ value: 100 }, { value: 200 }],
    });
  });
  /**
   * @openapi
   * /api/national-bank/v1/check:
   *  get:
   *    tags:
   *      - National Bank
   *    summary: Check national bank withdrawal mock availability
   *    responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Invalid request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       500:
   *         description: Internal server error
   */
  app.get("/api/national-bank/v1/check", (req, res) => {
    return res.json({
      available: true,
    });
  });

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
