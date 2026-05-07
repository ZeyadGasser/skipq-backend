import pino from "pino";
export const logger = pino();

// Using Pino built-in logging (simple setup for now)
// This is enough for development and small/medium projects.
// If needed, we can extend it later with customizations like:
// - custom formatting
// - file logging (transports)
// - separating error/info logs
// - or sending logs to external services (e.g. ELK, Datadog, etc.)