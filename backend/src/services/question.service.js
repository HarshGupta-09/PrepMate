import Question from "../models/question.model.js"
import ApiError from "../utils/ApiError.js";
import Session from "../models/session.model.js";
import { generatedQuestionsSchema } from "../validators/question.validator.js";
import ai from "../config/gemini.js"

import Question from "../models/question.model.js";
import ApiError from "../utils/ApiError.js";
import Session from "../models/session.model.js";
import { generatedQuestionsSchema } from "../validators/question.validator.js";
import ai from "../config/gemini.js";
import { zodToJsonSchema } from "zod-to-json-schema";

const generateQuestionsService = async (userId, sessionId) => {
  // 1. Find session
  const session = await Session.findOne({
    _id: sessionId,
    userId,
  });

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  // 2. Count existing questions
  const existingQuestionCount = await Question.countDocuments({
    sessionId,
  });

  // 3. Calculate starting order
  const startingOrder = existingQuestionCount + 1;

  // 4. Create prompt
  const prompt = `
Generate exactly 10 interview questions for the following candidate.

Role: ${session.role}
Experience: ${session.experience} years
Topics: ${session.topics.join(", ")}
Difficulty: ${session.difficulty}

Requirements:
- Generate exactly 10 questions.
- Questions must be relevant to the candidate's role, experience, topics, and difficulty.
- Each question must have a clear and useful reference answer.
- "type" should describe the question format, such as conceptual, coding, or scenario.
- "category" should describe the technical topic, such as Java, OOP, DBMS, DSA, etc.
- "difficulty" must match the requested difficulty: ${session.difficulty}.
`;

  // 5. Generate questions using Gemini
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,

    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(generatedQuestionsSchema),
    },
  });

  // 6. Convert Gemini JSON string into JavaScript data
  let generatedQuestions;

  try {
    generatedQuestions = JSON.parse(response.text);
  } catch (error) {
    throw new ApiError(
      500,
      "Invalid response received from Gemini"
    );
  }

  // 7. Validate Gemini response using Zod
  const validatedQuestions =
    generatedQuestionsSchema.parse(generatedQuestions);

  // 8. Prepare questions for MongoDB
  const questionsToSave = validatedQuestions.map(
    (question, index) => ({
      sessionId,
      question: question.question,
      answer: question.answer,
      type: question.type,
      category: question.category,
      difficulty: question.difficulty,
      order: startingOrder + index,
    })
  );

  // 9. Save all 10 questions
  const savedQuestions = await Question.insertMany(
    questionsToSave
  );

  // 10. Return saved questions
  return savedQuestions;
};

export {
  generateQuestionsService,
};
export{
    generateQuestionsService
}