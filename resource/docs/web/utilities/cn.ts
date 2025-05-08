import { cnx, type cnxValues } from "xuxi";
import { twMerge } from "tailwind-merge";

export function cn(...args: cnxValues[]): string | undefined {
  if (!args) return;
  return twMerge(cnx(...args));
}
