import { Task } from "~~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { createDoc, getDoc } = useFirebase();

  // Validate the incoming request body
  const { error: validationError, data: validatedData } =
    await readValidatedBody(event, taskSchema.safeParse);
  if (validationError) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      data: fieldError(validationError),
    });
  }

  // Check if a task with the given ID already exists
  const { data: existingTask } = await getDoc({
    collectionName: "tasks",
    docId: id,
  });

  if (existingTask) {
    throw createError({
      statusCode: 400,
      statusMessage: "Task with the specified ID already exists",
    });
  }

  // Create a new task
  const task: Task = {
    title: validatedData.title,
    completed: validatedData.completed,
    id,
  };

  const { error: creationError, data: newTask } = await createDoc<Task>({
    collectionName: "tasks",
    data: task,
    docId: id,
  });

  if (creationError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create a new task",
      data: creationError,
    });
  }

  return {
    message: "A new task has been successfully added",
    data: newTask,
  };
});
