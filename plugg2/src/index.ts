import express from "express";
import { router } from "./routes";

const app = express()
router(app)

app.listen(3000, () =>{
    console.log("api running")
})