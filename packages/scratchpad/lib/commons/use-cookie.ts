import Cookies from "js-cookie";
import { useCallback, useState } from "react";

type CookiesReturn = [
  string | undefined,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  () => void,
];

export default function useCookie(cookieName: string): CookiesReturn {
  const [value, setValue] = useState<string | undefined>(
    () => Cookies.get(cookieName) || undefined
  );

  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(undefined);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
}
