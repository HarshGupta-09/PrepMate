import express from "express";

import ApiResponse from "./utils/ApiResponse.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
    const user = {
        name: "Harsh",
        role: "Student",
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            user, 
            "User fetched successfully"
        )
    );
});

// Handles Undefined Routes
app.use(notFoundMiddleware);

// Global Error Handler 
app.use(errorMiddleware);

export default app;