import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  handler: function (req: Request, res: Response) {
    res.status(429).send({
      message: "Too many requests from this IP, please try again later",
    });
  },
});
