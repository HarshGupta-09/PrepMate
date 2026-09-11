import { z } from "zod";

export const sessionSchema = z.object({
    role: z.string().trim().min(1),

    experience: z.number().min(0),

    topics: z.array(
        z.string().trim().min(1)
    ).min(1),

    difficulty: z.enum([
        "easy",
        "medium",
        "hard"
    ]),
});
export const updateSessionSchema = sessionSchema.partial();