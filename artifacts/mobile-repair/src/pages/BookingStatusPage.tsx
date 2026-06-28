import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, Wrench, Phone, RefreshCw, User } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { getUserBookings, Booking, BookingStatus, formatDate } from "../lib/storage";

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  pending: { label: "Pending", color: "text-amber-600 dark:text-amber-400", icon: <Clock size={14} />, bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" },
  inprogress: { label: "In Progress", color: "text-blue-600 dark:text-blue-400", icon: <Wrench size={14} />, bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
  completed: { label: "Completed", color: "text-green-600 dark:text-green-400", icon: <CheckCircle2 size={14} />, bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" },
  cancelled: { label: "Cancelled", color: "text-red-600 dark:text-red-400", icon: <XCircle size={14} />, bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" },
};

const STEPS: BookingStatus[] = ["pending", "inprogress", "completed"];

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      {cfg.icon}{cfg.label}
    </span>
  );
}

function Timeline({ status }: { status: BookingStatus }) {
  const activeIdx = STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-0 mt-4">
      {STEPS.map((s, i) => {
        const done = activeIdx >= i;
        const active = activeIdx === i;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${done ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400"} ${active ? "ring-4 ring-blue-200 dark:ring-blue-800" : ""}`}>
              {done ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all ${activeIdx > i ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const cfg = statusConfig[booking.status];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono font-bold">{booking.id}</span>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Brand</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{booking.brand}</p></div>
          <div><p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Model</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{booking.model}</p></div>
          <div className="col-span-2"><p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Problem</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{booking.problem}</p></div>
        </div>
        {booking.status !== "cancelled" && <Timeline status={booking.status} />}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(booking.createdAt)}</p>
          <a href={`tel:9165444894`} className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            <Phone size={11} /> Call for update
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function BookingStatusPage() {
  const { t, user } = useApp();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [searched, setSearched] = useState(!!user);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (user) { setMobile(user.mobile); setSearched(true); }
  }, [user]);

  useEffect(() => {
    if (searched && mobile) setBookings(getUserBookings(mobile));
  }, [searched, mobile, refreshKey]);

  function handleSearch() {
    if (!/^\d{10}$/.test(mobile)) return;
    setSearched(true);
    setBookings(getUserBookings(mobile));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
            📋 {t("myBookings")}
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{t("statusTitle")}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t("statusDesc")}</p>
        </motion.div>

        {!user && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">
            <div className="flex gap-2">
              <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300">+91</div>
              <input type="tel" maxLength={10} placeholder="Enter your mobile number"
                className="flex-1 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ""))}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">Search</button>
            </div>
          </div>
        )}

        {searched && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">+91 {mobile}</span>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">{bookings.length} booking{bookings.length !== 1 ? "s" : ""}</span>
              </div>
              <button onClick={() => setRefreshKey(k => k + 1)} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <RefreshCw size={12} /> Refresh
              </button>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-5xl mb-4">📵</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t("noBookings")}</p>
                <Link href="/#booking">
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">Book a Repair</button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {bookings.map(b => <BookingCard key={b.id} booking={b} />)}
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Enter your mobile number to see your bookings</p>
            <Link href="/login">
              <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                <User size={14} /> Login with OTP
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
