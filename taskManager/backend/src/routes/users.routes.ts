import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

export const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
