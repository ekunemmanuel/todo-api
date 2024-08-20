export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    throw createError({
      statusCode: 404,
      statusMessage: "Task Not Found",
    });
  }

  return {
    data: task,
  };
});
