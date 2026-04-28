export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Content Broadcasting API",
    version: "1.0.0",
    description: "Backend API for Content Broadcasting System",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
    },
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          400: { description: "Invalid credentials" },
        },
      },
    },

    "/user/currentUser": {
      get: {
        summary: "Get current user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "User fetched successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },

    "/content/upload": {
      post: {
        summary: "Upload content",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  subject: { type: "string" },
                  description: { type: "string" },
                  start_time: { type: "string", format: "date-time" },
                  end_time: { type: "string", format: "date-time" },
                  file: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Content uploaded successfully" },
        },
      },
    },

    "/content/mycontent": {
      get: {
        summary: "Get teacher's content",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Content list fetched" },
        },
      },
    },

    "/content/pendingcontent": {
      get: {
        summary: "Get pending content",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Pending content list" },
        },
      },
    },

    "/content/approve/{id}": {
      patch: {
        summary: "Approve content",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Content approved successfully" },
        },
      },
    },

    "/content/{id}/reject": {
      patch: {
        summary: "Reject content",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  rejection_reason: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Content rejected successfully" },
        },
      },
    },

    "/content/live/{teacherId}": {
      get: {
        summary: "Get live content for teacher",
        parameters: [
          {
            name: "teacherId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Live content returned" },
          404: { description: "No content available" },
        },
      },
    },

    "/content/live/{teacherId}/{subject}": {
      get: {
        summary: "Get live content by subject",
        parameters: [
          {
            name: "teacherId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
          {
            name: "subject",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Live subject content returned" },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
