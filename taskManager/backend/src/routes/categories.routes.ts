import { Router } from "express";
import { CreateCategoryController } from "../modules/tasks/useCases/Category/Create/CreateCategoryController";
import { ListCategoriesByUserIdController } from "../modules/tasks/useCases/Category/ListByUserId/ListCategoriesByUserIdController";
import { FindCategoryByNameController } from "../modules/tasks/useCases/Category/FindByName/FindCategoryByNameController";
import { ListCategoriesByTaskIdController } from "../modules/tasks/useCases/Category/ListByTaskId/ListByTaskIdController";

export const categoryRoutes = Router();

categoryRoutes.post("/", new CreateCategoryController().handle);
categoryRoutes.get("/:user_id",  new ListCategoriesByUserIdController().handle);
categoryRoutes.get("/", new FindCategoryByNameController().handle);
categoryRoutes.get("/byTaskId", new ListCategoriesByTaskIdController().handle);
