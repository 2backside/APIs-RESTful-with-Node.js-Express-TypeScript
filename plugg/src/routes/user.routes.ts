import express from 'express';
import { UsersController } from '../controllers/user_controller';
import expressAsyncHandler from 'express-async-handler';
import { Segments, celebrate } from 'celebrate';
import { userSchema } from '../models/user.models';

export const userRoutes = express.Router();

userRoutes.get("/", expressAsyncHandler(UsersController.home));
userRoutes.get("/users", expressAsyncHandler(UsersController.getAll));
userRoutes.post("/users", celebrate({[Segments.BODY]: userSchema}), expressAsyncHandler(UsersController.create));
userRoutes.put("/users/:id", celebrate({[Segments.BODY]: userSchema}), expressAsyncHandler(UsersController.update));
userRoutes.delete("/users/:id", expressAsyncHandler(UsersController.delete));
userRoutes.get("/users/:id", expressAsyncHandler(UsersController.getById));