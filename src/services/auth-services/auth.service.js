import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/apiError.js";
import { generateToken } from "../../utils/generate.token.js";

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return { token };
};

export { loginService };
