import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { GENERAL_MESSAGES } from "../constants/index.js";
import { createSessionService,getAllSessionService ,getSessionService,updateSessionService,deleteSessionService} from "../services/session.service.js";
import { generateQuestionsService ,getAllQuestionsService} from "../services/question.service.js";
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

const updateSession = asyncHandler(async (req, res) => {
  const updatedSession = await updateSessionService(
    req.user.id,
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedSession,
      GENERAL_MESSAGES.SUCCESS
    )
  );
});


const deleteSession = asyncHandler(async (req, res) => {
  await deleteSessionService(req.user.id, req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      GENERAL_MESSAGES.SUCCESS
    )
  );
});

const generateQuestions = asyncHandler(async(req,res)=>{

  const questions = await generateQuestionsService(req.user.id , req.params.id)
    return res.status(200).json(
    new ApiResponse(
      200,
      questions,
      GENERAL_MESSAGES.SUCCESS
    )
  );
})
const getAllQuestions = asyncHandler(async(req,res)=>{

  const questions = await getAllQuestionsService(req.user.id , req.params.id)
    return res.status(200).json(
    new ApiResponse(
      200,
      questions,
      GENERAL_MESSAGES.SUCCESS
    )
  );
})


export {
  createSession,
  getAllSession,
  getSession,
  updateSession,
  deleteSession,
  generateQuestions,
  getAllQuestions
};