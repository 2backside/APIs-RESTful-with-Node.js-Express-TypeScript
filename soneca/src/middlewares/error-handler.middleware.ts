import express, { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation.error";
import { InternalServerError } from "../errors/internal-server.error";
import { NotFound } from "../errors/not-found.error";
import { errors } from "celebrate";

export const ErrorHandler = (app: express.Express) => {
    app.use(errors());
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ValidationError) {
            error.send(res);
        } else if (error instanceof NotFound) {
            error.send(res);
        } else {
            new InternalServerError().send(res);
        }
    })
};