
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Task title can't be empty")
    .max(200, "Task title can't be more than 200 characters"),

  description: z.string()
    .trim()
    .max(1000, "Description can't be more than 1000 characters")
    .optional(),

  status: z.enum(
    ["TODO", "IN_PROGRESS", "DONE"],
    {
      message: "Invalid task status",
    }
  ).optional(),

  priority: z.enum(
    ["LOW", "MEDIUM", "HIGH"],
    {
      message: "Invalid task priority",
    }
  ).optional(),

  dueDate: z.coerce.date().optional(),

  projectId: z.string()
    .min(1, "Project ID is required"),

assignedToId: z.string()
    .uuid("Invalid assigned user ID")
    .optional(),
});


export const updateTaskSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Task title can't be empty")
    .max(200, "Task title can't be more than 200 characters")
    .optional(),

  description: z.string()
    .trim()
    .max(1000, "Description can't be more than 1000 characters")
    .optional(),

  status: z.enum(
    ["TODO", "IN_PROGRESS", "DONE"],
    {
      message: "Invalid task status",
    }
  ).optional(),

  priority: z.enum(
    ["LOW", "MEDIUM", "HIGH"],
    {
      message: "Invalid task priority",
    }
  ).optional(),

  dueDate: z.coerce.date().optional(),

  assignedToId: z.string()
    .uuid("Invalid assigned user ID")
    .optional(),
});