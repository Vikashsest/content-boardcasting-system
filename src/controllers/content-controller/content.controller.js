import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/apiSuccess.js";
import {
  approvedContentService,
  createContentScheduleService,
  getAllContentService,
  getLiveContentBySubjectService,
  getLiveContentService,
  pendingContentService,
  rejectContentService,
  uploadContentService,
  uploadMyContentService,
} from "../../services/content-services/content.service.js";

const uploadContentController = asyncHandler(async (req, res) => {
  const { title, description, subject, start_time, end_time } = req.body;

  const file = req.file;

  if (!title || !subject || !file) {
    throw new ApiError(400, "Title, subject and file are required");
  }

  const result = await uploadContentService({
    title,
    description,
    subject,
    file,
    userId: req.user.id,
    start_time,
    end_time,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, result, "Content uploaded successfully"));
});

const UploadMyContentController = asyncHandler(async (req, res) => {
  const uploaded_by = req.user.id;
  const result = await uploadMyContentService({ uploaded_by });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "My content fetched successfully"));
});
const pendingContentController = asyncHandler(async (req, res) => {
  const result = await pendingContentService();
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Pending content fetch succesfully"));
});
const approvedContentController = asyncHandler(async (req, res) => {
  const contentId = req.params.id;

  const result = await approvedContentService({
    contentId,
    approved_by: req.user.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Content approved successfully"));
});
const rejectContentController = asyncHandler(async (req, res) => {
  const contentId = Number(req.params.id);
  const { rejection_reason } = req.body;

  if (!contentId) {
    throw new ApiError(400, "Invalid content id");
  }

  if (!rejection_reason || rejection_reason.trim().length < 5) {
    throw new ApiError(400, "Rejection reason must be at least 5 characters");
  }

  const result = await rejectContentService({
    contentId,
    rejectionReason: rejection_reason.trim(),
    rejectedBy: req.user.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Content rejected successfully"));
});
const getAllContent = asyncHandler(async (req, res) => {
  const result = await getAllContentService();
  return res
    .status(200)
    .json(new ApiResponse(200, result, "All Content fetch  successfully"));
});
const getLiveContentController = asyncHandler(async (req, res) => {
  const teacherId = req.params.teacherId;

  const result = await getLiveContentService({ teacherId });

  if (!result) {
    return res.json({ message: "No content available" });
  }

  return res.json(result);
});
const getLiveContentBySubjectController = asyncHandler(async (req, res) => {
  const { teacherId, subject } = req.params;

  if (!teacherId || !subject) {
    throw new ApiError(400, "TeacherId and subject are required");
  }

  const result = await getLiveContentBySubjectService({
    teacherId,
    subject,
  });

  if (!result) {
    return res.status(200).json({
      success: true,
      message: "No content available",
      data: null,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Live content fetched",
    data: result,
  });
});
const createContentScheduleController = asyncHandler(async (req, res) => {
  const { content_id, subject, rotation_order, duration } = req.body;

  if (!content_id || !subject || !rotation_order || !duration) {
    throw new ApiError(400, "All fields are required");
  }

  const result = await createContentScheduleService({
    content_id,
    subject,
    rotation_order,
    duration,
  });

  return res.status(201).json({
    success: true,
    message: "Schedule created",
    data: result,
  });
});
export {
  uploadContentController,
  UploadMyContentController,
  pendingContentController,
  approvedContentController,
  rejectContentController,
  getAllContent,
  getLiveContentController,
  getLiveContentBySubjectController,
  createContentScheduleController,
};
