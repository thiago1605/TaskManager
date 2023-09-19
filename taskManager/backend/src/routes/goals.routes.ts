import { Router } from "express";
import { CreateGoalController } from "../modules/tasks/useCases/Goal/Create/CreateGoalController";
import { ListGoalsByUserIdController } from "../modules/tasks/useCases/Goal/ListByUseId/ListGoalByUserIdController";
import { DeleteGoalByUserIdController } from "../modules/tasks/useCases/Goal/Delete/DeleteGoalByUserIdController";

export const goalRoutes = Router();

goalRoutes.post("/", new CreateGoalController().handle);
goalRoutes.get("/:user_id", new ListGoalsByUserIdController().handle);
goalRoutes.delete("/", new DeleteGoalByUserIdController().handle);
