import dotenv from "dotenv";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import serverENV from "../loader/config/serverENV.js";
import setUpMiddlewares from "./middlewares/cors.js";
import router from "./router/router.js";
import { globalErrorHandler } from "../services/globalErrorHandler.js";

// ** Load the .env file into process.env ** //
dotenv.config();

export default async function ({ app }: { app: Express }) {
  // ** Set the middlewares ** //
  setUpMiddlewares({ app });
  const Trust_Proxy = serverENV.TRUST_PROXY || "false";
  const numberOfProxies = serverENV.NUMBER_OF_PROXIES || 1;
  if (Trust_Proxy) {
    app.set("trust proxy", true);
  } else if (Trust_Proxy === "false") {
    app.set("trust proxy", false);
  } else {
    app.set("trust proxy", Trust_Proxy);
    app.set("trust proxy", numberOfProxies);
  }
  // ** Set the helmet headers ** //
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(helmet.noSniff());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard({ action: "deny" }));
  app.use(helmet.xssFilter());

  // ** Set the static folder ** //
  app.use(
    express.static(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../../client/public",
      ),
    ),
  );

  // ** Set the morgan logger ** //
  app.use(morgan(serverENV.MORGAN || "dev"));

  app.use(router);

  app.use((_req, res, next) => {
    globalErrorHandler(res, next);
  });

  return app;
}
