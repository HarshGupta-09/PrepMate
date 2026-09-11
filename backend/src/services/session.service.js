import Session from "../models/session.model.js";

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

export {
  createSessionService,
  getAllSessionService
};