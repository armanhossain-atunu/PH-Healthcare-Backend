import { NextFunction, Request, Response } from "express";
import z from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (zodSchema: z.ZodObject) => {
  return catchAsync(
    (req: Request, res: Response, next: NextFunction) => {
      const result = zodSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error.issues[0].message,
       
        });
      }

      req.body = result.data;

      next();
    }
  );
};