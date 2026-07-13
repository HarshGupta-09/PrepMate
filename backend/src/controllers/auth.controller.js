import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { registerUser, loginUser } from "../services/auth.service.js";
import { AUTH_MESSAGES } from "../constants/index.js";

const register = asyncHandler(async (req, res) => {
    const user = await registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            AUTH_MESSAGES.REGISTER_SUCCESS
        )
    );
});

const login = asyncHandler(async (req, res) => {
    const authData = await loginUser(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            authData,
            AUTH_MESSAGES.LOGIN_SUCCESS
        )
    );
});

export {
    register,
    login,
};