import { useDarkMode } from "lib/commons/dark-mode-toggle";
import { Footer } from "lib/footer/footer";
import { FooterProps } from "lib/footer/footer.types";

export function FooterWithTheme(props: FooterProps) {
  const { isDarkTheme, toggleDarkTheme } = useDarkMode();

  return (
    <Footer
      {...props}
      darkTheme={isDarkTheme}
      toggleDarkTheme={toggleDarkTheme}
    />
  );
}
