# SkipQ Backend

SkipQ is a queue-management backend designed for high-traffic environments such as government service centers, public institutions, banks, and any organization where people need to wait for physical services. The platform helps users discover nearby branches or ATMs, understand service availability, and make better decisions before joining a queue.

At its core, SkipQ connects organizations, branches, locations, ATMs, authentication, and external intelligence services into one API. It is built with Node.js, Express, Sequelize, and PostgreSQL, and is structured to support real-world queue operations such as location-based discovery, crowd awareness, cash availability checks, and organization administration.

The backend is also designed to integrate with a separate AI service that analyzes camera images or stream frames and returns the number of people currently waiting. This makes SkipQ more than a static directory: it can become a live queue-awareness system that helps reduce wasted time and improves the experience for citizens, customers, and service providers.

SkipQ provides authentication, organization onboarding, nearby branch and ATM discovery, ATM cash availability checks, Swagger API documentation, and a manual database seeding system.

The project follows a layered architecture:

- Routes define the public API surface.
- Controllers handle HTTP requests and responses.
- Services contain business workflows.
- Repositories isolate database access.
- Sequelize models define PostgreSQL tables and relationships.

## Features

- JWT-based authentication with refresh-token cookies.
- Organization signup and administration.
- Role-based access control for protected actions.
- Branch and ATM lookup by organization and location.
- ATM withdrawal availability checks through a bank provider abstraction.
- PostgreSQL persistence through Sequelize models.
- Manual seeders without `sequelize-cli` seed commands.
- Swagger documentation at `/api-docs`.
- Jest and Supertest test setup.

## AI Queue Intelligence Service

SkipQ is designed to work with a separate backend service that runs the AI model responsible for queue analysis.

That AI service receives images or frames from the live camera stream, processes them with the model, and returns the number of people currently standing in the queue. The main SkipQ backend can then use that count as part of ATM or branch status responses, such as estimated crowding, waiting load, or service availability.

Current integration point:

- The bank provider layer normalizes external ATM data.
- `NationalBankProvider` currently points to `http://localhost:5001/api/national-bank/v1` as a test provider.
- The external provider response includes `countPeople`, which represents the number of people detected in the queue.

Expected AI service responsibility:

- Accept camera frames or image snapshots.
- Run the people-counting AI model.
- Return a normalized count, for example:

```json
{
  "isActive": true,
  "countPeople": 12,
  "denominations": [{ "value": 100 }, { "value": 200 }]
}
```

This repository does not contain the AI model itself. It contains the main API backend that can consume the AI service output.

## Tech Stack

- Node.js
- Express.js
- Sequelize
- PostgreSQL
- JWT
- bcrypt
- Joi
- Swagger UI / swagger-jsdoc
- Jest
- Supertest
- Pino

## Project Structure

```text
src/
  config/          Database configuration
  controllers/     HTTP controllers
  dtos/            Response DTOs
  error/           Error helpers
  interfaces/      Repository/provider contracts
  middlewares/     Auth, validation, rate limit, upload, CORS
  migrations/      Sequelize migration files
  models/          Sequelize models and associations
  repositories/    Database access layer
  routes/          Express routes and Swagger annotations
  seeders/         Manual seeders
  services/        Business logic and external providers
  shared/          Shared infrastructure
  tests/           Unit and integration tests
  utils/           Constants and helpers
```

## Requirements

- Node.js 18+
- PostgreSQL
- npm

## Environment Variables

Create a `.env` file in the project root. Use `.env.example` as the starting point.

Required values:

```env
PORT=3000

DB_USER=postgres
DB_PASS=password
DB_NAME=skipq
DB_HOST=localhost
DB_CONNECTION_ERROR_CODE=0

MAX_ATTEMPTS=5
SUCCESS=1
FAILURE=0

JWT_SECRET_ACCESS=your_access_secret
JWT_SECRET_REFRESH=your_refresh_secret

EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

APP_BASE_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

DEVELOPER_ADMIN_PASSWORD=optional_admin_password
```

If `DEVELOPER_ADMIN_PASSWORD` is not set, the seeder generates a password and prints it in the console.

## Installation

```bash
npm install
```

## Database Setup

Run your migrations before seeding the database.

If you use the existing Sequelize CLI migration setup:

```bash
npx sequelize-cli db:migrate
```

The project seeders are manual JavaScript files and do not use `sequelize-cli` seed commands.

## Seeding

Seed the database with:

```bash
npm run seed
```

The seeding system creates or checks:

- Roles
- Account statuses
- Account types
- Governorates
- Locations
- Users
- Accounts
- Organization
- Branch
- ATM
- Runtime token tables
- Permissions check

Default administrator:

```text
Email: zeyadgasser2510@gmail.com
Role: DEVELOPER_ADMIN
```

There is currently no `Permission` model/table in this codebase, so the permissions seeder logs that permissions are skipped instead of creating a non-existent table.

All seeders use `findOrCreate` to avoid duplicate records.

## Running The App

```bash
npm start
```

The server starts on:

```text
http://localhost:<PORT>
```

Swagger docs:

```text
http://localhost:<PORT>/api-docs
```

## API Overview

Main route groups:

- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-otp`
- `POST /api/auth/reset-password`
- `POST /api/organizations/signup`
- `GET /api/organizations`
- `PATCH /api/organizations/{id}`
- `GET /api/organizations/{orgId}/branches`
- `GET /api/organizations/{orgId}/branches/{branchId}/services`
- `GET /api/organizations/{orgId}/banks`
- `GET /api/organizations/{orgId}/banks/{bankId}/atms`
- `GET /api/organizations/{orgId}/banks/{bankId}/atms/{atmId}`
- `GET /api/organizations/{orgId}/banks/{bankId}/atms/{atmId}/check-withdraw`

Use `/api-docs` for the full Swagger schema.

## Scripts

```bash
npm start
```

Start the server with Nodemon.

```bash
npm run seed
```

Run the manual seeders.

```bash
npm test
```

Run tests.

```bash
npm run format
```

Format source files with Prettier.

## Authentication Notes

- Login returns an access token.
- Refresh token is stored as an HTTP-only cookie.
- Protected routes use `requireAuth`.
- Role-restricted routes use `requireRole`.

## Testing

```bash
npm test
```

Tests are located under:

```text
src/tests/
```

## Notes

- This backend expects PostgreSQL.
- Some database columns use PostgreSQL-specific features such as `CITEXT` and geometry types.
- Runtime records such as refresh tokens, reset tokens, and OTPs are not seeded with fake active values because they are generated by authentication flows.
- The AI people-counting model is intentionally separated into another backend service so it can scale independently from the main API.
