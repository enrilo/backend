import { successResponse } from "../utils/ApiResponse.js";

export const healthCheck = (req, res) => {
  return successResponse(res, "CRM API is up and running 🚀", {
    uptime: process.uptime(),
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
  });
};
