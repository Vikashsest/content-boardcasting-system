import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/rbac.middleware.js";
import {
  approvedContentController,
  createContentScheduleController,
  getAllContent,
  getLiveContentBySubjectController,
  getLiveContentController,
  pendingContentController,
  rejectContentController,
  uploadContentController,
  UploadMyContentController,
} from "../../controllers/content-controller/content.controller.js";
import { upload } from "../../utils/multer.js";
import { apiRateLimiter } from "../../utils/rateLimiter.js";

const contentrouter = express.Router();
contentrouter.post(
  "/upload",
  authMiddleware,
  authorizeRoles("teacher"),
  upload.single("file"),
  uploadContentController,
);
contentrouter.get("/mycontent", authMiddleware, UploadMyContentController);
contentrouter.get(
  "/pendingcontent",
  authMiddleware,
  authorizeRoles("principal"),
  pendingContentController,
);
contentrouter.patch(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("principal"),
  approvedContentController,
);
contentrouter.patch(
  "/:id/reject",
  authMiddleware,
  authorizeRoles("principal"),
  rejectContentController,
);
contentrouter.get("/", authMiddleware, getAllContent);
contentrouter.get("/live/:teacherId", apiRateLimiter, getLiveContentController);
contentrouter.get(
  "/live/:teacherId/:subject",
  getLiveContentBySubjectController,
);
contentrouter.post(
  "/schedule",
  authMiddleware,
  authorizeRoles("principal"),
  createContentScheduleController,
);
export { contentrouter };
