

import prisma from "../lib/prisma";

export const createProject = async ({name,description,ownerId}) => {
    const project = await prisma.project.create({
        data: {
            name,description,ownerId,
        }
    });

    return project;
}


export const getMyProjects = async (userId) => {
  const projects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
};

export const getProjectById = async ({projectId,userId}) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            ownerId: userId,
        }
    });

    return project;
}


export const updateProject = async (projectId, userId, data) => {
  const project = await prisma.project.updateMany({
    where: {
      id: projectId,
      ownerId: userId,
    },
    data,
  });

  return project;
};


export const deleteProject = async (projectId, userId) => {
  const result = await prisma.project.deleteMany({
    where: {
      id: projectId,
      ownerId: userId,
    },
  });

  return result;
};