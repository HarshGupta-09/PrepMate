import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { GENERAL_MESSAGES } from "../constants/index.js";

import { createInterviewService, getAllInterviewsService } from "../services/interview.service.js";

const createInterview = asyncHandler(async (req, res) => {
    const interview = await createInterviewService(
        req.body,
        req.user.id
    );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                interview,
                GENERAL_MESSAGES.SUCCESS
            )
        );
});

const getInterviews = asyncHandler(async (req,res)=>{
    const interviews = await getAllInterviewsService(req.user.id)
     return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                interviews,
                GENERAL_MESSAGES.SUCCESS
            )
        );

})

export {
    createInterview,
    getInterviews
};