import express from "express";

import { register, login, me,changePass } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    validate(registerSchema),
    register
);

authRouter.post(
    "/login",
    validate(loginSchema),
    login
);
authRouter.get(
    "/me",
    authMiddleware,
    me
)
authRouter.patch(
    "/change-pass",
    authMiddleware,
    changePass
)

export default authRouter;