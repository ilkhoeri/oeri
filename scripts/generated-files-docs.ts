import fs from "fs-extra";
import path from "node:path";
import { log } from "../resource/log/development";
import { getSlug } from "@/source/utils";

const COMMENT = `/**\n * @deprecated \`fileDocsWeb\` diganti dengan \`fileDocsMeta\` 👍\n * @example\n * ❌ import { fileDocsWeb } from "@/resource/docs_demo/generated/files-docs";\n * ➕ import { fileDocsMeta } from "@/resource/docs_demo/generated/files-meta-docs";\n */\n`;

async function generatedFilesDocs(docs: string, segments: string[]) {
  const basePath = `resource/docs/${docs}`;
  const fileOutput = `resource/docs_demo/generated/files-docs.ts`;
  const nameFileOuput = getSlug(fileOutput.split("/"));
  const extensions = [".tsx", ".ts"];

  const data: string[] = [];

  try {
    // Pastikan direktori output ada
    await fs.ensureDir(path.dirname(fileOutput));

    for (const segment of segments) {
      const dirPath = path.join(basePath, segment);
      const files = await fs.readdir(dirPath);

      for (const file of files) {
        const ext = extensions.find(e => file !== `index${e}` && file.endsWith(e));
        if (ext) {
          const name = path.basename(file, ext);
          data.push(`  {\n    name: "${name}",\n    ext: "${ext}",\n    segment: ["${docs}", "${segment}"]\n  }`);
        }
      }
    }

    const content = `// Generated automatically. Do not edit manually.\n// generated: bun run generated:filesdocs\n\n` + COMMENT + `export const fileDocsWeb = [\n${data.join(",\n")}\n];\n`;

    await fs.writeFile(fileOutput, content, "utf8");

    log.success(`File ${nameFileOuput} berhasil dibuat dan diperbarui!`);
  } catch (error) {
    log.error(`Terjadi kesalahan saat generated ${nameFileOuput}:`, error);
  }
}

generatedFilesDocs("web", ["components", "configuration", "hooks", "utilities"]);
