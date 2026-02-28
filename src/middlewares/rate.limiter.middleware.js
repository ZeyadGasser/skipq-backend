import rateLimit from "express-rate-limit";

/**
 * Rate Limiter Middleware
 *
 * What it is:
 * - rateLimiter is a security middleware that limits the number of requests
 *   a client (based on IP address) can make within a specific time window.
 * - It automatically tracks request counts per IP and blocks excessive requests.
 *
 * Why we use it:
 * - Prevent brute-force attacks (e.g., guessing passwords on /login)
 * - Prevent spam and abuse (e.g., creating many accounts or sending many reset emails)
 * - Protect server resources from flooding or denial-of-service attempts
 * - Improve overall API security and stability
 *
 * How it works:
 * - windowMs: the time window in milliseconds (e.g., 15 minutes)
 * - max: maximum number of allowed requests per IP during that window
 * - If the limit is exceeded → server responds with HTTP 429 (Too Many Requests)
 *
 * Where we apply it:
 *
 * 1. Global limiter (example: 100 requests / minute)
 *    - Applied on /api/auth
 *    - Protects against general flooding
 *
 * 2. Login limiter (example: 5 requests / 15 minutes)
 *    - Prevents brute-force password attacks
 *
 * 3. Register limiter (example: 10 requests / hour)
 *    - Prevents creation of spam or fake accounts
 *
 * 4. Reset-password limiter (example: 3 requests / 15 minutes)
 *    - Prevents abuse of password reset functionality
 *
 * 5. Send reset email limiter (example: 3 requests / hour)
 *    - Prevents email spam and abuse
 *
 * Note:
 * - Limiting is applied per IP address automatically
 * - Blocking is temporary and resets after the time window expires
 */

export const rateLimiter = (windowMs_, max_) => {
  return rateLimit({
    windowMs: windowMs_,
    max: max_,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
