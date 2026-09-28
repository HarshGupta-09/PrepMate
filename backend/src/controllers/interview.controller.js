import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { GENERAL_MESSAGES } from "../constants/index.js";

import { createInterviewService, getAllInterviewsService ,getInterviewService,endInterviewService,generateNextQuestionService , submitAnswerService, getInterviewTurnsService} from "../services/interview.service.js";

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
                200,
                interviews,
                GENERAL_MESSAGES.SUCCESS
            )
        );

})
const getInterview = asyncHandler(async (req, res) => {

    const interview = await getInterviewService(
        req.user.id,
        req.params.id
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                interview,
                GENERAL_MESSAGES.SUCCESS
            )
        );
});
const endInterview = asyncHandler(async (req, res) => {

    const interview = await endInterviewService(
        req.user.id,
        req.params.id
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                interview,
                GENERAL_MESSAGES.SUCCESS
            )
        );
});

const generateNextQuestion = asyncHandler(async (req, res) => {
  const result = await generateNextQuestionService(
    req.user.id,
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result, // question jo groq ne generate kiya hai vo jayega
      GENERAL_MESSAGES.SUCCESS
    )
  );
});

const submitAnswer = asyncHandler(async (req, res) => {

  const result = await submitAnswerService(
    req.user.id,
    req.params.id,
    req.body.answer
  );

const message = result.completed
    ? "Interview completed successfully"
    : GENERAL_MESSAGES.SUCCESS;

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      message
    )
  );

});


const getInterviewTurns = asyncHandler(async (req, res) => {

    const turns = await getInterviewTurnsService(
        req.user.id,
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            turns,
            GENERAL_MESSAGES.SUCCESS
        )
    );
});

export {
    createInterview,
    getInterviews,
    getInterview,
    endInterview,
    generateNextQuestion,
    submitAnswer,
    getInterviewTurns
};