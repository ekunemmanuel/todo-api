export function useFirebase() {
  return {
    ...firestore,
    ...auth,
  };
}
