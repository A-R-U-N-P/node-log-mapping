import { Sequelize } from "sequelize";
import { logSQL } from "./logger.js"; // Import logger and context

const sequelize = new Sequelize('dbName', 'username', 'password', {
    host: 'host.com',
    dialect: 'mariadb',
    logging: (msg) => {
        logSQL(`Executing SQL Query: ${msg}`);
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Wait up to 30 seconds for a connection
      idle: 10000 // Close idle connections after 10 seconds
    },
    dialectOptions: {
      connectTimeout: 20000 // Increase the connection timeout to 20 seconds
    }
  });
  

export default sequelize;
