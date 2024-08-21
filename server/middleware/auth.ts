import { getAuth } from "firebase-admin/auth";
import { unknown } from "zod";
import { User } from "~~/types";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  // Only apply the middleware to routes under /api/v3 except for /auth/login and /auth/register
  if (
    url.startsWith("/api/v3") &&
    !url.startsWith("/api/v3/auth/login") &&
    !url.startsWith("/api/v3/auth/register")
  ) {
    const authHeader = event.req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized - No token provided",
      });
    }
    const idToken = authHeader.split("Bearer ")[1];
    const { data, error } = await verifyToken(idToken);

    if (error) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized - Invalid token",
        data: error,
      });
    }

    event.context.user = data;
  }
});

async function verifyToken(token) {
  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    return {
      pending: false,
      error: null,
      data: {
        email: decodedToken.email,
        id: decodedToken.uid,
        displayName: decodedToken.name,
      } as User,
    };
  } catch (error) {
    return {
      pending: false,
      error,
      // data: null,
    };
  }
}
