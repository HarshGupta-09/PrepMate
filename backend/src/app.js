import express from "express";
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended : true }))





app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PrepMate API is running."
    });
});

export default app;