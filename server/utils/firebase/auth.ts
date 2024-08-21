import { Login, Register, User } from "~~/types";
import { getAuth } from "firebase-admin/auth";


const auth = getAuth();
const { apiKey } = useRuntimeConfig();
async function verifyToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);

    return {
      pending: false,
      error: null,
      data: decodedToken,
    };
  } catch (error) {
    return {
      pending: false,
      error,
      // data: null,
    };
  }
}

async function signUp<T>(data: Register) {
  try {
    const displayName = `${data.firstName} ${data.lastName}`;
    const user = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName,
    });

    return {
      pending: false,
      error: null,
      data: {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
      } as T,
    };
  } catch (error) {
    return {
      pending: false,
      error,
      // data: null,
    };
  }
}

async function signIn(data: Login) {
  try {
    const response = await $fetch<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
      }
    );

    return {
      pending: false,
      error: null,
      data: {
        token: response.idToken,
        email: response.email,
        displayName: response.displayName,
      },
    };
  } catch (error) {
    return {
      pending: false,
      error: error.response?.data?.error?.message || error.message,
      // data: null,
    };
  }
}

async function deleteAccount(uid: string) {
  try {
    await auth.deleteUser(uid);

    return {
      pending: false,
      error: null,
      data: "Deleted successfully",
    };
  } catch (error) {
    return {
      pending: false,
      error,
      // data: null,
    };
  }
}
async function setRole({ uid, role }: { uid: string; role: string }) {
  try {
    await auth.setCustomUserClaims(uid, { role });

    return {
      pending: false,
      error: null,
      data: "Role set successfully",
    };
  } catch (error) {
    return {
      pending: false,
      error,
      // data: null,
    };
  }
}

export default {
  signUp,
  verifyToken,
  signIn,
  deleteAccount,
  setRole,
};


// FIXME: Incase any of the return for data is acting weird, it should be removed the comment