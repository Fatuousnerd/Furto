import Cookies from "js-cookie";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

type ThemeType = { theme: string; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const themeGet = Cookies.get("theme");

    if (!themeGet) {
      const initialTheme = prefersDark ? "dark" : "light";
      Cookies.set("theme", initialTheme, { expires: 365 });
      setTheme(initialTheme);
    } else {
      setTheme(themeGet);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    Cookies.set("theme", newTheme, { expires: 365 });
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext must be used within ThemeProvider");

  return ctx;
}

export default ThemeProvider;
