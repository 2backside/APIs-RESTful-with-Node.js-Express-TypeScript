import express from 'express';
import { UsersController } from '../controllers/user_controller';

export const userRoutes = express.Router();

userRoutes.get("/", UsersController.home);

userRoutes.get("/users", UsersController.getAll);
userRoutes.post("/users", UsersController.create);
userRoutes.put("/users/:id", UsersController.update);
userRoutes.delete("/users/:id", UsersController.delete);
userRoutes.get("/users/:id", UsersController.getById);

