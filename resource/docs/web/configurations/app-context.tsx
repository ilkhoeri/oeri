"use client";
import * as React from "react";
import { setCookies } from "./config-cookies";
import { Cookies } from "./config-types";
import { useDirection, type Direction } from "@/hooks/use-direction";

export enum Booleanish {
  true = "true",
  false = "false"
}
type Theme = "dark" | "light" | "system";
type __T_ = "dir" | "theme" | "isOpenAside"; // cookies value
type IntrinsicAppProvider = Record<__T_, string | undefined>;
type useAppProps = IntrinsicAppProvider & {};
interface AppProviderProps extends IntrinsicAppProvider {
  children: React.ReactNode;
}
interface CtxProps {
  openAside: `${Booleanish}`;
  setOpenAside: (v: `${Booleanish}`) => void;
  setCookies(name: `${Cookies}` | (string & {}), value: string): Promise<void>;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
  // initial type
  dir: Direction;
  theme: Theme;
}

export const dataBooleanish: `${Booleanish}`[] = Object.values(Booleanish);
const ctx = React.createContext<CtxProps | undefined>(undefined);

export const useApp = () => {
  const _ctx = React.useContext(ctx);
  if (!_ctx) {
    throw new Error("main layout must be used within an <AppProvider>");
  }
  return _ctx;
};

function useAppFuntions(_app: useAppProps) {
  const { theme = "system", isOpenAside = "true", dir = "ltr", ...others } = _app;
  const [openAside, setOpenAside] = React.useState<`${Booleanish}`>(isOpenAside as `${Booleanish}`);
  const { dir: _dir, ..._direction } = useDirection({ initialDirection: dir as Direction });
  return { theme, dir: _dir, openAside, setOpenAside, ..._direction, ...others };
}

export function AppProvider({ children, ...props }: AppProviderProps) {
  const { theme, ...app } = useAppFuntions({ ...props });
  const value = { setCookies, theme: theme as Theme, ...app };
  return <ctx.Provider {...{ value }}>{children}</ctx.Provider>;
}
