import { Router } from "express";
import { ListActivityLogByUserIdController } from "../modules/tasks/useCases/ActivityLog/ListByUserId/ListActivityLogByUserIdController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const activityLogRoutes = Router();
activityLogRoutes.use(ensureAuthenticated);
activityLogRoutes.get("/", new ListActivityLogByUserIdController().handle);
