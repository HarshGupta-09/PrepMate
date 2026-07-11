import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        avatar: {
            type: String,
            default: "",
        },

        refreshToken: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
        versionKey : false,
    }
);

const User = mongoose.model("User", userSchema);

export default User;