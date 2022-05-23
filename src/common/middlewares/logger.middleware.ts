import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, originalUrl, method } = req;
    const { statusCode, statusMessage } = res;
    this.logger.log(
      `${method} ${originalUrl} ${ip} - ${statusCode} ${statusMessage}`,
    );
    next();
  }
}
