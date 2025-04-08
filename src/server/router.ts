import express from "express";
import { TaskController } from "./task";

export const router = express.Router();

const taskRouter = express.Router();

taskRouter.route("/").get(TaskController.getAll).post(TaskController.create);

taskRouter
  .route("/:id")
  .get(TaskController.getById)
  .put(TaskController.update)
  .delete(TaskController.delete);

router.use("/tasks", taskRouter);
