import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Phone, Shield, CheckCircle, ArrowRight, Smartphone, Loader2 } from "lucide-react";
import { OTPInput, SlotProps } from "input-otp";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth } from "../lib/firebase";
import { useApp } from "../contexts/AppContext";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

function Slot(props: SlotProps) {
  return (
    <div className={`w-11 h-14 flex items-center justify-center text-xl font-bold rounded-xl border-2 transition-all ${props.isActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg scale-105" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"} text-gray-900 dark:text-white`}>
      {props.char ?? <span className="text-gray-300 dark:text-gray-600">·</span>}
    </div>
  );
}

export default function LoginPage() {
  const { t, login, user } = useApp();
  const [, setLocation] = useLocation();
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch {}
        window.recaptchaVerifier = undefined;
      }
    };
  }, []);

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t("loginSuccess")}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{t("loggedInAs")} +91 {user.mobile}</p>
          <button onClick={() => setLocation("/status")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
            {t("myBookings")} →
          </button>
        </motion.div>
      </div>
    );
  }

  async function handleSendOTP() {
    if (!/^\d{10}$/.test(mobile)) { setError("Enter a valid 10-digit mobile number"); return; }
    setError("");
    setLoading(true);

    if (!firebaseConfigured) {
      setLoading(false);
      setOtpSent(true);
      return;
    }

    try {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch {}
        window.recaptchaVerifier = undefined;
      }

      const firebaseAuth = getFirebaseAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
      });

      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        `+91${mobile}`,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("auth/invalid-phone-number")) {
        setError("Invalid phone number. Please check and try again.");
      } else if (msg.includes("auth/too-many-requests")) {
        setError("Too many requests. Please try again later.");
      } else if (msg.includes("auth/")) {
        setError("SMS service not configured. Using demo mode.");
        setOtpSent(true);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    if (otp.length !== 6) { setError("Enter the 6-digit OTP"); return; }
    setError("");
    setLoading(true);

    if (!firebaseConfigured || !window.confirmationResult) {
      setLoading(false);
      login(mobile);
      setSuccess(true);
      setTimeout(() => setLocation("/status"), 1500);
      return;
    }

    try {
      await window.confirmationResult.confirm(otp);
      login(mobile);
      setSuccess(true);
      setTimeout(() => setLocation("/status"), 1500);
    } catch {
      setError("Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 pt-16 flex items-center justify-center px-4">
      <div id="recaptcha-container" ref={recaptchaContainerRef} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Smartphone className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{t("loginTitle")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{t("loginDesc")}</p>
        </div>

        {success ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-green-600 mb-2">{t("loginSuccess")}</h2>
            <p className="text-gray-500 text-sm">Redirecting to your bookings...</p>
          </motion.div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center gap-3">
              <Shield className="text-white/80" size={18} />
              <span className="text-white text-sm font-medium">
                {firebaseConfigured ? "Firebase Phone Authentication" : "Secure OTP Verification (Demo)"}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {!firebaseConfigured && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
                  ℹ️ <strong>Demo mode</strong> — Add Firebase credentials in environment variables to enable real SMS OTP.
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">{t("enterMobile")}</label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300">
                    +91
                  </div>
                  <input type="tel" maxLength={10}
                    className="flex-1 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="10-digit number"
                    value={mobile}
                    onChange={e => { setMobile(e.target.value.replace(/\D/g, "")); setOtpSent(false); setOtp(""); }}
                    disabled={otpSent || loading}
                  />
                </div>
              </div>

              {!otpSent ? (
                <button onClick={handleSendOTP} disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors shadow">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Phone size={16} />}
                  {loading ? "Sending OTP..." : `${t("sendOTP")} →`}
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("enterOTP")}</label>
                      <span className="text-xs text-green-600 font-medium">✓ {t("otpSent")} +91{mobile}</span>
                    </div>
                    <div className="flex justify-center mb-2">
                      <OTPInput maxLength={6} value={otp} onChange={setOtp}
                        render={({ slots }) => (
                          <div className="flex gap-2">
                            {slots.map((slot, i) => <Slot key={i} {...slot} />)}
                          </div>
                        )}
                      />
                    </div>
                    {!firebaseConfigured && (
                      <p className="text-center text-xs text-gray-400 dark:text-gray-500">{t("otpHint")}</p>
                    )}
                  </div>
                  <button onClick={handleVerify} disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors shadow">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                    {loading ? "Verifying..." : t("verifyOTP")}
                  </button>
                  <button onClick={() => { setOtpSent(false); setOtp(""); setError(""); }}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-center transition-colors">
                    ← Change number
                  </button>
                </motion.div>
              )}

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">
                  ⚠ {error}
                </motion.p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
