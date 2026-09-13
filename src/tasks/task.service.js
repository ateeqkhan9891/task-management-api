
import prisma from "../lib/prisma.js";
import apiError from "../utils/ApiError.js";

export const createTask = async ({
  title,
  description,
  status,
  priority,
  dueDate,
  projectId,
  assignedToId,
  userId,
}) => {
  // Check whether the project exists
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: userId,
    },
  });

  if (!project) {
    throw new apiError(404, "Project not found");
  }

  // Create the task
  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedToId,
    },
  });

  return task;
};


export const getMyTasks = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: {
      project: {
        ownerId: userId,
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks;
};


export const getTaskById = async (taskId, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,

      project: {
        ownerId: userId,
      },
    },
  });

  return task;
};

export const updateTask = async (taskId, userId, data) => {
  const result = await prisma.task.updateMany({
    where: {
      id: taskId,

      project: {
        ownerId: userId,
      },
    },

    data,
  });

  return result;
};

export const deleteTask = async (taskId, userId) => {
  const result = await prisma.task.deleteMany({
    where: {
      id: taskId,

      project: {
        ownerId: userId,
      },
    },
  });

  return result;
};