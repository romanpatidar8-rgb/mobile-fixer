import { firebaseConfigured } from "./firebase";
import * as local from "./storage";
import * as firestore from "./firestoreStorage";
import type { Booking, BookingStatus } from "./storage";

export type { Booking, BookingStatus };

export async function saveBooking(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  if (firebaseConfigured) {
    try {
      return await firestore.saveBookingFirestore(data);
    } catch (e) {
      console.warn("Firestore save failed, falling back to localStorage", e);
    }
  }
  return local.saveBooking(data);
}

export async function getAllBookings(): Promise<Booking[]> {
  if (firebaseConfigured) {
    try {
      return await firestore.getAllBookingsFirestore();
    } catch (e) {
      console.warn("Firestore get failed, falling back to localStorage", e);
    }
  }
  return local.getBookings();
}

export async function getUserBookings(mobile: string): Promise<Booking[]> {
  if (firebaseConfigured) {
    try {
      return await firestore.getUserBookingsFirestore(mobile);
    } catch (e) {
      console.warn("Firestore get failed, falling back to localStorage", e);
    }
  }
  return local.getUserBookings(mobile);
}

export async function updateBookingStatus(
  id: string, status: BookingStatus, notes?: string
): Promise<void> {
  if (firebaseConfigured) {
    try {
      return await firestore.updateBookingStatusFirestore(id, status, notes);
    } catch (e) {
      console.warn("Firestore update failed, falling back to localStorage", e);
    }
  }
  local.updateBookingStatus(id, status, notes);
}

export async function deleteBooking(id: string): Promise<void> {
  if (firebaseConfigured) {
    try {
      return await firestore.deleteBookingFirestore(id);
    } catch (e) {
      console.warn("Firestore delete failed, falling back to localStorage", e);
    }
  }
  local.deleteBooking(id);
}

export { formatDate, verifyAdmin } from "./storage";
