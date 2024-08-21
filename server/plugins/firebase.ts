import { initializeApp, getApps, cert } from "firebase-admin/app";

export default defineNitroPlugin((nitro) => {
  const apps = getApps();
  const { credential } = useRuntimeConfig();

  // Check if Firebase Admin has already been initialized to avoid duplicate initialization
  if (!apps.length) {
    initializeApp({
      credential: cert({
        clientEmail: credential.client_email,
        privateKey: credential.private_key, // Properly handle escaped newlines in the private key
        // privateKey: credential.private_key.replace(/\\n/g, "\n"), // Properly handle escaped newlines in the private key
        projectId: credential.project_id,
      }),
    });
  }
});
