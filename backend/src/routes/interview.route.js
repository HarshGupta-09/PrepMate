import express from "express"
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import { createInterviewSchema , submitAnswerSchema } from "../validators/interview.validator.js"
import { createInterview, getInterviews,getInterview,endInterview , generateNextQuestion , submitAnswer } from "../controllers/interview.controller.js"

const interviewRouter = express.Router();


interviewRouter.post("/",
    authMiddleware,
    validate(createInterviewSchema),
    createInterview


)

interviewRouter.get("/",
    authMiddleware,
    getInterviews,


)
interviewRouter.get("/:id",
    authMiddleware,
    getInterview,


)
interviewRouter.post("/:id/end",
    authMiddleware,
    endInterview
    


)
interviewRouter.post( 
  "/:id/next-question",
  authMiddleware,
  generateNextQuestion
);

interviewRouter.post("/:id/answer",
    authMiddleware,
    validate(submitAnswerSchema),
    submitAnswer,
)



export default interviewRouter;