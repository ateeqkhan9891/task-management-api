
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

  // If a user is assigned, make sure that user actually exists
  if (assignedToId) {
    const assignedUser = await prisma.user.findUnique({
      where: {
        id: assignedToId,
      },
    });

    if (!assignedUser) {
      throw new apiError(404, "Assigned user not found");
    }
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


export const getMyTasks = async (userId, filters = {}) => {
  const { status, priority, search, sortBy, order } = filters;

  const where = {
    project: {
      ownerId: userId,
    },
  };

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const orderBy = sortBy
    ? {
        [sortBy]: order || "desc",
      }
    : {
        createdAt: "desc",
      };

  const tasks = await prisma.task.findMany({
    where,
    orderBy,
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
  // If assigning to a user, make sure that user actually exists
  if (data.assignedToId) {
    const assignedUser = await prisma.user.findUnique({
      where: {
        id: data.assignedToId,
      },
    });

    if (!assignedUser) {
      throw new apiError(404, "Assigned user not found");
    }
  }

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