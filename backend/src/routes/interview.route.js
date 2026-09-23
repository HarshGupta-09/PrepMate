import express from "express"
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import { createInterviewSchema } from "../validators/interview.validator.js"
import { createInterview, getInterviews} from "../controllers/interview.controller.js"

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



export default interviewRouter;