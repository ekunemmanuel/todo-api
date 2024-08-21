import { Task } from "~~/types";

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

  const { updateDoc } = useFirebase();
  const { error: updateError, data: updatedTask } = await updateDoc({
    collectionName: "tasks",
    docId: id,
    data,
  });

  if (updateError) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to update task",
      data: updateError,
    });
  }

  return {
    message: "Task has been updated",
    data: updatedTask,
  };
});
