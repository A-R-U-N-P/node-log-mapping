import express from "express";
import { nanoid } from "nanoid";
import { logger } from "./logger.js";
import { indexRoute } from "./route/index.route.js";
import cors from 'cors';
import { asyncLocalStorage } from "./helper/asyncStorage.js";


const app = express();
app.use(express.json());

// Initialize AsyncLocalStorage
app.use((req, res, next) => {
  const reqId = nanoid(10);
  const api = req.originalUrl.split("?")[0];
  // Run a new AsyncLocalStorage context
  asyncLocalStorage.run(new Map([['reqId', reqId], ['api', api]]), () => {
    logger("Incoming request",JSON.stringify({ reqId, api }))
    res.on('finish', () => {
      logger("outgoing request",JSON.stringify({ reqId, api }))
    });

    next();
  });

});

app.use(cors({
  origin: "*",
  credentials: false
}));

// initialize index route
app.use(indexRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
