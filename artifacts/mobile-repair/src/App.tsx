import { useState } from "react";

const PHONE = "9165444894";
const WHATSAPP_URL = `https://wa.me/91${PHONE}`;
const CALL_URL = `tel:${PHONE}`;

const BRANDS = [
  "Samsung", "Apple (iPhone)", "Xiaomi / Redmi", "Oppo", "Vivo",
  "OnePlus", "Realme", "Motorola", "Nokia", "Poco", "Other"
];

const PROBLEMS = [
  "Screen Broken / Cracked",
  "Battery Not Charging",
  "Battery Drains Fast",
  "Speaker / Mic Not Working",
  "Camera Not Working",
  "Phone Not Turning On",
  "Water Damage",
  "Charging Port Issue",
  "Software / Hang Issue",
  "Back Panel Damage",
  "SIM Card Not Detected",
  "Other Issue"
];

const SERVICES = [
  { icon: "📱", title: "Screen Replacement", desc: "Original & compatible screens for all brands with warranty." },
  { icon: "🔋", title: "Battery Replacement", desc: "Genuine batteries that restore your phone's full battery life." },
  { icon: "📷", title: "Camera Repair", desc: "Front & rear camera issues fixed by expert technicians." },
  { icon: "🔊", title: "Speaker & Mic Repair", desc: "Clear audio restored — earpiece, loudspeaker, and mic." },
  { icon: "💧", title: "Water Damage Repair", desc: "Deep cleaning and component-level repair for water-damaged phones." },
  { icon: "🔌", title: "Charging Port Fix", desc: "Charging port replacement and board-level repair." },
  { icon: "⚙️", title: "Software Issues", desc: "Hang, restart loops, software flash and OS repair." },
  { icon: "🛡️", title: "Back Panel & Body", desc: "Back glass, frame and body repair for a like-new finish." },
];

type BookingForm = {
  name: string;
  mobile: string;
  brand: string;
  model: string;
  problem: string;
  otherProblem: string;
};

