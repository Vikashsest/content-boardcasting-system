import rateLimit from "express-rate-limit";

const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later",
});
export { apiRateLimiter };
