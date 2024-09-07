import { createLogger, transports, format } from "winston";
import { ILogger } from "./index.js";

export class WinstonLogger implements ILogger {
  private logger;
  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: "admin-actions.log" }),
      ],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

export default { WinstonLogger };
