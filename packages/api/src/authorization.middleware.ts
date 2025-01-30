import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Resource } from "sst";

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== Resource.SecretKey.value) {
      return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }

    next();
  }
}
