import express from "express"
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import { sessionSchema } from "../validators/session.validator.js";
const sessionRouter = express.Router();
import { createSession,getAllSession , getSession } from "../controllers/session.controller.js";

sessionRouter.post(
    "/",
    authMiddleware,
        validate(sessionSchema),
        createSession,
)
sessionRouter.get(
    "/",
    authMiddleware,
        validate(sessionSchema),
        getAllSession,
)
sessionRouter.get(
    "/:id",
    authMiddleware,
        validate(sessionSchema),
        getSession,
)





export default sessionRouter;