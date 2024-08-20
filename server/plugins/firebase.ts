import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export default defineNitroPlugin((nitroApp) => {
  const apps = getApps();
  const { credential } = useRuntimeConfig();

  // Check if Firebase Admin has already been initialized to avoid duplicate initialization
  if (!apps.length) {
    initializeApp({
      credential: cert({
        clientEmail: credential.client_email,
        privateKey: credential.private_key,
        projectId: credential.project_id,
      }),
    });
  }

  // Set up Firestore to connect to the Emulator
  const db = getFirestore();
  db.settings({
    host: "localhost:8080", // Port for Firestore emulator
    ssl: false,
  });
  // nitroApp.
});
