import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { router } from "./routes";
import { ErrorHandler } from "./middlewares/error-handler.middleware"

initializeApp();
const app = express();

router(app);
ErrorHandler(app);

app.listen(3000, () => {
    console.log("API:\x1b[32m running port 300\x1b[0m");
});