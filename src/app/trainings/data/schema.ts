import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const trainingSchema = z.object({
  trainingId: z.string(),
  participant: z.string(),
  position: z.string(),
  school: z.string(),
  contact: z.string(),
  email: z.string(),
});

export type Task = z.infer<typeof trainingSchema>;
