import express from "express"
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import { sessionSchema, updateSessionSchema } from "../validators/session.validator.js";
const sessionRouter = express.Router();
import { createSession,getAllSession , getSession,updateSession } from "../controllers/session.controller.js";

sessionRouter.post(
    "/",
    authMiddleware,
        validate(sessionSchema),
        createSession,
)
sessionRouter.get(
    "/",
    authMiddleware,
      
        getAllSession,
)
sessionRouter.get(
    "/:id",
    authMiddleware,
       
        getSession,
)
sessionRouter.patch(
    "/:id",
    authMiddleware,
        validate(updateSessionSchema),
        updateSession,
)





export default sessionRouter;