import { Router } from "express";
import { CreateNotificationController } from "../modules/tasks/useCases/Notification/Create/CreateNotificationController";
import { ListNotificationsByUserIdController } from "../modules/tasks/useCases/Notification/ListByUserId/ListNotificationsByUserIdController";
import { DeleteNotificationByIdController } from "../modules/tasks/useCases/Notification/Delete/DeleteNotificationByIdController";

export const notificationRoutes = Router();

notificationRoutes.post("/", new CreateNotificationController().handle);
notificationRoutes.get("/:user_id", new ListNotificationsByUserIdController().handle);
notificationRoutes.delete("/:id", new DeleteNotificationByIdController().handle);
