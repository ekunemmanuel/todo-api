export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { success, error, data } = await readValidatedBody(
    event,
    taskSchema.safeParse
  );

  if (!success) {
    const fieldErrors = fieldError(error);

    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Validation Error",
    });
  }

  const { deleteDoc } = useFirebase();

  const {
    error: deleteError,
    data: deletedTask,
    pending,
  } = await deleteDoc({
    collectionName: "tasks",
    docId: id,
  });

  if (deleteError) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to delete task",
      data: deleteError,
    });
  }

  return {
    message: "Task has been deleted",
    data: deletedTask,
  };
});
