import express from "express";
import { router } from "./routes";
import { initializeApp } from 'firebase-admin/app';

initializeApp();
const app = express()
router(app)

app.listen(3000, () =>{
    console.log("api running")
})