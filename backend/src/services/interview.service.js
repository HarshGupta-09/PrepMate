import Interview from "../models/Interview.model.js";
import Session from "../models/session.model.js";
import ApiError from "../utils/ApiError.js";

const createInterviewService = async (interviewData, userId) => {
    if (interviewData.type === "technical") {
        const session = await Session.findOne({
            _id: interviewData.sessionId,
            userId,
        });

        if (!session) {
            throw new ApiError(404, "Session not found");
        }
    }

    const interview = await Interview.create({
        userId,
        ...interviewData,
    });

    return interview;
};

export {
    createInterviewService
}