import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ErrorHandler } from '@nestjs/common/interfaces';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `info: ${req.method} ${res.statusCode} ${req.originalUrl}`,
      );
    });
    next();
  }
}
