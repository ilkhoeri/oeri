"use server";

import fs from "fs-extra";
import path from "node:path";
import { log } from "../resource/log/development";

function toPascalCase(str: string) {
  return str.replace(/(^|[-_])(\w)/g, (_, __, letter) => letter.toUpperCase()).replace(/[-_]/g, "");
}

// untuk menghasilkan index.ts
async function generateIndexFile(baseFolder: string, fileOutput: string, { addContent = "" }: { addContent?: string } = {}) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(fileOutput);
    await fs.mkdir(outputDir, { recursive: true });
    // Baca semua file dalam folder
    const files = await fs.readdir(baseFolder);

    // Filter hanya file TypeScript dengan ekstensi .tsx
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    // Buat daftar ekspor
    const exports = tsxFiles
      .map(file => {
        const nameWithoutExt = path.basename(file, ".tsx");
        const pascalName = toPascalCase(nameWithoutExt) + "Icon";
        return `export { Icon as ${pascalName} } from "./${nameWithoutExt}";`;
      })
      .join("\n");

    // Tulis ke file index.ts
    const content = `// Generated automatically. Do not edit manually.${addContent}\n\n${exports}\n`;
    await fs.writeFile(fileOutput, content, "utf8");

    log.success("File index.ts berhasil dibuat dan diperbarui!");
  } catch (error) {
    log.error("Terjadi kesalahan saat membuat index.ts:", error);
  }
}

// Jalankan fungsi utama
generateIndexFile("resource/icons", "resource/icons/index.ts", {
  addContent: `\n\nexport * from "@/ui/svg";`
});
