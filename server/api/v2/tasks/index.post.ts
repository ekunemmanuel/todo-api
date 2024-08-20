import { Task } from "~~/types";

export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(event, taskSchema.safeParse);

  const { createDoc } = useFirebase();
  if (error) {
    const fieldErrors = fieldError(error);

    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Validation Error",
    });
  }

  // create a task
  const task = {
    title: data.title,
    completed: data.completed,
  };

  const { error: taskError, data: newTask } = await createDoc<Task>({
    collectionName: "tasks",
    data: task,
  });

  if (taskError) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to add a task",
      data: taskError,
    });
  }

  return {
    message: "A new task has been added",
    data: newTask,
  };
});
