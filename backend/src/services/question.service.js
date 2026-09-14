import Question from "../models/question.model.js"
import ApiError from "../utils/ApiError.js";
import Session from "../models/session.model.js";

const generateQuestionsService = async (userId, sessionId) => {

  // 1. Find session
  const session = await Session.findOne({
    _id : sessionId,
    userId,
  })

  // 2. If session doesn't exist → 404
  if(!session){
    throw new ApiError(
        404, "Session Not Found"
    )
  }



  // 3. Find existing questions
  

  // 4. Calculate starting order

  // 5. Generate 10 questions using Gemini

  // 6. Validate Gemini response

  // 7. Save questions

  // 8. Return questions
};
export{
    generateQuestionsService
}