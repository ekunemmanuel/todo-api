
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { success, error, data } = await readValidatedBody(
    event,
    taskSchema.safeParse
  );

  if (!success) {
    const fieldErrors = fieldError(error)


    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Validation Error",
    });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Task Not Found",
    });
  }

  // Update the task in the array
  const updatedTask = { ...tasks[taskIndex], ...data };
  tasks[taskIndex] = updatedTask;

  return {
    message: `Task with id ${id} has been updated`,
    data: updatedTask,
  };
});
