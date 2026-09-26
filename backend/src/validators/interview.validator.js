import { z } from "zod";

export const createInterviewSchema = z
  .object({
    type: z.enum(["hr", "technical"]),

    sessionId: z.string().optional(),
  }) // Agar type hr hai, toh sessionId ki zarurat nahi Lekin agar type technical hai.. toh sessionId mandatory hai
  .refine(
    (data) => data.type === "hr" || !!data.sessionId,
    {
      message: "sessionId is required for technical interview",
      path: ["sessionId"],
    }
  );


export const submitAnswerSchema = z.object({
  answer: z
    .string()
    .trim()
    .min(1, "Answer is required"),
});