import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Search, RefreshCw, TrendingUp, Clock, Wrench, CheckCircle2, Trash2, Phone, MessageCircle, Loader2 } from "lucide-react";
import { getAllBookings, updateBookingStatus, deleteBooking, verifyAdmin, Booking, BookingStatus, formatDate } from "../lib/bookingService";
import { useApp } from "../contexts/AppContext";
import { firebaseConfigured } from "../lib/firebase";

const STATUS_OPTIONS: { value: BookingStatus; label: string; color: string }[] = [
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { value: "inprogress", label: "In Progress", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
];

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className={`rounded-2xl p-4 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold opacity-80">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-extrabold">{value}</div>
    </div>
  );
}

export default function AdminPage() {
  const { t } = useApp();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_authed") === "1");
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BookingStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => { if (authed) load(); }, [authed]);

  async function load() {
    setLoading(true);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } finally {
      setLoading(false);
    }
  }

  function handleLogin() {
    if (verifyAdmin(password)) {
      setAuthed(true);
      sessionStorage.setItem("admin_authed", "1");
      setPwError("");
    } else {
      setPwError(t("wrongPassword"));
    }
  }

  async function handleStatus(id: string, status: BookingStatus) {
    await updateBookingStatus(id, status);
    load();
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this booking?")) {
      await deleteBooking(id);
      load();
    }
  }

  const filtered = bookings.filter(b => {
    const matchSearch = !search || [b.name, b.mobile, b.brand, b.model, b.problem, b.id].join(" ").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    inprogress: bookings.filter(b => b.status === "inprogress").length,
    completed: bookings.filter(b => b.status === "completed").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 pt-16 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="text-blue-600 dark:text-blue-400" size={26} />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-1">{t("adminTitle")}</h1>
          <p className="text-gray-400 text-sm text-center mb-1">Enter password to access admin panel</p>
          {firebaseConfigured && (
            <p className="text-center text-xs text-green-600 dark:text-green-400 mb-4">🔥 Connected to Firebase</p>
          )}
          <div className="flex flex-col gap-3 mt-4">
            <input type="password" placeholder={t("adminPassword")}
              className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
            {pwError && <p className="text-red-500 text-xs text-center">{pwError}</p>}
            <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
              {t("adminEnter")}
            </button>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500">Demo password: <span className="font-mono font-bold">admin123</span></p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{t("adminTitle")}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              {t("adminDesc")}
              {firebaseConfigured && <span className="text-green-600 dark:text-green-400 font-medium">🔥 Firebase</span>}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="flex items-center gap-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> {t("refresh")}
            </button>
            <button onClick={() => { setAuthed(false); sessionStorage.removeItem("admin_authed"); }}
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-2 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label={t("totalBookings")} value={stats.total} icon={<TrendingUp size={18} />} color="bg-blue-600 text-white" />
          <StatCard label={t("pending")} value={stats.pending} icon={<Clock size={18} />} color="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400" />
          <StatCard label={t("inProgress")} value={stats.inprogress} icon={<Wrench size={18} />} color="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" />
          <StatCard label={t("completed")} value={stats.completed} icon={<CheckCircle2 size={18} />} color="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder={t("searchBookings")}
                className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl pl-8 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(["all", ...STATUS_OPTIONS.map(s => s.value)] as const).map(s => (
                <button key={s} onClick={() => setFilterStatus(s as BookingStatus | "all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize ${filterStatus === s ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400"}`}>
                  {s === "all" ? "All" : STATUS_OPTIONS.find(o => o.value === s)?.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Loading bookings...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 dark:text-gray-500">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-sm">No bookings found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(b => (
                <div key={b.id}>
                  <button onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                    className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left">
                    <div className="min-w-0 flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 items-center text-xs">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400 truncate">{b.id}</span>
                      <span className="font-semibold text-gray-900 dark:text-white truncate">{b.name}</span>
                      <span className="hidden sm:block text-gray-500 dark:text-gray-400">{b.brand}</span>
                      <span className="hidden sm:block text-gray-500 dark:text-gray-400 truncate">{b.problem}</span>
                      <span className="hidden lg:block text-gray-400 dark:text-gray-500">{formatDate(b.createdAt).split(",")[0]}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold w-fit ${STATUS_OPTIONS.find(s => s.value === b.status)?.color}`}>
                        {STATUS_OPTIONS.find(s => s.value === b.status)?.label}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === b.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50 dark:bg-gray-800/30 px-4 pb-4">
                        <div className="pt-3 grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          {[["Name", b.name], ["Mobile", b.mobile], ["Brand", b.brand], ["Model", b.model], ["Problem", b.problem], ["Booked", formatDate(b.createdAt)]].map(([k, v]) => (
                            <div key={k}><p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{k}</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{v}</p></div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {STATUS_OPTIONS.filter(s => s.value !== b.status).map(s => (
                            <button key={s.value} onClick={() => handleStatus(b.id, s.value)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${s.color} border border-current/20 hover:opacity-80 transition-opacity`}>
                              → {s.label}
                            </button>
                          ))}
                          <a href={`tel:${b.mobile}`} className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-semibold">
                            <Phone size={11} /> Call
                          </a>
                          <a href={`https://wa.me/91${b.mobile}?text=Hello ${b.name}, your repair booking ${b.id} update:`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-semibold">
                            <MessageCircle size={11} /> WhatsApp
                          </a>
                          <button onClick={() => handleDelete(b.id)}
                            className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold">
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
