import compression from "compression";
import express from "express";
import cors from "cors";
import http from "node:http";
import serverENV from "./loader/config/serverENV.js";
import dotenv from "dotenv";
import { AsyncLocalStorage } from "node:async_hooks";

// ** Load the .env file into process.env ** //
dotenv.config();

async function StartServer() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );

  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
      level: serverENV.COMPRESSION_LEVEL,
      threshold: serverENV.COMPRESSION_THRESHOLD,
    }),
  );

  (await import("./loader/index.js")).default({ app });

  const server = http.createServer(app);

  const anyncLocalStorage = new AsyncLocalStorage();

  function logWithId(message: unknown) {
    const id = anyncLocalStorage.getStore();
    console.log(`${id !== undefined ? `[${id}]` : ""} ${message}`);
  }
  let idSeq = 0;
  server.on("connection", (socket) => {
    const id = idSeq++;
    anyncLocalStorage.run(id, () => {
      logWithId(`New connection from client!`);
      socket.on("close", () => {
        logWithId(`Client Connection closed! Waiting for new connection!`);
      });
    });
  });

  server.listen(serverENV.PORT, "127.0.0.1", () => {
    console.log(`Server listening on port ${serverENV.PORT}`);
  });

  const idleTimeout = serverENV.IDLE_TIMEOUT || 48000;
  let idleTimer = setTimeout(() => {
    server.close(() => {
      console.log(
        "Server closed due to inactivity! Restart the server to continue!",
      );
      process.exit(0);
    });
  }, idleTimeout);

  app.use((_req, _res, next) => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      server.close(() => {
        console.log(
          "Server closed due to inactivity! Restart the server to continue!",
        );
        process.exit(0);
      });
    }, idleTimeout);
    next();
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    server.close(() => {
      console.log(
        "Server closed due to uncaught exception! Restart the server to continue!",
      );
      process.exit(0);
    });
  });
}
StartServer();

export default { StartServer };
