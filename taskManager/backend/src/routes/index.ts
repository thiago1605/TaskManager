import { Router } from "express";
import { userRoutes } from "./users.routes";
import { taskRoutes } from "./tasks.routes";
import { categoryRoutes } from "./categories.routes";
import { goalRoutes } from "./goals.routes";
import { notificationRoutes } from "./notifications.routes";
import { activityLogRoutes } from "./activityLogs.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const router = Router();

router.use("/users", userRoutes);
router.use(authenticateRoutes);

router.use(ensureAuthenticated);
router.use("/tasks", taskRoutes);
router.use("/categories", categoryRoutes);
router.use("/goals", goalRoutes);
router.use("/notifications", notificationRoutes);
router.use("/activityLogs", activityLogRoutes);
