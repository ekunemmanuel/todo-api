import { Task } from "~~/types";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { getDocs } = useFirebase();
  const { error: queryError, data: queryData } = await getValidatedQuery(
    event,
    querySchema.safeParse
  );

  if (queryError) {
    const fieldErrors = fieldError(queryError);

    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Query Error",
    });
  }

  // Map the query parameters to Firestore conditions
  const whereConditions = Object.entries(queryData)
    .filter(([key]) => key !== "orderBy")
    .map(([key, value]) => ({
      field: key,
      operator: "==" as any,
      value: value,
    }));

  // Apply the multiple orderBy conditions if provided
  // const defaultCondition = queryData.orderBy || [
  //   { field: "createdAt", direction: "desc" }, // Default order by
  // ];

  // const orderByConditions = defaultCondition.map(({ field, direction }) => ({
  //   field,
  //   direction,
  // }));
  // console.log("orderByConditions", orderByConditions);

  const { data, error } = await getDocs<Task>({
    collectionName: "tasks",
    queryOptions: {
      where: [...whereConditions],
      orderBy: [
        { field: "createdAt", direction: "desc" }, // Default order by
      ],
    },
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

const querySchema = z.object({
  completed: z
    .string()
    .refine(
      (val) => val.toLowerCase() === "true" || val.toLowerCase() === "false",
      {
        message: "Must be a boolean string ('true' or 'false')",
      }
    )
    .transform((val) => val === "true")
    .optional(),
  title: z.string().optional(),
  createdAt: z.string().optional(),
  orderBy: z
    .array(
      z.object({
        field: z.string().min(1),
        direction: z.enum(["asc", "desc"]),
      })
    )
    .optional(),
});
