import prisma from "../lib/prisma.js";

// List every registered user (password hashes are excluded)
export const listAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

// Simple counts for an admin dashboard
export const getStats = async () => {
  const [userCount, projectCount, taskCount] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.task.count(),
  ]);

  return {
    users: userCount,
    projects: projectCount,
    tasks: taskCount,
  };
};