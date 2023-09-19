import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors/AppError";

export const verifyErrors = (err: Error, _req: Request, res: Response, _next: NextFunction ):Response =>{
    if(err instanceof AppError) 
        return res.status(err.statusCode).json({ message: err.message});

    return res.status(500).json({
        status: "error",
        message: `Internal Server Error: ${err.message}`
    })
}