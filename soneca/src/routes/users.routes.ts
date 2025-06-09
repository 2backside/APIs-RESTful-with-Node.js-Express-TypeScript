import express from "express";
import { usercontrollers } from "../controllers/usercontrollers";
import expressAsyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { UserSchema } from "../models/user.models";

export const userRoutes = express.Router()

userRoutes.get("/", usercontrollers.Gethome)

userRoutes.put("/users/:id", celebrate({[Segments.BODY]: UserSchema}), expressAsyncHandler(usercontrollers.PutUser));
userRoutes.get("/users/", expressAsyncHandler(usercontrollers.GetAll));
userRoutes.get("/users/:id", expressAsyncHandler(usercontrollers.GetById));
userRoutes.post("/users/", celebrate({[Segments.BODY]: UserSchema}), expressAsyncHandler(usercontrollers.PostUser));
userRoutes.delete("/users/:id", expressAsyncHandler(usercontrollers.DeleteUser));