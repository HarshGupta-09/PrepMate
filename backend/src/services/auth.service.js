import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { AUTH_MESSAGES } from "../constants/messages.js";

const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, AUTH_MESSAGES.USER_ALREADY_EXISTS);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

const loginUser = async (userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, AUTH_MESSAGES.USER_NOT_FOUND);
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

   
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        user,
        token,
    };
};

export {
    registerUser,
    loginUser,
};