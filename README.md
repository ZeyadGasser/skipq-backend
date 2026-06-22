# SkipQ Backend

SkipQ is a queue-management backend designed for high-traffic environments such as government service centers, public institutions, banks, and other organizations that serve large numbers of visitors.

The platform helps users discover nearby branches and ATMs, check service availability, and make informed decisions before visiting a location. It also supports organization onboarding, branch management, authentication, and integration with external services.

Built with Node.js, Express, Sequelize, and PostgreSQL, SkipQ follows a layered architecture that promotes maintainability, scalability, and clear separation of concerns.

---

## Features

* JWT-based authentication with refresh-token support.
* Organization registration and administration.
* Role-based authorization.
* Branch discovery and management.
* ATM discovery and availability checks.
* Integration with external service providers.
* PostgreSQL persistence through Sequelize ORM.
* Swagger/OpenAPI documentation.
* Automated testing with Jest and Supertest.
* Structured logging with Pino.

---

## Architecture

The project follows a layered architecture:

```text
Client
   |
   v
Routes
   |
Controllers
   |
Services
   |
Repositories
   |
PostgreSQL

Services
   |
   +--> External Providers
   +--> Queue Intelligence Services
```

### Layers

* **Routes** expose API endpoints.
* **Controllers** handle HTTP requests and responses.
* **Services** implement business logic and workflows.
* **Repositories** encapsulate database access.
* **Models** define database entities and relationships.

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT Authentication
* bcrypt
* Joi Validation
* Swagger / OpenAPI
* Jest
* Supertest
* Pino Logger

---

## Project Structure

```text
src/
  config/          Database configuration
  controllers/     HTTP controllers
  dtos/            Response DTOs
  error/           Error helpers
  interfaces/      Contracts and abstractions
  middlewares/     Authentication, validation, rate limiting, CORS
  migrations/      Database migrations
  models/          Sequelize models and associations
  repositories/    Data access layer
  routes/          API routes and Swagger annotations
  seeders/         Database seeders
  services/        Business logic and external integrations
  shared/          Shared infrastructure
  tests/           Unit and integration tests
  utils/           Utility functions and constants
```

---

## Requirements

* Node.js 18+
* PostgreSQL
* npm

---

## Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

```env
PORT=3000

DB_USER=postgres
DB_PASS=password
DB_NAME=skipq
DB_HOST=localhost

JWT_SECRET_ACCESS=your_access_secret
JWT_SECRET_REFRESH=your_refresh_secret

EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

APP_BASE_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

DEVELOPER_ADMIN_PASSWORD=optional_admin_password
```

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Database Setup

Run database migrations:

```bash
npx sequelize-cli db:migrate
```

Seed the database:

```bash
npm run seed
```

---

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:<PORT>
```

---

## API Documentation

Swagger documentation is available at:

```text
http://localhost:<PORT>/api-docs
```

Use the Swagger UI to explore endpoints, request schemas, and responses.

---

## Scripts

Start the server:

```bash
npm start
```

Seed the database:

```bash
npm run seed
```

Run tests:

```bash
npm test
```

Format source files:

```bash
npm run format
```

---

## Authentication

* Login returns an access token.
* Refresh tokens are stored in HTTP-only cookies.
* Protected routes require authentication.
* Restricted actions require appropriate roles.

---

## Testing

Run all tests:

```bash
npm test
```

Tests are located in:

```text
src/tests/
```

---

## Future Enhancements

* Real-time queue monitoring.
* Queue length estimation through AI-powered services.
* Live branch occupancy tracking.
* Notification and appointment systems.
* Analytics and reporting dashboards.


