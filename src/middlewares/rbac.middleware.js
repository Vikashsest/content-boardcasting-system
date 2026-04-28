import { ApiError } from "../utils/apiError.js";

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return next(new ApiError(401, "Unauthorized"));
    }
    if (!roles.includes(user.role)) {
      return next(
        new ApiError(403, "Forbidden:you don't have access to this resource"),
      );
    }
    next();
  };
};

export { authorizeRoles };
