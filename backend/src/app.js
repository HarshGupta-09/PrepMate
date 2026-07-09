import express from "express";
const app = express();
import apiResponse from "./utils/ApiResponse.js"
import apiError from "./utils/ApiError.js"


app.use(express.json())
app.use(express.urlencoded({ extended : true }))





app.get("/", (req, res) => {
   const user = {
    name : "Harsh",
    role : "Student"
   };
    console.log(new apiResponse(200,user,"tested successfullyy"))

  const error = new apiError(404,"user not found")
  console.log(error.message)


});

export default app;