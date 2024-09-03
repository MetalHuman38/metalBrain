import { NextFunction, Response } from "express";
import fs from "fs";

function logErrorTofile(err: Error) {
  const log = `${new Date().toISOString()} - ${err.message}\n${err.stack}\n\n`;
  fs.appendFile("error.log", log + "\n", (error) => {
    if (error) {
      console.error(error);
    }
  });
}

export async function globalErrorHandler(res: Response, next: NextFunction) {
  logErrorTofile(new Error("Global Error Handler"));
  res.status(500).json({ error: "Something went wrong global error" });
  next();

  process.on("unhandledRejection", (reason, promise) => {
    console.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
    logErrorTofile(
      new Error(`Unhandled Rejection at: ${promise} reason: ${reason}`),
    );
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception thrown: ${err}`);
    logErrorTofile(new Error(`Uncaught Exception thrown: ${err}`));
    process.exit(1);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("Uncaught Exception:", err, "Origin:", origin);
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    fs.writeSync(process.stderr.fd, `Caught exception: ${err}\n`);
    console.error(`Uncaught Exception thrown: ${err}`);
    logErrorTofile(new Error(`Uncaught Exception thrown: ${err}`));
    process.exit(1);
  });
}

export default { globalErrorHandler };
