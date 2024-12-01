"use server";

import fs from "fs-extra";
import path from "node:path";
import { log } from "../log/development";

export async function generateJson(basePath: string, outputPath: string) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(outputPath); // Ambil direktori dari outputPath
    await fs.mkdir(outputDir, { recursive: true }); // Buat folder jika belum ada

    // Baca semua file dalam folder
    const files = await fs.readdir(basePath);

    // Filter file dengan ekstensi .tsx
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    // Tulis hasilnya ke file JSON
    await fs.writeFile(outputPath, JSON.stringify(tsxFiles, null, 2));

    log(`Icons JSON generated at ${outputPath}`);
  } catch (error) {
    log.error("Error generating icons JSON:", error);
  }
}
