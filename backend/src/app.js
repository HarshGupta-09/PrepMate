import express from "express";

import ApiResponse from "./utils/ApiResponse.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { authRouter } from "./routes/index.js"
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
// Mount routes
app.use("/api/v1/auth",authRouter);




// Handles Undefined Routes
app.use(notFoundMiddleware);

// Global Error Handler 
app.use(errorMiddleware);

export default app;