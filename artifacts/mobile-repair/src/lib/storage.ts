export type BookingStatus = "pending" | "inprogress" | "completed" | "cancelled";

export interface Booking {
  id: string;
  name: string;
  mobile: string;
  brand: string;
  model: string;
  problem: string;
  photoUrl?: string;
  status: BookingStatus;
  createdAt: string;
  estimatedTime?: string;
  notes?: string;
}

const KEY = "rajesh_repair_bookings";

export function getBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBooking(data: Omit<Booking, "id" | "status" | "createdAt">): Booking {
  const bookings = getBookings();
  const booking: Booking = {
    ...data,
    id: `RR${Date.now().toString(36).toUpperCase()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    estimatedTime: "24-48 hours",
  };
  bookings.push(booking);
  localStorage.setItem(KEY, JSON.stringify(bookings));
  return booking;
}

export function getUserBookings(mobile: string): Booking[] {
  return getBookings().filter(b => b.mobile === mobile);
}

export function updateBookingStatus(id: string, status: BookingStatus, notes?: string): void {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    if (notes) bookings[idx].notes = notes;
    localStorage.setItem(KEY, JSON.stringify(bookings));
  }
}

export function deleteBooking(id: string): void {
  const bookings = getBookings().filter(b => b.id !== id);
  localStorage.setItem(KEY, JSON.stringify(bookings));
}

export function verifyAdmin(password: string): boolean {
  return password === "admin123";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
}
