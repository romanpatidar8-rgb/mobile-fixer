import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Upload, X, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { saveBooking } from "../lib/bookingService";

const PHONE = "9165444894";

const BRANDS = ["Samsung", "Apple (iPhone)", "Xiaomi / Redmi", "Oppo", "Vivo", "OnePlus", "Realme", "Motorola", "Nokia", "Poco", "Other"];
const PROBLEMS = ["Screen Broken / Cracked", "Battery Not Charging", "Battery Drains Fast", "Speaker / Mic Not Working", "Camera Not Working", "Phone Not Turning On", "Water Damage", "Charging Port Issue", "Software / Hang Issue", "Back Panel Damage", "SIM Card Not Detected", "Other Issue"];

const SERVICES = [
  { icon: "📱", title: "Screen Replacement", desc: "Original & compatible screens with warranty.", price: "₹500" },
  { icon: "🔋", title: "Battery Replacement", desc: "Genuine batteries restoring full battery life.", price: "₹300" },
  { icon: "📷", title: "Camera Repair", desc: "Front & rear camera issues fixed by experts.", price: "₹400" },
  { icon: "🔊", title: "Speaker & Mic", desc: "Earpiece, loudspeaker, and mic restored.", price: "₹250" },
  { icon: "💧", title: "Water Damage", desc: "Deep cleaning and component-level repair.", price: "₹600" },
  { icon: "🔌", title: "Charging Port", desc: "Port replacement and board-level repair.", price: "₹350" },
  { icon: "⚙️", title: "Software Issues", desc: "Hang, restart loops, OS flash & repair.", price: "₹200" },
  { icon: "🛡️", title: "Back Panel & Body", desc: "Back glass, frame and body repair.", price: "₹400" },
];

