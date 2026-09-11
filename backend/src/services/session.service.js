import Session from "../models/session.model.js";
import ApiError from "../utils/ApiError.js";
const createSessionService = async (sessionData, userId) => {
  const session = await Session.create({
    userId,
    ...sessionData,
  });

  return session;
};

const getAllSessionService = async (userId) => {
  return await Session.find({ userId });
};

const getSessionService = async (userId, sessionId) => {
  const session = await Session.findOne({
    _id: sessionId,
    userId
  });

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  return session;
};

export {
  createSessionService,
  getAllSessionService,
  getSessionService
};