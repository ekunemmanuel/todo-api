import { Register, User } from "~~/types";

export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(
    event,
    registerSchema.safeParse
  );

  const { signUp, createDoc, deleteAccount, setRole } = useFirebase();
  if (error) {
    const fieldErrors = fieldError(error);

    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Validation Error",
    });
  }

  // create a task
  const detail: Register = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  };

  const { data: registerData, error: registerError } = await signUp<User>(
    detail
  );

  if (registerError) {
    throw createError({
      data: registerError,
      statusCode: 400,
      statusMessage: "Error while registering",
    });
  }

  const { data: roleDate, error: roleError } = await setRole({
    uid: registerData.id,
    role: "user",
  });

  const { data: user, error: userError } = await createDoc<User>({
    collectionName: "users",
    data: { ...registerData },
    docId: registerData.id,
  });

  if (userError) {
    await deleteAccount(registerData.id);
    throw createError({
      data: userError,
      statusCode: 400,
      statusMessage: "Error while registering",
    });
  }

  return {
    messsage: "Registration successful",
    data: user,
  };
});
