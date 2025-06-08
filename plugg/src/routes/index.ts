import express from "express";
import { userRoutes } from "./user_routes";

export const routes = (app: express.Express) => {
    app.use(express.json())
    app.use(userRoutes);
}