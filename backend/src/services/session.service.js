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

const updateSessionService = async (userId, sessionId, sessionData) => {
  const updatedSession = await Session.findOneAndUpdate(
    {
      _id: sessionId,
      userId: userId,
    },
    {
      $set: sessionData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSession) {
    throw new ApiError(404, "Session not found");
  }

  return updatedSession;
};
const deleteSessionService = async (userId, sessionId) => {
  const deletedSession = await Session.findOneAndDelete({
    _id: sessionId,
    userId,
  });

  if (!deletedSession) {
    throw new ApiError(404, "Session not found");
  }
};

export {
  createSessionService,
  getAllSessionService,
  getSessionService,
  updateSessionService,
  deleteSessionService
};