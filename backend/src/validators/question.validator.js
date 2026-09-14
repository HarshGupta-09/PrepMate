import { z } from 'zod'



// ye sirf ek question ko validate krega
const generatedQuestionSchema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
  type: z.string().trim().min(1),
  category: z.string().trim().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
});


// ye pure question k array ko validate krega
export const generatedQuestionsSchema = z
  .array(generatedQuestionSchema)
  .length(10);