function Navbar({ onBook }: { onBook: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow">
            R
          </div>
          <div>
            <div className="font-bold text-blue-700 text-base leading-tight">Rajesh Patidar</div>
            <div className="text-xs text-gray-500 leading-tight">Mobile Repair</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#booking" className="hover:text-blue-600 transition-colors">Book Repair</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <a
            href={CALL_URL}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow"
          >
            📞 Call Now
          </a>
        </div>

        <button
          className="md:hidden text-blue-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <a href="#home" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Services</a>
          <a href="#booking" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Book Repair</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Contact</a>
          <div className="flex gap-3 pt-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg font-semibold">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={CALL_URL} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold">
              📞 Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function HeroSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            ⭐ Trusted Mobile Repair Service
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Rajesh Patidar<br />
            <span className="text-blue-200">Mobile Repair</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-lg">
            Expert mobile phone repair at your doorstep. Screen replacement, battery issues, water damage, software problems — we fix all brands, fast and affordable.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBook}
              className="bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base"
            >
              📋 Book Repair Now
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-base"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a
              href={CALL_URL}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-xl transition-colors text-base"
            >
              📞 Call Now
            </a>
          </div>
          <div className="flex flex-wrap gap-6 mt-10">
            {[["500+", "Repairs Done"], ["5★", "Customer Rating"], ["24hr", "Quick Turnaround"], ["1 Yr", "Warranty"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-blue-200 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative">
          <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6"></div>
          <div className="absolute inset-0 bg-white/10 rounded-3xl -rotate-3"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl h-full flex items-center justify-center flex-col gap-4">
            <div className="text-7xl">📱</div>
            <div className="text-blue-700 font-bold text-lg text-center px-4">We Fix All Brands</div>
            <div className="flex flex-wrap justify-center gap-1.5 px-4">
              {["Samsung", "iPhone", "Xiaomi", "Oppo", "Vivo", "OnePlus"].map(b => (
                <span key={b} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            🔧 Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">What We Repair</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Fast, affordable, and professional mobile repair services with genuine parts and warranty.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandSelector({ selected, onSelect }: { selected: string; onSelect: (b: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Mobile Brand *</label>
      <div className="flex flex-wrap gap-2">
        {BRANDS.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onSelect(b)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
              selected === b
                ? "bg-blue-600 border-blue-600 text-white shadow"
                : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProblemSelector({ selected, onSelect }: { selected: string; onSelect: (p: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Problem *</label>
      <div className="flex flex-wrap gap-2">
        {PROBLEMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onSelect(p)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
              selected === p
                ? "bg-blue-600 border-blue-600 text-white shadow"
                : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function BookingSection() {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    mobile: "",
    brand: "",
    model: "",
    problem: "",
    otherProblem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  function validate() {
    const e: Partial<BookingForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.trim())) e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.brand) e.brand = "Please select a brand";
    if (!form.model.trim()) e.model = "Phone model is required";
    if (!form.problem) e.problem = "Please select a problem";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const problemText = form.problem === "Other Issue" && form.otherProblem
      ? `Other: ${form.otherProblem}`
      : form.problem;

    const msg = `Hello Rajesh Patidar Mobile Repair!%0A%0A*Booking Request*%0A%0A👤 *Name:* ${form.name}%0A📞 *Mobile:* ${form.mobile}%0A📱 *Brand:* ${form.brand}%0A🔖 *Model:* ${form.model}%0A🔧 *Problem:* ${problemText}%0A%0APlease confirm my booking. Thank you!`;
    window.open(`https://wa.me/91${PHONE}?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  function handleReset() {
    setForm({ name: "", mobile: "", brand: "", model: "", problem: "", otherProblem: "" });
    setSubmitted(false);
    setErrors({});
  }

  const inputCls = (field: keyof BookingForm) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    }`;

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            📋 Book a Repair
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Book Your Repair</h2>
          <p className="text-gray-500 mt-3">Fill the form and we'll contact you via WhatsApp to confirm your booking.</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">Booking Sent!</h3>
            <p className="text-green-600 mb-6">Your booking request has been sent via WhatsApp. We'll confirm it shortly.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={handleReset} className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                Book Another Repair
              </button>
              <a href={CALL_URL} className="bg-gray-100 text-gray-700 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors">
                📞 Call Us
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl p-6 md:p-8 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  className={inputCls("name")}
                  placeholder="e.g. Ramesh Sharma"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                <input
                  type="tel"
                  className={inputCls("mobile")}
                  placeholder="10-digit number"
                  maxLength={10}
                  value={form.mobile}
                  onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, "") }))}
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <BrandSelector
              selected={form.brand}
              onSelect={b => { setForm(f => ({ ...f, brand: b })); setErrors(e => ({ ...e, brand: undefined })); }}
            />
            {errors.brand && <p className="text-red-500 text-xs -mt-3">{errors.brand}</p>}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Model *</label>
              <input
                type="text"
                className={inputCls("model")}
                placeholder="e.g. Samsung Galaxy A52, iPhone 12"
                value={form.model}
                onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
              />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>

            <ProblemSelector
              selected={form.problem}
              onSelect={p => { setForm(f => ({ ...f, problem: p })); setErrors(e => ({ ...e, problem: undefined })); }}
            />
            {errors.problem && <p className="text-red-500 text-xs -mt-3">{errors.problem}</p>}

            {form.problem === "Other Issue" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe Your Problem</label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none"
                  rows={3}
                  placeholder="Please describe your issue..."
                  value={form.otherProblem}
                  onChange={e => setForm(f => ({ ...f, otherProblem: e.target.value }))}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow"
              >
                <WhatsAppIcon /> Send via WhatsApp
              </button>
              <a
                href={CALL_URL}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow"
              >
                📞 Call to Book
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-700 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Get In Touch</h2>
        <p className="text-blue-200 mb-10 max-w-xl mx-auto">Have a question? Call us or message on WhatsApp — we're available every day.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: "📞", label: "Call Us", value: PHONE, href: CALL_URL },
            { icon: "💬", label: "WhatsApp", value: "Chat with us", href: WHATSAPP_URL },
            { icon: "🕒", label: "Working Hours", value: "9 AM – 9 PM", href: null },
          ].map(item => (
            <div key={item.label} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer" className="text-white font-bold text-lg hover:text-blue-200 transition-colors">
                  {item.value}
                </a>
              ) : (
                <div className="text-white font-bold text-lg">{item.value}</div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg"
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
          <a
            href={CALL_URL}
            className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg"
          >
            📞 Call: {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="font-bold text-white text-base mb-1">Rajesh Patidar Mobile Repair</div>
        <p>Expert mobile repair service — All brands, all problems.</p>
        <div className="flex justify-center gap-6 mt-4 text-gray-500 text-xs">
          <span>📞 {PHONE}</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">© {new Date().getFullYear()} Rajesh Patidar Mobile Repair. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  function scrollToBooking() {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen">
      <Navbar onBook={scrollToBooking} />
      <HeroSection onBook={scrollToBooking} />
      <ServicesSection />
      <BookingSection />
      <ContactSection />
      <Footer />

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <a
          href={CALL_URL}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform hover:scale-110"
          title="Call Now"
        >
          📞
        </a>
      </div>
    </div>
  );
}
