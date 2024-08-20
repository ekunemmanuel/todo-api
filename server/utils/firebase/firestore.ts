import { getFirestore } from "firebase-admin/firestore";

async function getDocs<T>({ collectionName }: { collectionName: string }) {
  const db = getFirestore();
  try {
    const data = await db.collection(collectionName).get();
    return {
      pending: false,
      error: null,
      data: data.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as T;
      }),
    };
  } catch (error) {
    return {
      pending: false,
      error,
      data: null,
    };
  }
}

async function getDoc<T>({
  collectionName,
  docId,
}: {
  collectionName: string;
  docId: string;
}) {
  const db = getFirestore();
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (!doc.exists) {
      throw new Error(`Document with ID ${docId} not found`);
    }
    return {
      pending: false,
      error: null,
      data: { id: doc.id, ...doc.data() } as T,
    };
  } catch (error) {
    return {
      pending: false,
      error,
      data: null,
    };
  }
}

async function createDoc<T>({
  collectionName,
  data,
  docId,
}: {
  collectionName: string;
  data: T;
  docId?: string;
}) {
  const db = getFirestore();
  try {
    const docRef = docId
      ? db.collection(collectionName).doc(docId)
      : db.collection(collectionName).doc();
    await docRef.set(data);
    return {
      pending: false,
      error: null,
      data: { id: docRef.id, ...data },
    };
  } catch (error) {
    return {
      pending: false,
      error,
      data: null,
    };
  }
}

async function updateDoc<T>({
  collectionName,
  docId,
  data,
}: {
  collectionName: string;
  docId: string;
  data: any;
}) {
  const db = getFirestore();
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update(data);
    return {
      pending: false,
      error: null,
      data: { id: docRef.id, ...data },
    };
  } catch (error) {
    return {
      pending: false,
      error,
      data: null,
    };
  }
}

async function deleteDoc({
  collectionName,
  docId,
}: {
  collectionName: string;
  docId: string;
}) {
  const db = getFirestore();
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.delete();
    return {
      pending: false,
      error: null,
      data: { id: docId, deleted: true },
    };
  } catch (error) {
    return {
      pending: false,
      error,
      data: null,
    };
  }
}

export default { getDocs, getDoc, updateDoc, deleteDoc, createDoc };
