import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { GENERAL_MESSAGES } from "../constants/index.js";
import { createSessionService } from "../services/session.service.js";

const createSession = asyncHandler(async (req, res) => {
  const session = await createSessionService(req.body, req.user.id);

  return res.status(201).json(
    new ApiResponse(
      201,
      session,
      GENERAL_MESSAGES.SUCCESS
    )
  );
});

export {
  createSession
};