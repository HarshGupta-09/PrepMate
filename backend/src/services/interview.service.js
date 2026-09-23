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

const getAllInterviewsService = async(userId)=>{
    return await Interview.find({userId})
}
const getInterviewService = async(userId,interviewId)=>{
    const interview = await Interview.findOne({
        _id : interviewId,
        userId
    });
    if(!interview){
        throw new ApiError(404,"Interview not found")

    }
    return interview;
}




export {
    createInterviewService,
    getAllInterviewsService,
    getInterviewService
}