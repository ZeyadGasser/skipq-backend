/**
 * This middleware is implemented using a Factory Function to follow proper layer separation.
 *
 * Instead of importing the Service or Repository directly (which would create tight coupling
 * and break layer boundaries), the required dependency (organizationService) is injected
 * as a parameter.
 *
 * This approach follows the Dependency Injection principle and provides several benefits:
 * - Keeps the middleware independent and reusable
 * - Maintains clear separation between Controller, Service, and Repository layers
 * - Makes the code easier to test (we can inject a mock service)
 * - Improves maintainability and flexibility
 *
 * The factory function returns the actual Express middleware, while preserving access
 * to the injected service through closure.
 */

export const validateActiveOrganization = (organizationService) => {
  return async (req, res, next) => {
    try {
      const org_id = req.params.org_id;
      if (!org_id) {
        return res.status(400).json({ message: "Organization id is required" });
      }

      const organization =
        await organizationService.getOrganizationById(org_id);

      if (!organization || !organization.isActive) {
        return res.status(403).json({ message: "Organization is not active" });
      }

      req.organization = organization;

      next();
    } catch (err) {
      next(err);
    }
  };
};
