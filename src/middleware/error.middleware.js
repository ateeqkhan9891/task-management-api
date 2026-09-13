import env from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  if (err.name === "PrismaClientValidationError") {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "A record with this value already exists",
    });
  }

  if (err.code === "P2025") {
  return res.status(404).json({
    success: false,
    message: "Record not found",
  });
}

  const isProduction = env.NODE_ENV === "production";

  const statusCode = err.statusCode || 500;

  // Log unexpected server errors
  if (statusCode >= 500) {
    console.error({
      message: err.message,
      name: err.name,
      code: err.code,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 && isProduction
        ? "Internal server error"
        : err.message || "Internal server error",
  });
};

export default errorMiddleware;