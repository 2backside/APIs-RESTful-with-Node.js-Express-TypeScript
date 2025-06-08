import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { router } from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

initializeApp();
const app = express();

router(app);
errorHandler(app);

app.listen(3000, () => {
    console.log("api running");
});