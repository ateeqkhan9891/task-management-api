
// We only need to validate the data the client is allowed 
// to send when creating or updating a project.

import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Project name can't be empty")
    .max(100, "Project name can't be more than 100 characters"),

  description: z.string()
    .trim()
    .max(500, "Description can't be more than 500 characters")
    .optional(),
});


export const updateProjectSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Project name can't be empty")
    .max(100, "Project name can't be more than 100 characters")
    .optional(),

  description: z.string()
    .trim()
    .max(500, "Description can't be more than 500 characters")
    .optional(),
});