import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { GENERAL_MESSAGES } from "../constants/index.js";
import { createSessionService,getAllSessionService ,getSessionService} from "../services/session.service.js";

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

const getAllSession = asyncHandler(async (req, res) => {
  const sessions = await getAllSessionService(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      sessions,
      GENERAL_MESSAGES.SUCCESS
    )
  );
});
const getSession = asyncHandler(async (req, res) => {
  const session = await getSessionService(req.user.id,req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      session,
      GENERAL_MESSAGES.SUCCESS
    )
  );
});


export {
  createSession,
  getAllSession,
  getSession,
};