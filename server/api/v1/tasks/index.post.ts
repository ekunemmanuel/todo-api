export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(event, taskSchema.safeParse);

  if (error) {
    const fieldErrors = fieldError(error);

    console.log(fieldErrors);

    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Validation Error",
    });
  }

  // create a task
  const task = {
    id: data.id,
    title: data.title,
    completed: data.completed,
  };

  tasks.push(task);

  return {
    message: "A new task has been added",
  };
});
