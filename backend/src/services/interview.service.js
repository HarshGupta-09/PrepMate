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
const endInterviewService = async (userId, interviewId) => {

    const interview = await Interview.findOneAndUpdate(
        {
            _id: interviewId,
            userId,
            status: "active",
        },
        {
            $set: {
                status: "completed",
                endedAt: new Date(),
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!interview) {
        throw new ApiError(404, "Interview already ended");
    }

    return interview;
};


export {
    createInterviewService,
    getAllInterviewsService,
    getInterviewService,
    endInterviewService,
}