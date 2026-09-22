import mongoose from "mongoose";

const interviewTurnSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIInterview",
      required: true,
    },

    role: {
      type: String,
      enum: ["ai", "user"],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    sequence: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const InterviewTurn = mongoose.model("InterviewTurn", interviewTurnSchema);

export default InterviewTurn;