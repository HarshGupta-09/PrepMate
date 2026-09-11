import express from "express"
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import { sessionSchema } from "../validators/session.validator.js";
const sessionRouter = express.Router();
import { createSession } from "../controllers/session.controller.js";

sessionRouter.post(
    "/",
    authMiddleware,
        validate(sessionSchema),
        createSession,
)





export default sessionRouter;