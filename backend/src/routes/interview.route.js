import express from "express"
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import { createInterviewSchema } from "../validators/interview.validator.js"
import { createInterview, getInterviews,getInterview} from "../controllers/interview.controller.js"

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



export default interviewRouter;