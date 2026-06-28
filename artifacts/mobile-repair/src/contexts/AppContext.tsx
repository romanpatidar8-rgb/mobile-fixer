import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang, TranslationKey } from "../i18n/translations";

interface User { mobile: string; name?: string; }

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  dark: boolean;
  toggleDark: () => void;
  user: User | null;
  login: (mobile: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "true");
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("dark", String(dark));
  }, [dark]);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }

  function toggleDark() { setDark(d => !d); }

  function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? (translations.en as Record<string, string>)[key] ?? key;
  }

  function login(mobile: string) {
    const u = { mobile };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AppContext.Provider value={{ lang, setLang, t, dark, toggleDark, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
