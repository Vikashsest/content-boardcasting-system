import { ApiError } from "../utils/apiError.js";
import { verifyToken } from "../utils/verify.token.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader
    ?.split(" ")[1]
    ?.trim()
    ?.replace(/\r?\n|\r/g, "");

  if (!token) {
    throw new ApiError(401, "Unauthorized:Token missing");
  }

  try {
    const decoed = verifyToken(token);

    req.user = decoed;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export { authMiddleware };
