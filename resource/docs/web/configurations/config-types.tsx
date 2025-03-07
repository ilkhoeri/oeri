export type RequestCookies =
  | { name: string; value: "true" | "false" | (string & {}) }
  | undefined;

export enum Cookies {
  dir = "__dir",
  theme = "__theme",
  isOpenAside = "__is_open_aside"
}

export const themePreferences: string[] = ["default"];
