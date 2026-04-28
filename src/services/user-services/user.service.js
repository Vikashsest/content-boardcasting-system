import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/apiError.js";

const getCurrentUserService = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export { getCurrentUserService };
