import { createLogger, format as _format, transports as _transports } from "winston";
import { asyncLocalStorage } from "./helper/asyncStorage.js";
const log = createLogger({
  level: "info",
  format: _format.combine(
    _format.timestamp(),
    _format.json(),
    _format.printf(({ timestamp, level, message, meta }) => {
      const context = asyncLocalStorage.getStore();      
      const reqId = context?.get('reqId') || 'N/A';
      const api = context?.get('api') || 'N/A';
      return `[${timestamp}] ${level.toUpperCase()}:api:${api}, reqId=${reqId}, message=${message}`;
    })
  ),
  transports: [
    new _transports.Console(),
    new _transports.File({ filename: "server.log" })
  ]
});

// Log request
function logger(message, data) {
  log.info(message, { meta: { data } });
}

// Log SQL queries
function logSQL(message, data) {
  log.info(message, { meta: { data } });
}

export { logger, logSQL };
