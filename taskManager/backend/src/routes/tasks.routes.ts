import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/Task/Create/CreateTaskController";
import { ListTasksByUserIdController } from "../modules/tasks/useCases/Task/ListByUserId/ListTasksByUserIdController";
import { FindTaskByNameController } from "../modules/tasks/useCases/Task/FindByName/FindCategoryByNameController";
import { AddCategoryToTaskController } from "../modules/tasks/useCases/Task/AddCategoryToTask/AddCategoryToTaskController";
import { ShareTaskControler } from "../modules/tasks/useCases/Task/Share/ShareTaskControler";
import { SetSharedTaskStatusController } from "../modules/tasks/useCases/Task/SetSharedStatus/SetSharedTaskStatusController";
import { ListSharedTasksByUserReceiverIdController } from "../modules/tasks/useCases/Task/ListSharedByUserReceiver/ListSharedTasksByUserReceiverIdController";
import { checkUserIdExists } from "../middlewares/checkUserIdExists";
import { SetTaskStatusController } from "../modules/tasks/useCases/Task/UpdateStatus";

export const taskRoutes = Router();

taskRoutes.post("/create", new CreateTaskController().handle);
taskRoutes.get("/userId/:user_id", new ListTasksByUserIdController().handle);
taskRoutes.get("/", new FindTaskByNameController().handle);
taskRoutes.post("/addCategory", new AddCategoryToTaskController().handle);
taskRoutes.post("/share", new ShareTaskControler().handle);
taskRoutes.put("/share/status/", new SetSharedTaskStatusController().handle);
taskRoutes.get(
  "/share/listByUserReceiver/:user_id",
  new ListSharedTasksByUserReceiverIdController().handle
);
taskRoutes.put("/newStatus/set", new SetTaskStatusController().handle);
