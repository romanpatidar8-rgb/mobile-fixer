import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Globe, Menu, X, Phone, MessageCircle, User, LogOut, Shield } from "lucide-react";
import { useApp } from "../contexts/AppContext";

const PHONE = "9165444894";

export default function Navbar() {
  const { t, lang, setLang, dark, toggleDark, user, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/#services", label: t("services") },
    { href: "/#booking", label: t("bookRepair") },
    { href: "/status", label: t("myBookings") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-black text-lg shadow">R</div>
          <div className="hidden sm:block">
            <div className="font-bold text-blue-700 dark:text-blue-400 text-sm leading-tight">Rajesh Patidar</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs leading-tight">Mobile Repair</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${location === l.href ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >{l.label}</a>
          ))}
          <Link href="/admin"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"
          ><Shield size={13} />{t("adminPanel")}</Link>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
            <Globe size={12} />{lang === "en" ? "हिं" : "EN"}
          </button>
          <button onClick={toggleDark}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
            <MessageCircle size={13} />WhatsApp
          </a>
          <a href={`tel:${PHONE}`}
            className="hidden md:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
            <Phone size={13} />{t("callNow")}
          </a>
          {user ? (
            <div className="hidden lg:flex items-center gap-1.5">
              <Link href="/status" className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
                <User size={13} />{user.mobile.slice(-4)}
              </Link>
              <button onClick={logout} className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden lg:flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
              <User size={13} />{t("login")}
            </Link>
          )}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{l.label}</a>
              ))}
              <Link href="/admin" onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                <Shield size={14} />{t("adminPanel")}
              </Link>
              {user ? (
                <button onClick={() => { logout(); setOpen(false); }}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                  <LogOut size={14} />{t("logout")}
                </button>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2">
                  <User size={14} />{t("login")}
                </Link>
              )}
              <div className="flex gap-2 mt-2">
                <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <MessageCircle size={14} />WhatsApp
                </a>
                <a href={`tel:${PHONE}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <Phone size={14} />{t("callNow")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
