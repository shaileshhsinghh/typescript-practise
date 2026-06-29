import { Request , Response , NextFunction } from 'express';

interface CustomError extends Error{
    statusCode ?: number;
}

type ErrorHandler = (
    err : CustomError,
    req : Request,
    res : Response,
    next : NextFunction,
) => void;


const ErrorHandler : ErrorHandler = (err , req, res , next) : void => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success : false,
        message : err.message || 'Internal Server Error',
        stack : err.stack
    });
};

export default ErrorHandler;