import express from "express"
import { usercontrollers } from "../controllers/usercontrollers"

export const userRoutes = express.Router()

userRoutes.get("/", usercontrollers.Gethome)

userRoutes.put("/users/:id", usercontrollers.PutUser)
userRoutes.get("/users/", usercontrollers.GetAll)
userRoutes.get("/users/:id", usercontrollers.GetbyId)
userRoutes.post("/users/", usercontrollers.PostUser)
userRoutes.delete("/users/:id", usercontrollers.DeleteUser)

