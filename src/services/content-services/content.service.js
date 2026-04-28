import { Op } from "sequelize";
import { Content } from "../../models/content.model.js";
import { ApiError } from "../../utils/apiError.js";

const uploadContentService = async ({
  title,
  description,
  subject,
  file,
  userId,
  start_time,
  end_time,
}) => {
  const content = await Content.create({
    title,
    description,
    subject,
    start_time,
    end_time,
    file_url: file.path,
    file_type: file.mimetype,
    file_size: file.size,
    uploaded_by: userId,
    status: "pending",
  });

  return content;
};

const uploadMyContentService = async ({ uploaded_by }) => {
  const getMyContent = await Content.findAll({
    where: { uploaded_by },
    order: [["createdAt", "DESC"]],
  });

  return getMyContent;
};

const pendingContentService = async () => {
  const pendingContent = await Content.findAll({
    where: { status: "pending" },
    order: [["createdAt", "DESC"]],
  });
  return pendingContent;
};
// const approvedContentService = async ({ contentId, approved_by }) => {
//   const [updatedRows] = await Content.update(
//     {
//       status: "approved",
//       approved_by,
//       approved_at: new Date(),
//     },
//     {
//       where: {
//         id: contentId,
//         status: "pending",
//       },
//     }
//   );

//   if (updatedRows === 0) {
//     throw new ApiError(400, "Content not found or already processed");
//   }

//   return await Content.findByPk(contentId);
// };

const approvedContentService = async ({ contentId, approved_by }) => {
  const content = await Content.findByPk(contentId);

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  if (content.status !== "pending") {
    throw new ApiError(400, "Only pending content can be approved");
  }

  content.status = "approved";
  content.approved_by = approved_by;
  content.approved_at = new Date();

  await content.save();

  return content;
};
const rejectContentService = async ({
  contentId,
  rejectionReason,
  rejectedBy,
}) => {
  const content = await Content.findByPk(contentId);

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  if (content.status !== "pending") {
    throw new ApiError(400, "Only pending content can be rejected");
  }
  content.set({
    status: "rejected",
    rejection_reason: rejectionReason,
    approved_by: rejectedBy,
    approved_at: new Date(),
  });

  await content.save();

  return content;
};
const getAllContentService = async () => {
  const allContents = await Content.findAll();
  return allContents;
};

// const getLiveContentService = async ({ teacherId }) => {
//   const now = new Date();
//   const test = await Content.findAll({
//     where: {
//       uploaded_by: teacherId,
//       status: "approved",
//     },
//   });

//   console.log("BASE RESULT:", test);

//   const contents = await Content.findAll({
//     where: {
//       uploaded_by: teacherId,
//       status: "approved",

//       start_time: {
//         [Op.lte]: now,
//       },

//       end_time: {
//         [Op.gte]: now,
//       },
//     },
//     order: [["createdAt", "ASC"]],
//   });
//   console.log("MATCHED CONTENT:", contents);

//   if (!contents.length) {
//     return null;
//   }
//   const rotation = Math.floor(Date.now() / (5 * 60 * 1000)) % contents.length;
//   return contents[rotation];
// };

// const getLiveContentService = async ({ teacherId, subject }) => {
//   const now = new Date();

//   const whereClause = {
//     uploaded_by: teacherId,
//     status: "approved",
//   };
//   if (subject) {
//     whereClause.subject = subject;
//   }

//   const contents = await Content.findAll({
//     where: whereClause,
//     order: [["createdAt", "ASC"]],
//   });

//   if (!contents.length) return null;
//   const activeContents = contents.filter((c) => {
//     if (!c.start_time || !c.end_time) return false;

//     const start = new Date(c.start_time);
//     const end = new Date(c.end_time);

//     return start <= now && end >= now;
//   });

//   if (!activeContents.length) return null;
//   const duration = activeContents[0].rotation_duration || 5;

//   const index =
//     Math.floor(Date.now() / (duration * 60 * 1000)) % activeContents.length;

//   return activeContents[index];
// };

const getLiveContentService = async ({ teacherId }) => {
  const now = new Date();

  const contents = await Content.findAll({
    where: {
      uploaded_by: teacherId,
      status: "approved",
    },
    order: [["createdAt", "ASC"]],
  });

  if (!contents.length) return null;

  const activeContents = contents.filter((c) => {
    if (!c.start_time || !c.end_time) return false;

    const start = new Date(c.start_time);
    const end = new Date(c.end_time);

    return start <= now && end >= now;
  });

  if (!activeContents.length) return null;

  let totalDuration = 0;
  const timeline = [];

  for (let c of activeContents) {
    const duration = (c.rotation_duration || 5) * 60 * 1000;
    totalDuration += duration;

    timeline.push({
      content: c,
      endTime: totalDuration,
    });
  }

  const currentTime = Date.now() % totalDuration;

  for (let t of timeline) {
    if (currentTime < t.endTime) {
      return t.content;
    }
  }

  return null;
};

const getLiveContentBySubjectService = async ({ teacherId, subject }) => {
  const now = new Date();

  const contents = await Content.findAll({
    where: {
      uploaded_by: teacherId,
      subject,
      status: "approved",
    },
    order: [["createdAt", "ASC"]],
  });

  if (!contents.length) return null;
  const activeContents = contents.filter((c) => {
    if (!c.start_time || !c.end_time) return false;

    const start = new Date(c.start_time);
    const end = new Date(c.end_time);

    return start <= now && end >= now;
  });

  if (!activeContents.length) return null;
  let totalDuration = 0;
  const timeline = [];

  for (let c of activeContents) {
    const duration = (c.rotation_duration || 5) * 60 * 1000;
    totalDuration += duration;

    timeline.push({
      content: c,
      endTime: totalDuration,
    });
  }
  const currentTime = Date.now() % totalDuration;
  for (let t of timeline) {
    if (currentTime < t.endTime) {
      return t.content;
    }
  }

  return null;
};
const createContentScheduleService = async ({
  content_id,
  subject,
  rotation_order,
  duration,
}) => {
  const schedule = await ContentSchedule.create({
    content_id,
    subject,
    rotation_order,
    duration,
  });

  return schedule;
};
export {
  uploadContentService,
  uploadMyContentService,
  pendingContentService,
  approvedContentService,
  rejectContentService,
  getAllContentService,
  getLiveContentService,
  getLiveContentBySubjectService,
  createContentScheduleService,
};