const PRICES = [
  { service: "Screen Replacement", brands: [{ brand: "Samsung", price: "₹500–₹2,500" }, { brand: "iPhone", price: "₹1,500–₹5,000" }, { brand: "Xiaomi/Redmi", price: "₹400–₹1,500" }, { brand: "Other brands", price: "₹350–₹1,200" }] },
  { service: "Battery Replacement", brands: [{ brand: "Samsung", price: "₹300–₹800" }, { brand: "iPhone", price: "₹800–₹1,800" }, { brand: "Xiaomi/Redmi", price: "₹250–₹600" }, { brand: "Other brands", price: "₹200–₹500" }] },
  { service: "Camera Repair", brands: [{ brand: "All brands", price: "₹400–₹1,500" }] },
  { service: "Charging Port", brands: [{ brand: "All brands", price: "₹350–₹900" }] },
  { service: "Speaker / Mic", brands: [{ brand: "All brands", price: "₹250–₹700" }] },
  { service: "Software Flash", brands: [{ brand: "All brands", price: "₹200–₹500" }] },
  { service: "Water Damage Repair", brands: [{ brand: "All brands", price: "₹600–₹2,000" }] },
  { service: "Back Panel Replacement", brands: [{ brand: "All brands", price: "₹400–₹1,200" }] },
];

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const { t } = useApp();
  const stats = [
    { val: "500+", label: t("repairsDone") },
    { val: "5★", label: t("rating") },
    { val: "24hr", label: t("turnaround") },
    { val: "1 Yr", label: t("warranty") },
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900 pt-16 flex items-center overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-white/5"
            style={{ width: 100 + i * 80, height: 100 + i * 80, left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 relative flex flex-col lg:flex-row items-center gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="flex-1 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            ⭐ Trusted Mobile Repair • Kapeli, MP
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            {t("heroTitle")}<br /><span className="text-blue-200">{t("heroSubtitle")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-blue-100 text-lg mb-8 max-w-lg">{t("heroDesc")}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-10">
            <a href="#booking" className="flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm">
              📋 {t("bookNow")}
            </a>
            <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm">
              <WhatsAppIcon />WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
              <Phone size={15} />{t("callNow")}
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50, rotate: 3 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0 w-64 lg:w-80">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6 scale-95"></div>
            <div className="absolute inset-0 bg-blue-400/20 rounded-3xl -rotate-3 scale-97"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="text-7xl mb-4">📱</motion.div>
              <div className="text-blue-700 dark:text-blue-400 font-extrabold text-lg mb-3">{t("allBrands")}</div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {["Samsung", "iPhone", "Xiaomi", "Oppo", "Vivo", "OnePlus", "Realme"].map(b => (
                  <span key={b} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useApp();
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">🔧 {t("ourServices")}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">What We Repair</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto text-sm">{t("servicesDesc")}</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 cursor-default">
              <div className="text-3xl mb-2">{s.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-2">{s.desc}</p>
              <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">From {s.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceEstimateSection() {
  const { t } = useApp();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="prices" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">💰 {t("priceEstimate")}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{t("priceEstimate")}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto text-sm">{t("priceDesc")}</p>
        </AnimatedSection>
        <div className="flex flex-col gap-2">
          {PRICES.map((item, i) => (
            <motion.div key={item.service} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="font-bold text-gray-900 dark:text-white text-sm">{item.service}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{t("starting")} {item.brands[0].price.split("–")[0]}</span>
                  {open === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.brands.map(b => (
                        <div key={b.brand} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{b.brand}</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{b.price}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">* Prices are estimates. Final price may vary based on model and part availability. Call for exact quote.</p>
      </div>
    </section>
  );
}

function BookingSection() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: "", mobile: "", brand: "", model: "", problem: "", otherProblem: "" });
  const [photo, setPhoto] = useState<{ file: File; url: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(form.mobile.trim())) e.mobile = "Enter a valid 10-digit number";
    if (!form.brand) e.brand = "Select a brand";
    if (!form.model.trim()) e.model = "Enter phone model";
    if (!form.problem) e.problem = "Select a problem";
    return e;
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhoto({ file, url: URL.createObjectURL(file) });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    const problemText = form.problem === "Other Issue" && form.otherProblem ? `Other: ${form.otherProblem}` : form.problem;
    saveBooking({ name: form.name, mobile: form.mobile, brand: form.brand, model: form.model, problem: problemText, photoUrl: photo?.url })
      .then(saved => {
        setBookingId(saved.id);
        const msg = `Hello Rajesh Patidar Mobile Repair!%0A%0A*New Booking Request*%0A%0A🆔 *ID:* ${saved.id}%0A👤 *Name:* ${form.name}%0A📞 *Mobile:* ${form.mobile}%0A📱 *Brand:* ${form.brand}%0A🔖 *Model:* ${form.model}%0A🔧 *Problem:* ${problemText}%0A%0APlease confirm my booking. Thank you!`;
        window.open(`https://wa.me/91${PHONE}?text=${msg}`, "_blank");
        setSubmitted(true);
      })
      .catch(() => {
        setSubmitted(true);
      });
  }

  const inputCls = (field: string) => `w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors[field] ? "border-red-400 bg-red-50 dark:bg-red-900/10" : "border-gray-200"}`;

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 text-center border border-gray-100 dark:border-gray-700">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ delay: 0.3 }} className="text-6xl mb-4">🎉</motion.div>
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{t("bookingSuccess")}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-2">{t("bookingSuccessDesc")}</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-6">
              <span className="text-xs text-gray-500 dark:text-gray-400">Booking ID:</span>
              <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{bookingId}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", brand: "", model: "", problem: "", otherProblem: "" }); setPhoto(null); }}
                className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">{t("bookAnother")}</button>
              <a href="/status" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Track Status →</a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4">
        <AnimatedSection className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">📋 {t("bookingTitle")}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{t("bookingTitle")}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{t("bookingDesc")}</p>
        </AnimatedSection>

        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-xl p-6 md:p-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">{t("yourName")} *</label>
              <input type="text" className={inputCls("name")} placeholder={t("namePlaceholder")} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">{t("mobileNumber")} *</label>
              <input type="tel" maxLength={10} className={inputCls("mobile")} placeholder={t("mobilePlaceholder")} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, "") }))} />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">{t("selectBrand")} *</label>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map(b => (
                <button type="button" key={b} onClick={() => { setForm(f => ({ ...f, brand: b })); setErrors(e => ({ ...e, brand: "" })); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${form.brand === b ? "bg-blue-600 border-blue-600 text-white shadow" : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400"}`}>
                  {b}
                </button>
              ))}
            </div>
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">{t("phoneModel")} *</label>
            <input type="text" className={inputCls("model")} placeholder={t("modelPlaceholder")} value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} />
            {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">{t("selectProblem")} *</label>
            <div className="flex flex-wrap gap-2">
              {PROBLEMS.map(p => (
                <button type="button" key={p} onClick={() => { setForm(f => ({ ...f, problem: p })); setErrors(e => ({ ...e, problem: "" })); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${form.problem === p ? "bg-blue-600 border-blue-600 text-white shadow" : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400"}`}>
                  {p}
                </button>
              ))}
            </div>
            {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem}</p>}
          </div>

          {form.problem === "Other Issue" && (
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">{t("describeIssue")}</label>
              <textarea rows={3} className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none"
                placeholder={t("describeIssue")} value={form.otherProblem} onChange={e => setForm(f => ({ ...f, otherProblem: e.target.value }))} />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">{t("uploadPhoto")}</label>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhoto} />
            {photo ? (
              <div className="relative inline-block">
                <img src={photo.url} alt="Phone" className="w-28 h-28 object-cover rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow" />
                <button type="button" onClick={() => { setPhoto(null); if (fileRef.current) fileRef.current.value = ""; }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                  <X size={12} />
                </button>
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
                  <Upload size={11} />{t("changePhoto")}
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl px-5 py-4 text-sm text-gray-500 dark:text-gray-400 transition-colors w-full justify-center">
                <Upload size={16} /> {t("uploadHint")}
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow hover:shadow-lg hover:-translate-y-0.5">
              <WhatsAppIcon />{t("submitWhatsApp")}
            </button>
            <a href={`tel:${PHONE}`} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow hover:shadow-lg hover:-translate-y-0.5">
              <Phone size={15} />{t("callToBook")}
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function MapSection() {
  const { t } = useApp();
  return (
    <section id="map" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <MapPin size={13} /> {t("findShop")}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t("findShop")}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{t("mapDesc")}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 h-72 lg:h-96">
            <iframe
              src="https://maps.google.com/maps?q=Kapeli+Village,+Bagli,+Dewas+District,+Madhya+Pradesh+455227,+India&hl=en&z=14&output=embed"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Rajesh Patidar Mobile Repair Location"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Rajesh Patidar Mobile Repair</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Kapeli, Dewas District<br />Madhya Pradesh, India</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-gray-500" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t("workingHours")}</h3>
              </div>
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">{t("days")}</span><span className="font-semibold text-gray-900 dark:text-white">{t("hours")}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">{t("sunday")}</span><span className="font-semibold text-gray-900 dark:text-white">{t("sundayHours")}</span></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href="https://www.google.com/maps/search/Kapeli+Village+Bagli+Dewas+Madhya+Pradesh" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                <MapPin size={14} />{t("getDirections")}
              </a>
              <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl text-sm transition-colors">
                <Phone size={14} />{t("callUs")} · {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useApp();
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{t("contactUs")}</h2>
          <p className="text-blue-200 mb-10 text-sm">{t("contactDesc")}</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: "📞", label: t("callUs"), value: PHONE, href: `tel:${PHONE}` },
            { icon: "💬", label: "WhatsApp", value: "Chat with us", href: `https://wa.me/91${PHONE}` },
            { icon: "🕒", label: t("workingHours"), value: "9 AM – 9 PM", href: null },
          ].map(item => (
            <motion.div key={item.label} whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="text-white font-bold text-lg hover:text-blue-200 transition-colors">{item.value}</a>
              ) : (
                <div className="text-white font-bold text-lg">{item.value}</div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg">
            <MessageCircle size={16} />{t("chatWhatsApp")}
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg">
            <Phone size={16} />Call: {PHONE}
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useApp();
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-500 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">R</div>
            <div>
              <div className="font-bold text-white text-sm">Rajesh Patidar Mobile Repair</div>
              <div className="text-xs text-gray-500">Kapeli, Madhya Pradesh</div>
            </div>
          </div>
          <div className="flex gap-4 text-xs">
            {["home", "services", "bookRepair", "myBookings"].map(k => (
              <a key={k} href={k === "myBookings" ? "/status" : `/#${k === "home" ? "" : k.toLowerCase()}`}
                className="hover:text-white transition-colors capitalize">{t(k as any)}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>© {new Date().getFullYear()} Rajesh Patidar Mobile Repair. All rights reserved.</span>
          <div className="flex gap-4">
            <span>📞 {PHONE}</span>
            <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-40">
      <motion.a initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
        href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer"
        className="w-13 h-13 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        title="Chat on WhatsApp">
        <WhatsAppIcon />
      </motion.a>
      <motion.a initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }}
        href={`tel:${PHONE}`}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform hover:scale-110"
        title="Call Now">
        📞
      </motion.a>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <PriceEstimateSection />
      <BookingSection />
      <MapSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
