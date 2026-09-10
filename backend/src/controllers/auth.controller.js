import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { registerUser, loginUser ,getMe} from "../services/auth.service.js";
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

const me = asyncHandler(async (req, res) => {
    const userData = await getMe(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            userData,
           "user fetched successfully"
        )
    );
});
export {
    register,
    login,
    me
};