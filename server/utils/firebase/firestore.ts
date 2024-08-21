import {
  Query,
  CollectionReference,
  WhereFilterOp,
  OrderByDirection,
  DocumentData,
  getFirestore,
} from "firebase-admin/firestore";

const db = getFirestore();

interface QueryOptions {
  orderBy?: { field: string; direction?: OrderByDirection }[];
  where?: { field: string; operator: WhereFilterOp; value: any }[];
}

async function getDocs<T>({
  collectionName,
  queryOptions = {},
}: {
  collectionName: string;
  queryOptions?: QueryOptions;
}) {
  try {
    // Start with the base query
    let query: Query<DocumentData> = db.collection(collectionName);

    // Apply filtering (where) conditions
    if (queryOptions.where) {
      queryOptions.where.forEach(({ field, operator, value }) => {
        query = query.where(field, operator, value);
      });
    }

    // Apply ordering (orderBy) conditions
    if (queryOptions.orderBy) {
      queryOptions.orderBy.forEach(({ field, direction = "asc" }) => {
        query = query.orderBy(field, direction);
      });
    }

    // Execute the query
    const snapshot = await query.get();
    return {
      pending: false,
      error: null,
      data: snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as T;
      }),
    };
  } catch (error) {
    return {
      pending: false,
      error,
      data: [],
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
      // data: null,
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
  try {
    const docRef = docId
      ? db.collection(collectionName).doc(docId)
      : db.collection(collectionName).doc();
    await docRef.set({ ...data, createdAt: new Date().toISOString() });
    return {
      pending: false,
      error: null,
      data: { id: docRef.id, ...data },
    };
  } catch (error) {
    return {
      pending: false,
      error,
      // data: null,
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
      // data: null,
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
      // data: null,
    };
  }
}

export default { getDocs, getDoc, updateDoc, deleteDoc, createDoc };
