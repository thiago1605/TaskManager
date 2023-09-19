import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AutheticateUserController";

export const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", new AuthenticateUserController().handle);
