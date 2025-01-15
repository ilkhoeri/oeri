"use server";

import fs from "fs-extra";
import path from "node:path";
import { log } from "@/resource/log/development";

function toPascalCase(str: string) {
  return str.replace(/(^|[-_])(\w)/g, (_, __, letter) => letter.toUpperCase()).replace(/[-_]/g, "");
}

async function generateDemosFile(baseFolder: string, fileOutput: string) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(fileOutput);
    await fs.mkdir(outputDir, { recursive: true });
    // Baca semua file dalam folder
    const baseFiles = await fs.readdir(baseFolder);

    // Filter hanya file TypeScript dengan ekstensi .tsx
    const files = baseFiles.filter(file => file.endsWith(".tsx"));

    const imports: string[] = [];
    const demosMapEntries: string[] = [];
    const typeEntries: string[] = [];

    files.forEach(file => {
      const componentName = file.replace(/\.(ts|tsx)$/, "");
      const demoName = `${toPascalCase(componentName)}Demos`;
      const key = componentName.replace(/_/g, "-");

      imports.push(`import { ${demoName} } from "@/${baseFolder}/${componentName}";`);
      demosMapEntries.push(`  "${key}": ${demoName}`);
      typeEntries.push(`  | ["${key}", typeof ${demoName}]`);
    });

    const content = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.\n\n${imports.join("\n")}\n\nexport type ConstructorWebComponentDemos =\n${typeEntries.join("\n")};\n\nexport type ConstructorKeys<U extends [string, unknown]> = {\n  [K in U as K[0]]: \`\${K[0]}-\${Extract<keyof K[1], string>}\`;\n}[U[0]];\n\nexport type DocsDemoEntries = ConstructorKeys<ConstructorWebComponentDemos>;\n\nexport const demosMap = {\n${demosMapEntries.join(",\n")}\n} as const;`;

    await fs.writeFile(fileOutput, content, "utf8");
    log.success(`File ${fileOutput} berhasil dibuat dan diperbarui!`);
  } catch (error) {
    log.error("Terjadi kesalahan saat mengeksport", error);
  }
}

generateDemosFile("resource/demos/web/components", "resource/docs_demo/assets/demo-manifest.ts");
