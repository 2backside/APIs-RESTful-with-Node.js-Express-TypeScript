import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { router } from "./routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

initializeApp();
const app = express();

router(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
    console.log({
      API : "OK"
    });
});