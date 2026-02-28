/**
 * Configuration for Sequelize CLI
 * We use the '.cjs' extension because the project is set to "type": "module" in package.json.
 * The Sequelize CLI requires CommonJS (require/module.exports) to read the configuration correctly.
 */
require('dotenv').config(); 
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432
  }
};