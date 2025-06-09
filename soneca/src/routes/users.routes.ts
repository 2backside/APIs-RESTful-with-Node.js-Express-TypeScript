import express from "express"
import { usercontrollers } from "../controllers/usercontrollers"
import expressAsyncHandler from "express-async-handler"
import { celebrate, Joi, Segments } from "celebrate"

export const userRoutes = express.Router()

userRoutes.get("/", usercontrollers.Gethome)

userRoutes.put("/users/:id", expressAsyncHandler(usercontrollers.PutUser));
userRoutes.get("/users/", expressAsyncHandler(usercontrollers.GetAll));
userRoutes.get("/users/:id", expressAsyncHandler(usercontrollers.GetById));

userRoutes.post("/users/", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required()
        })
    }), expressAsyncHandler(usercontrollers.PostUser));

userRoutes.delete("/users/:id", expressAsyncHandler(usercontrollers.DeleteUser));

