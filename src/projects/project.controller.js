
import { createProjectSchema, updateProjectSchema } from "./project.validation.js";
import * as projectService from "./project.service.js";
import apiError from "../utils/ApiError.js";
import { success } from "zod";


export const createProject = async (req,res) => {
    const validation = createProjectSchema.safeParse(req.body);

    if(!validation.success){
        throw new apiError(400,validation.error.issues[0].message);
    };

    const project = await projectService.createProject({
        ...validation.data,
        ownerId: req.user.userId,
    });

    res.status(201).json({
        success: true,
        message: "project created suyccessfully",
        data: {
            project,
        }
    })
}


export const getMyProjects = async (req, res) => {
  const projects = await projectService.getMyProjects(req.user.userId);

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: {
      projects,
    },
  });
};


export const getProjectById = async (req, res, service = projectService) => {
    const project = await service.getProjectById({
        projectId: req.params.id,
        userId: req.user.userId,
    });

    if (!project) {
        throw new apiError(404, "Project not found");
    };

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: {
        project,
     },
   });
}


export const updateProject = async (req, res) => {
  const validation = updateProjectSchema.safeParse(req.body);

  if (!validation.success) {
    throw new apiError(400, validation.error.issues[0].message);
  }

  const result = await projectService.updateProject(
    req.params.id,
    req.user.userId,
    validation.data
  );

  if (result.count === 0) {
    throw new apiError(404, "Project not found");
  }

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
  });
};



export const deleteProject = async (req, res) => {
  const result = await projectService.deleteProject(
    req.params.id,
    req.user.userId
  );

  if (result.count === 0) {
    throw new apiError(404, "Project not found");
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};