import * as adminService from "./admin.service.js";
import apiError from "../utils/ApiError.js";

export const listUsers = async (req, res) => {
  const users = await adminService.listAllUsers();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: {
      users,
    },
  });
};

export const getStats = async (req, res) => {
  const stats = await adminService.getStats();

  res.status(200).json({
    success: true,
    message: "Stats fetched successfully",
    data: {
      stats,
    },
  });
};