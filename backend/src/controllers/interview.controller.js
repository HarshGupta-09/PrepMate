import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { GENERAL_MESSAGES } from "../constants/index.js";

import { createInterviewService } from "../services/interview.service.js";

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

export {
    createInterview
};