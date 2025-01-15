"use server";

import fs from "fs-extra";
import path from "node:path";
import { log } from "@/resource/log/development";

function toPascalCase(str: string): string {
  return str.replace(/(^|[-_])(\w)/g, (_, __, letter) => letter.toUpperCase()).replace(/[-_]/g, "");
}
function getSlug(segment: string | undefined): string {
  const slug = segment?.split("/").filter(Boolean);
  return slug === undefined ? " " : slug[slug.length - 1];
}

export async function generateDemosFile(baseFolder: string, fileOutput: string) {
  try {
    // Pastikan folder tujuan
    const outputDir = path.dirname(fileOutput);
    await fs.mkdir(outputDir, { recursive: true });
    // Baca semua file dalam folder
    const baseFiles = await fs.readdir(baseFolder);
    // Filter hanya file TypeScript dengan ekstensi .tsx
    const files = baseFiles.filter(file => file.endsWith(".tsx"));

    const imports: string[] = [];
    const demosMapEntries: string[] = [];
    const typeEntries: string[] = [];
    const nameEntries: string[] = [];

    for (const file of files) {
      const fileName = file.replace(/\.(ts|tsx)$/, "");
      const demoName = `${toPascalCase(fileName)}Demos`;
      const key = fileName.replace(/_/g, "-");

      imports.push(`import { ${demoName} } from "@/${baseFolder}/${fileName}";`);
      demosMapEntries.push(`  "${key}": ${demoName}`);
      typeEntries.push(`  | ["${key}", typeof ${demoName}]`);

      // Baca isi file untuk mendapatkan properti yang diekspor
      const filePath = path.join(baseFolder, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      const matches = fileContent.match(new RegExp(`export const ${demoName} = {([\\s\\S]*?)};`, "m"));

      if (matches) {
        const properties = matches[1]
          .split(",")
          .map(prop => prop.trim())
          .filter(Boolean);
        properties.forEach(prop => {
          const demoKey = toPascalCase(prop);
          nameEntries.push(`  ${demoName}${demoKey}: () => <DemoSlot data={${demoName}.${prop}} />`);
        });
      }
    }
    const keyName = toPascalCase(getSlug(baseFolder));

    const content = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.\n\n// script: bun run generated:generated-files-demos\n\nimport { DemoSlot } from "@/resource/docs_demo/assets/demo-slot";\n${imports.join("\n")}\n\nexport type ConstructorWeb${keyName}Demos =\n${typeEntries.join("\n")};\n\nexport type ConstructorKeys<U extends [string, unknown]> = {\n  [K in U as K[0]]: \`\${K[0]}-\${Extract<keyof K[1], string>}\`;\n}[U[0]];\n\nexport type DocsDemoEntries = ConstructorKeys<ConstructorWeb${keyName}Demos>;\n\nexport const demosMap = {\n${demosMapEntries.join(",\n")}\n} as const;\n\nexport const demo${keyName}Entries = {\n${nameEntries.join(",\n")}\n} as const;`;

    await fs.writeFile(fileOutput, content, "utf8");
    log.success(`File ${fileOutput} berhasil dibuat dan diperbarui!`);
  } catch (error) {
    log.error("Terjadi kesalahan saat mengeksport", error);
  }
}

// Components
generateDemosFile("resource/demos/web/components", "resource/docs_demo/assets/demo-manifest-component.tsx");

// Hooks
generateDemosFile("resource/demos/web/hooks", "resource/docs_demo/assets/demo-manifest-hook.tsx");
