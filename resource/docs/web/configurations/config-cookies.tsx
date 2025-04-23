"use server";
import { cookies } from "next/headers";
import { Cookies } from "./config-types";
import { Theme } from "./app-context";

export async function setCookieSync(name: string, value: string, days: number = 365) {
  (await cookies()).set({
    name,
    value,
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * days // Cookie values ​​are valid for one year
  });
}

export async function cookiesValues() {
  const cookiesStore = await cookies();
  return {
    dir: cookiesStore.get(Cookies.dir)?.value as Direction,
    theme: cookiesStore.get(Cookies.theme)?.value as Theme,
    isOpenAside: (cookiesStore.get(Cookies.isOpenAside)?.value === "true") as boolean
  };
}
