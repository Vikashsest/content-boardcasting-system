import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiSuccess.js";
import { getCurrentUserService } from "../../services/user-services/user.service.js";

const CurrentUserController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  console.log("user", userId);

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const user = await getCurrentUserService(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});
export { CurrentUserController };
