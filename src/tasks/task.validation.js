
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


export const getTasksQuerySchema = z.object({
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

  search: z.string()
    .trim()
    .max(200, "Search query can't be more than 200 characters")
    .optional(),

  sortBy: z.enum(
    ["createdAt", "title", "dueDate", "status", "priority"],
    {
      message: "Invalid sort field",
    }
  ).optional(),

  order: z.enum(["asc", "desc"], {
    message: "Invalid sort order",
  }).optional(),

  page: z.coerce.number()
    .int("Page must be an integer")
    .min(1, "Page must be at least 1")
    .default(1),

  limit: z.coerce.number()
    .int("Limit must be an integer")
    .min(1, "Limit must be at least 1")
    .max(100, "Limit can't be more than 100")
    .default(10),
});