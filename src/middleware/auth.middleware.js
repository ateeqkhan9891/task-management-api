// to verify JWT
import jwt from "jsonwebtoken";
// to return 401 unauthorized
import ApiError from "../utils/ApiError.js";
// to get our JWT Secret
import env from "../config/env.js";

// Now we create the function that Express will run whenever a protected route uses this middleware
const authMiddleware = (req, res, next) => {

    // Now the middleware needs to get the JWT that the client sends
    // The client will send: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    // Now we need to make sure it actually exists
    if (!authHeader) {
        throw new ApiError(401, "Authentication required");
    }

    // We know the header exists, but it should look like: Authorization: Bearer eyJhbGciOiJIUzI1Ni...
    // We need to make sure it starts with Bearer
    if (!authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Invalid authorization header");
    }

    // Extract the JWT
    // Right now authHeader contains the whole header: Bearer eyJhbGciOiJIUzI1Ni...
    // But jwt.verify() needs only the token: eyJhbGciOiJIUzI1Ni...
    // So we remove the "Bearer " part.
    const token = authHeader.split(" ")[1];

    // Verify the JWT
    // Now we have the actual token
    // Is this token genuine and still valid?????
    let decoded;
    try {
        decoded = jwt.verify(token, env.JWT_SECRET, {
          algorithms: ["HS256"],
      });
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }

    // Attach the verified user to req.user
    req.user = decoded;
    
    // Call next()
    // Authentication has succeeded
    next();
};

export default authMiddleware;