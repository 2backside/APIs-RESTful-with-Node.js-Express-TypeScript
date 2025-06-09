import express, { NextFunction, Request, Response } from "express";
import { NotFound } from "../errors/not-found.error";

export const PageNotFoundHandler = (app: express.Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFound("Página não encontrada!"));
    });
};