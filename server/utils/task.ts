import { z } from "zod";
import { Task } from "~~/types";
export const tasks: Task[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    completed: true,
  },
  {
    id: "2",
    title: "Learn NitroPack",
    completed: false,
  },
];

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string({
      message: "Title must be a string",
    })
    .min(3, "Title must be at least 3 characters long"),
  completed: z
    .boolean({
      message: "Completed must be a boolean",
    })
    .default(false),
});
