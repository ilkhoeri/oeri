import fs from "fs-extra";
import path from "node:path";
import { getSlug, sourceFile } from "@/source/utils";

export function sourceCodes(segment?: string[]) {
  const resource = `/resource/docs/${sourceFile(segment)}`;
  const extensions = [".tsx", ".ts"];

  let code: string | null = null;
  let css: string | null = null;

  try {
    // Cari file source code dengan ekstensi yang didukung
    for (const ext of extensions) {
      const filePath = path.join(process.cwd(), `${resource}${ext}`);
      if (fs.existsSync(filePath)) {
        code = fs.readFileSync(filePath, "utf-8").trimEnd();
        break; // Hentikan loop setelah file ditemukan
      }
    }

    // Baca file CSS global
    const globalCssPath = path.join(process.cwd(), "app", "globals.css");
    if (fs.existsSync(globalCssPath)) {
      const globalCss = fs.readFileSync(globalCssPath, "utf-8");
      const regex = new RegExp(`/\\*\\s*${getSlug(segment)}\\s*\\*/[\\s\\S]*?(?=/\\*|$)`, "g");
      const matches = globalCss.match(regex);
      if (matches && matches.length > 0) {
        css = matches[0].trimEnd();
      }
    }

    return { code, css };
  } catch (error) {
    console.error("Error reading source code or CSS:", error);
  }

  return { code: null, css: null };
}
