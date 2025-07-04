import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
  });
};
