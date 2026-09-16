
import {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
} from "./task.validation.js";
import * as taskService from "./task.service.js";
import apiError from "../utils/ApiError.js";

export const createTask = async (req, res) => {
  const validation = createTaskSchema.safeParse(req.body);

  if (!validation.success) {
    throw new apiError(400, validation.error.issues[0].message);
  }

  const task = await taskService.createTask({
    ...validation.data,
    userId: req.user.userId,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: {
      task,
    },
  });
};


export const getMyTasks = async (req, res) => {
  const validation = getTasksQuerySchema.safeParse(req.query);

  if (!validation.success) {
    throw new apiError(400, validation.error.issues[0].message);
  }

  const result = await taskService.getMyTasks(
    req.user.userId,
    validation.data
  );

  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    data: result.tasks,
    pagination: result.pagination,
  });
};


export const getTaskById = async (req, res) => {
  const task = await taskService.getTaskById(
    req.params.id,
    req.user.userId
  );

  if (!task) {
    throw new apiError(404, "Task not found");
  }

  res.status(200).json({
    success: true,
    message: "Task fetched successfully",
    data: {
      task,
    },
  });
};


export const updateTask = async (req, res) => {
  const validation = updateTaskSchema.safeParse(req.body);

  if (!validation.success) {
    throw new apiError(400, validation.error.issues[0].message);
  }

  const result = await taskService.updateTask(
    req.params.id,
    req.user.userId,
    validation.data
  );

  if (result.count === 0) {
    throw new apiError(404, "Task not found");
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
  });
};

export const deleteTask = async (req, res, service = taskService) => {
  const result = await service.deleteTask(
    req.params.id,
    req.user.userId
  );

  if (result.count === 0) {
    throw new apiError(404, "Task not found");
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};