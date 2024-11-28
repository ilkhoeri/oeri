"use client";

import * as React from "react";
import { MonitorSmartphoneIcon, MoonStarIcon, SunIcon } from "@/modules/icons";
import { useAppContext } from "../context/app";
import { UnstyledButton } from "../ui/button";
import { twMerge } from "tailwind-merge";
import {
  useTheme,
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps
} from "next-themes";

export enum Theme {
  light = "light",
  system = "system",
  dark = "dark"
}
const dataTheme: `${Theme}`[] = Object.values(Theme);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Fungsi untuk mengatur cookie
const setCookie = (name: string, value: string, days = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
};

// Fungsi untuk mendapatkan tema berikutnya dari daftar tema
const nextValue = (current: string, themes: string[]): string => {
  const currentIndex = themes.indexOf(current);
  return themes[(currentIndex + 1) % themes.length];
};

export function useNextTheme() {
  const { theme: setKey } = useAppContext();
  const { theme, setTheme } = useTheme();

  const [keyTheme, setKeyTheme] = React.useState<`${Theme}`>(
    setKey as `${Theme}`
  );

  const memoizedTheme = React.useCallback(
    (newTheme: string, setNext: boolean = false) => {
      const updatedTheme = setNext
        ? nextValue(newTheme as `${Theme}`, dataTheme as string[])
        : (newTheme as `${Theme}`);

      setTheme(updatedTheme);
      setKeyTheme(updatedTheme as `${Theme}`);
      setCookie("__theme", updatedTheme);
    },
    [setTheme, dataTheme]
  );

  // Mengaktifkan hotkey untuk berpindah tema
  React.useEffect(() => {
    const handleHotkey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "j") {
        memoizedTheme(keyTheme, true);
      }
    };

    window.addEventListener("keydown", handleHotkey);
    return () => window.removeEventListener("keydown", handleHotkey);
  }, [keyTheme, memoizedTheme]);

  return { theme, keyTheme, memoizedTheme };
}

export function ThemeToggle({
  classNames,
  unstyled
}: {
  classNames?: { wrapper?: string; buttons?: string };
  unstyled?: { wrapper?: boolean; buttons?: boolean };
}) {
  const { keyTheme, memoizedTheme } = useNextTheme();
  return (
    <section
      className={twMerge(
        !unstyled?.wrapper && "relative flex items-center flex-flow-row gap-4",
        classNames?.wrapper
      )}>
      <code className="sr-only hidden select-none tracking-wide">⌘+J</code>
      {theming.map(i => (
        <UnstyledButton
          key={i.name}
          role="button"
          data-state={keyTheme === i.name ? "active" : ""}
          onClick={() => memoizedTheme(i.name)}
          aria-label={i.name}
          className={twMerge(
            !unstyled?.buttons &&
              "relative text-[13px] flex items-center justify-center cursor-pointer select-none p-1 outline-0 transition-colors focus:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:text-neutral-50 border border-neutral-200 dark:border-neutral-700 h-[var(--ttg-sz,30px)] w-[var(--ttg-sz,30px)] rounded-lg capitalize focus:bg-[#e4e4e4] dark:focus:bg-[#373737] data-[state=active]:bg-muted data-[state=active]:text-color",
            classNames?.buttons
          )}>
          <i.icon />
        </UnstyledButton>
      ))}
    </section>
  );
}

export function ThemeStateHidden() {
  useNextTheme();
  return (
    <ruby
      aria-label="THEMING_SHORTCUT (⌘/ctrl + J)"
      className="sr-only hidden"
      tabIndex={-1}
      hidden
      aria-hidden>
      <rp className="sr-only" tabIndex={-1} hidden aria-hidden>
        THEMING_SHORTCUT (⌘/ctrl + J)
      </rp>
    </ruby>
  );
}

export const theming = [
  {
    name: "light",
    icon: SunIcon
  },
  {
    name: "system",
    icon: MonitorSmartphoneIcon
  },
  {
    name: "dark",
    icon: MoonStarIcon
  }
];
