import { Task } from "~~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { getDoc } = useFirebase();
  const { data, error, pending } = await getDoc<Task>({
    collectionName: "tasks",
    docId: id,
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to get task",
      data: error,
    });
  }

  return { data };
});
