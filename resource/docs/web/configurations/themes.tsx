"use client";

import * as React from "react";
import { cn } from "cretex";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useApp } from "./app-context";
import { UnstyledButton } from "@/ui/button";
import { MonitorSmartphoneIcon, MoonStarIcon, SunIcon } from "@/icons/*";
import { useTheme, ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export const theming = [
  { name: "light", icon: SunIcon },
  { name: "system", icon: MonitorSmartphoneIcon },
  { name: "dark", icon: MoonStarIcon }
] as const;

type Theme = (typeof theming)[number]["name"];
const themeNames: Theme[] = theming.map(theme => theme.name);

export const theme = { names: themeNames as string[] } as const;

export function ThemeProvider({ children, enableSystem = true, attribute = "class", defaultTheme = "system", disableTransitionOnChange = true, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...{
        enableSystem,
        attribute,
        defaultTheme,
        disableTransitionOnChange,
        ...props
      }}
    >
      {children}
    </NextThemesProvider>
  );
}

function nextValue(current: string, themes: string[]): string {
  const currentIndex = themes.indexOf(current);
  return themes[(currentIndex + 1) % themes.length];
}

export function useNextTheme() {
  const { theme: setKey, setCookie } = useApp();
  const { theme, setTheme } = useTheme();

  const [keyTheme, setKeyTheme] = React.useState<Theme>(setKey as Theme);

  const memoizedTheme = React.useCallback(
    (newTheme: string, setNext: boolean = false) => {
      const updatedTheme = setNext ? nextValue(newTheme as Theme, themeNames as string[]) : (newTheme as Theme);

      setTheme(updatedTheme);
      setKeyTheme(updatedTheme as Theme);
      setCookie("__theme", updatedTheme, 30);
    },
    [setTheme, setCookie]
  );

  useHotkeys([
    [
      "mod+J",
      () => {
        memoizedTheme(keyTheme, true);
      }
    ]
  ]);

  return { theme, keyTheme, memoizedTheme };
}

export function ThemeToggle({ classNames, unstyled }: { classNames?: { wrapper?: string; buttons?: string }; unstyled?: { wrapper?: boolean; buttons?: boolean } }) {
  const { keyTheme, memoizedTheme } = useNextTheme();
  return (
    <section className={cn(!unstyled?.wrapper && "relative flex flex-row items-center gap-4", classNames?.wrapper)}>
      <code className="sr-only hidden select-none tracking-wide">⌘+J</code>
      {theming.map(theme => (
        <UnstyledButton
          key={theme.name}
          role="button"
          suppressHydrationWarning
          data-state={keyTheme === theme.name ? "active" : ""}
          onClick={() => memoizedTheme(theme.name)}
          aria-label={theme.name}
          className={cn(
            !unstyled?.buttons &&
              "relative flex h-[var(--ttg-sz,30px)] w-[var(--ttg-sz,30px)] cursor-pointer select-none items-center justify-center rounded-lg border border-neutral-200 p-1 text-[13px] capitalize outline-0 transition-colors focus:bg-[#e4e4e4] focus:text-neutral-900 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-muted data-[state=active]:text-color dark:border-neutral-700 dark:focus:bg-[#373737] dark:focus:text-neutral-50",
            classNames?.buttons
          )}
        >
          <theme.icon />
        </UnstyledButton>
      ))}
    </section>
  );
}

export function ThemeStateHidden() {
  useNextTheme();
  return (
    <ruby aria-label="THEMING_SHORTCUT (⌘/ctrl + J)" className="sr-only hidden" tabIndex={-1} hidden aria-hidden>
      <rp className="sr-only" tabIndex={-1} hidden aria-hidden>
        THEMING_SHORTCUT (⌘/ctrl + J)
      </rp>
    </ruby>
  );
}
