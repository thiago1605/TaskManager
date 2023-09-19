import { container } from "tsyringe";
import { IUserRepository } from "../../modules/accounts/repositories/interfaces/IUserRepository";
import { UserRepository } from "../../modules/accounts/repositories/UsersRepository";
import { ITaskRepository } from "../../modules/tasks/repositories/Interfaces/ITaskRepository";
import { TaskRepository } from "../../modules/tasks/repositories/TaskRepository";
import { ICategoryRepository } from "../../modules/tasks/repositories/Interfaces/ICategoryRepository";
import { CategoryRepository } from "../../modules/tasks/repositories/CategoryRepository";
import { IGoalRepository } from "../../modules/tasks/repositories/Interfaces/IGoalRepository";
import { GoalRepository } from "../../modules/tasks/repositories/GoalRepository";
import { INotificationRepository } from "../../modules/tasks/repositories/Interfaces/INotificationRepository";
import { NotificationRepository } from "../../modules/tasks/repositories/NotificationRepository";
import { IActivityLogRepository } from "../../modules/tasks/repositories/Interfaces/IActivityLogRepository";
import { ActivityLogRepository } from "../../modules/tasks/repositories/ActivityLogRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ITaskRepository>("TaskRepository", TaskRepository);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<IGoalRepository>("GoalRepository", GoalRepository);
container.registerSingleton<INotificationRepository>(
  "NotificationRepository",
  NotificationRepository
);

container.registerSingleton<IActivityLogRepository>(
  "ActivityLogRepository",
  ActivityLogRepository
);
