import {
  collection, addDoc, getDocs, doc, updateDoc,
  deleteDoc, query, where, orderBy, serverTimestamp, Timestamp
} from "firebase/firestore";
import { getDb } from "./firebase";
import type { Booking, BookingStatus } from "./storage";

const COL = "bookings";

export async function saveBookingFirestore(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  const db = getDb();
  const docRef = await addDoc(collection(db, COL), {
    ...data,
    status: "pending",
    estimatedTime: "24-48 hours",
    createdAt: serverTimestamp(),
  });
  return {
    ...data,
    id: docRef.id,
    status: "pending",
    createdAt: new Date().toISOString(),
    estimatedTime: "24-48 hours",
  };
}

export async function getAllBookingsFirestore(): Promise<Booking[]> {
  const db = getDb();
  const snap = await getDocs(
    query(collection(db, COL), orderBy("createdAt", "desc"))
  );
  return snap.docs.map(d => firestoreDocToBooking(d.id, d.data()));
}

export async function getUserBookingsFirestore(mobile: string): Promise<Booking[]> {
  const db = getDb();
  const snap = await getDocs(
    query(collection(db, COL), where("mobile", "==", mobile), orderBy("createdAt", "desc"))
  );
  return snap.docs.map(d => firestoreDocToBooking(d.id, d.data()));
}

export async function updateBookingStatusFirestore(
  id: string, status: BookingStatus, notes?: string
): Promise<void> {
  const db = getDb();
  const ref = doc(db, COL, id);
  await updateDoc(ref, { status, ...(notes ? { notes } : {}) });
}

export async function deleteBookingFirestore(id: string): Promise<void> {
  const db = getDb();
  await deleteDoc(doc(db, COL, id));
}

function firestoreDocToBooking(id: string, data: Record<string, unknown>): Booking {
  let createdAt = new Date().toISOString();
  if (data.createdAt instanceof Timestamp) {
    createdAt = data.createdAt.toDate().toISOString();
  } else if (typeof data.createdAt === "string") {
    createdAt = data.createdAt;
  }
  return {
    id,
    name: String(data.name ?? ""),
    mobile: String(data.mobile ?? ""),
    brand: String(data.brand ?? ""),
    model: String(data.model ?? ""),
    problem: String(data.problem ?? ""),
    photoUrl: data.photoUrl ? String(data.photoUrl) : undefined,
    status: (data.status as BookingStatus) ?? "pending",
    createdAt,
    estimatedTime: data.estimatedTime ? String(data.estimatedTime) : undefined,
    notes: data.notes ? String(data.notes) : undefined,
  };
}
