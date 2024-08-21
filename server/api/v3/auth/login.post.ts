import { Login } from "~~/types";


export default defineEventHandler(async (event) => {
  const { error, data } = await readValidatedBody(event, loginSchema.safeParse);

  const { signIn } = useFirebase();
  if (error) {
    const fieldErrors = fieldError(error);

    throw createError({
      data: fieldErrors,
      statusCode: 400,
      statusMessage: "Validation Error",
    });
  }

  // create a task
  const detail: Login = {
    email: data.email,
    password: data.password,
  };

  const { data: loginData, error: loginError } = await signIn(detail);

  if (loginError) {
    throw createError({
      data: loginError,
      statusCode: 400,
      statusMessage: "Error while logging in",
    });
  }

  return {
    messsage: "Logged in successfully",
    data: loginData,
  };
});
