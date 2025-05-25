import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from '../utils/logger.js';

export class AppError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler: ErrorRequestHandler = (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(`${error}`);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });
        return;
    }

    res.status(500).json({
        message: 'Internal Server Error'
    });
}; 