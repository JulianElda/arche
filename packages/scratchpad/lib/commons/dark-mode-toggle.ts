import { useState } from "react";

export function useDarkMode() {
  if (localStorage["theme"] === "dark")
    document.documentElement.classList.add("dark");

  const [isDarkTheme, setDarkTheme] = useState(
    localStorage["theme"] === "dark"
  );

  const toggleDarkTheme = () => {
    if (!isDarkTheme) {
      localStorage["theme"] = "dark";
      document.documentElement.classList.add("dark");
      setDarkTheme(true);
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      setDarkTheme(false);
    }
  };

  return { isDarkTheme, toggleDarkTheme };
}
