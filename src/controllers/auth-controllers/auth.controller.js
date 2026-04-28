import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/apiSuccess.js";
import { loginService } from "../../services/auth-services/auth.service.js";

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const result = await loginService({ email, password });
  return res.status(200).json(new ApiResponse(200, result, "Login successful"));
});
export { loginController };
