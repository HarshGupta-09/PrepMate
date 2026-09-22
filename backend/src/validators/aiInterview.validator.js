import { z } from "zod";

export const createInterviewSchema = z
  .object({
    type: z.enum(["hr", "technical"]),

    sessionId: z.string().optional(),
  })
  .refine(
    (data) => data.type === "hr" || !!data.sessionId,
    {
      message: "sessionId is required for technical interview",
      path: ["sessionId"],
    }
  );