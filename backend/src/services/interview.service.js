import Interview from "../models/Interview.model.js";
import Session from "../models/session.model.js";
import ApiError from "../utils/ApiError.js";
import InterviewTurn from "../models/InterviewTurn.model.js";
import groq from "../config/groq.js";

const createInterviewService = async (interviewData, userId) => {
  if (interviewData.type === "technical") {
    const session = await Session.findOne({
      _id: interviewData.sessionId,
      userId,
    });

    if (!session) {
      throw new ApiError(404, "Session not found");
    }
  }

  const interview = await Interview.create({
    userId,
    ...interviewData,
  });

  return interview;
};

const getAllInterviewsService = async (userId) => {
  return await Interview.find({ userId });
};
const getInterviewService = async (userId, interviewId) => {
  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });
  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }
  return interview;
};
const endInterviewService = async (userId, interviewId) => {
  const interview = await Interview.findOneAndUpdate(
    {
      _id: interviewId,
      userId,
      status: "active",
    },
    {
      $set: {
        status: "completed",
        endedAt: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!interview) {
    throw new ApiError(404, "Interview already ended");
  }

  return interview;
};

const generateNextQuestionService = async (userId, interviewId) => {
  // 1. Find interview and verify ownership
  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  // 2. Check interview status
  if (interview.status === "completed") {
    throw new ApiError(400, "Interview is already completed");
  }

  // 3. Get previous conversation
  const turns = await InterviewTurn.find({
    interviewId,
  }).sort({ sequence: 1 });

  // 4. Build system prompt based on interview type
  let systemPrompt;

  if (interview.type === "hr") {
    systemPrompt = `
You are a professional HR interviewer conducting a job interview.

Your job is to ask the candidate one interview question at a time.

The interview should feel like a natural conversation.

Focus on:
- Introduction
- Background
- Motivation
- Strengths and weaknesses
- Behavioral questions
- Teamwork
- Communication
- Problem solving
- Career goals
- Situational questions

Do not provide answers to your questions.

Do not ask multiple questions at once.

Use the candidate's previous responses to ask relevant follow-up questions.

Keep your questions concise and conversational.

Return only the interview question.
`;
  }

  if (interview.type === "technical") {
    // 5. Get the technical interview session
    const session = await Session.findOne({
      _id: interview.sessionId,
      userId,
    });

    if (!session) {
      throw new ApiError(404, "Interview session not found");
    }

    systemPrompt = `
You are a professional technical interviewer.

You are conducting a technical interview for the following candidate:

Role: ${session.role}
Experience: ${session.experience} years
Topics: ${session.topics.join(", ")}
Difficulty: ${session.difficulty}

Ask the candidate one technical interview question at a time.

The questions should be relevant to the candidate's role, experience, topics and difficulty.

You may ask:
- Conceptual questions
- Practical questions
- Problem-solving questions
- Scenario-based questions
- Follow-up questions based on the candidate's previous answer

Do not provide the answer.

Do not ask multiple questions at once.

Use the previous conversation to maintain context and ask meaningful follow-up questions.

Keep your questions concise and conversational.

Return only the interview question.
`;
  }

  // 6. Convert previous turns into Groq messages
const messages = [
  {
    role: "system",
    content: systemPrompt,
  },

  ...turns.map((turn) => ({
    role: turn.role === "ai" ? "assistant" : "user",
    content: turn.text,
  })),

  {
    role: "user",
    content: "Ask the next appropriate interview question.",
  },
];

  // 7. Generate next question using Groq
  const response = await groq.chat.completions.create({
    model: "qwen/qwen3.8-27b",
    messages,
  });

  const question = response.choices[0].message.content?.trim();

  if (!question) {
    throw new ApiError(
      500,
      "Failed to generate interview question"
    );
  }

  // 8. Calculate next sequence
  const nextSequence = turns.length + 1;

  // 9. Save AI question
  await InterviewTurn.create({
    interviewId,
    role: "ai",
    text: question,
    sequence: nextSequence,
  });

  // 10. Return generated question
  return {
    question,
  };
};
const submitAnswerService = async (userId, interviewId, answer) => {

  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  if (interview.status === "completed") {
    throw new ApiError(400, "Interview is already completed");
  }

  const turns = await InterviewTurn.find({
    interviewId,
  }).sort({ sequence: 1 });

  const nextSequence =
    turns.length > 0
      ? turns[turns.length - 1].sequence + 1
      : 1;

  const turn = await InterviewTurn.create({
    interviewId,
    role: "user",
    text: answer,
    sequence: nextSequence,
  });

  return turn;
};


export {
  createInterviewService,
  getAllInterviewsService,
  getInterviewService,
  endInterviewService,
  generateNextQuestionService,
  submitAnswerService
};
