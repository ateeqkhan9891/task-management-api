import assert from "node:assert/strict";
import test from "node:test";

import ApiError from "../src/utils/ApiError.js";
import {
  getProjectById,
} from "../src/projects/project.controller.js";
import {
  getProjectById as getProjectService,
} from "../src/projects/project.service.js";
import { deleteTask } from "../src/tasks/task.controller.js";

const createResponse = () => {
  const response = {
    statusCode: 200,
    body: undefined,
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  return response;
};

test("project lookup filters by both project ID and authenticated owner", async () => {
  let query;
  const project = { id: "project-1", ownerId: "user-1" };
  const db = {
    project: {
      findFirst: async (args) => {
        query = args;
        return project;
      },
    },
  };

  const result = await getProjectService(
    { projectId: "project-1", userId: "user-1" },
    db,
  );

  assert.equal(result, project);
  assert.deepEqual(query.where, {
    id: "project-1",
    ownerId: "user-1",
  });
});

test("project controller passes the route ID and authenticated user to lookup", async () => {
  let lookupArgs;
  const project = { id: "project-1", ownerId: "user-1" };
  const req = {
    params: { id: "project-1" },
    user: { userId: "user-1" },
  };
  const res = createResponse();
  const service = {
    getProjectById: async (args) => {
      lookupArgs = args;
      return project;
    },
  };

  await getProjectById(req, res, service);

  assert.deepEqual(lookupArgs, {
    projectId: "project-1",
    userId: "user-1",
  });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.data.project, project);
});

test("deleting a task owned by another user returns a not-found ApiError", async () => {
  const req = {
    params: { id: "task-1" },
    user: { userId: "user-1" },
  };
  const res = createResponse();
  const service = {
    deleteTask: async () => ({ count: 0 }),
  };

  await assert.rejects(
    () => deleteTask(req, res, service),
    (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.statusCode, 404);
      assert.equal(error.message, "Task not found");
      return true;
    },
  );
  assert.equal(res.statusCode, 200);
});
