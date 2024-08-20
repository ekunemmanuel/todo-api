export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { getDoc } = useFirebase();
  const { data, error, pending } = await getDoc({
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
