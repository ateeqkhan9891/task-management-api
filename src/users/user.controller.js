
import * as userService from "./user.service.js";

export const getMe = async (req, res) => {
  const user = await userService.getCurrentUser(req.user.userId);

  res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    data: {
      user,
    },
  });
};