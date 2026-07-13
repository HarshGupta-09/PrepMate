import express from "express";

import { register, login } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";

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

export default authRouter;