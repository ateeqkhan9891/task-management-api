import { registerSchema, loginSchema } from "./auth.validation.js";
import * as authService from "./auth.service.js";
import ApiError from "../utils/ApiError.js";

// the controller needs to recieve to recieve express request and response
export const register = async (req, res) => {
  const validation = registerSchema.safeParse(req.body);

  // Handle validation failure
  if (!validation.success) {
    throw new ApiError(400, validation.error.issues[0].message);
  }

  // Validation succeeded, so now we pass the validated data to our service
  const user = await authService.register(validation.data);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
    },
  });
};


export const login = async (req,res) => {
    const validation = loginSchema.safeParse(req.body);

    if(!validation.success){
        throw new ApiError(400,validation.error.issues[0].message);
    };

    // Validation succeeded, so now we pass the validated data to our service.
    const data = await authService.login(validation.data); 

    // Send the login response - Now we send it back to the client
    res.status(200).json({
        success: true,
        message: "Login successful",
        data,
    });
}