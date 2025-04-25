"use server";

import fs from "fs-extra";
import path from "node:path";
import { log } from "../resource/log/development";

function toPascalCase(str: string) {
  return str.replace(/(^|[-_])(\w)/g, (_, __, letter) => letter.toUpperCase()).replace(/[-_]/g, "");
}

// untuk generate icons berdasarkan nama file, menghasilkan index.ts
export async function generatedExport(baseFolder: string, fileOutput: string, { addContent = "" }: { addContent?: string } = {}) {
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

// Parsing named exports dari sebuah file
function extractNamedExports(fileContent: string): string[] {
  const exportRegex = /export\s+function\s+(\w+)/g;
  const matches = [];
  let match;
  while ((match = exportRegex.exec(fileContent)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

// Generate index.ts dengan penanganan duplikat nama
async function generateIndexFile(baseFolder: string, fileOutput: string, { addContent = "" }: { addContent?: string } = {}) {
  try {
    const outputDir = path.dirname(fileOutput);
    await fs.mkdir(outputDir, { recursive: true });

    const files = await fs.readdir(baseFolder);
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    const exportMap: Record<string, { name: string; from: string }[]> = {};

    for (const file of tsxFiles) {
      const filePath = path.join(baseFolder, file);
      const content = await fs.readFile(filePath, "utf8");

      const exportNames = extractNamedExports(content);
      for (const name of exportNames) {
        if (!exportMap[name]) {
          exportMap[name] = [];
        }
        exportMap[name].push({ name, from: `./${path.basename(file, ".tsx")}` });
      }
    }

    const exportStatements: string[] = [];

    for (const [exportName, sources] of Object.entries(exportMap)) {
      if (sources.length === 1) {
        const src = sources[0];
        exportStatements.push(`export { ${exportName} } from "${src.from}";`);
      } else {
        for (const src of sources) {
          const fileBase = path.basename(src.from);
          const alias = `${toPascalCase(fileBase)}${exportName}`;
          exportStatements.push(`export { ${exportName} as ${alias} } from "${src.from}";`);
        }
      }
    }

    const content = `// Generated automatically. Do not edit manually.${addContent}\n\n${exportStatements.join("\n")}\n`;
    await fs.writeFile(fileOutput, content, "utf8");

    log.success("File index.ts berhasil dibuat dan diperbarui!");
  } catch (error) {
    log.error("Terjadi kesalahan saat membuat index.ts:", error);
  }
}

generateIndexFile("resource/icons", "resource/icons/index.ts", {
  addContent: `\n// bun run exported:icons`
});
