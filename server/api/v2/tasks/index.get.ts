import { Task } from "~~/types";

export default defineEventHandler(async (event) => {
  const { getDocs } = useFirebase();
  const { data, error, pending } = await getDocs<Task>({
    collectionName: "tasks",
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to get tasks",
      data: error,
    });
  }

  return { data };
});
