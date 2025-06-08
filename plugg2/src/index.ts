import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { router } from "./routes";

initializeApp();
const app = express()
router(app)

app.listen(3000, () =>{
    console.log("api running")
})