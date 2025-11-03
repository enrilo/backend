// @ts-check
import express from "express";
import { userLoginController } from "../controllers/user/userLoginController.js";
import { createUserController } from "../controllers/user/createUserController.js";
import { getUsersController } from "../controllers/user/getUsersController.js";
import { getUserByIdController } from "../controllers/user/getUserByIdController.js";
import { deleteUserByIdController } from "../controllers/user/deleteUserByIdController.js";
import { updateUserController } from "../controllers/user/updateUserController.js";

const userRoutes = express.Router();

userRoutes.post("/login", userLoginController);

userRoutes.post("/", createUserController);

userRoutes.get("/", getUsersController);

userRoutes.get("/:id", getUserByIdController);

userRoutes.delete("/:id", deleteUserByIdController);

userRoutes.put("/:id", updateUserController);

export default userRoutes;

