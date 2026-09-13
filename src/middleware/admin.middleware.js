import ApiError from "../utils/ApiError.js";

// Only allow users with the ADMIN role to access the route
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    throw new ApiError(403, "Access denied. Admin role required.");
  }

  next();
};

export default adminMiddleware;