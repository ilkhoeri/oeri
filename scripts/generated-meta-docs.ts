import fs from "fs-extra";
import path from "node:path";
import { exec } from "node:child_process";
import matter from "gray-matter";
import { log } from "../resource/log/development";
import { getSlug } from "@/source/utils";

export async function collectFileDocs(docs: string, segments: string[], extensions = [".ts", ".tsx"]) {
  const basePath = `resource/docs/${docs}`;
  const data: { name: string; ext: string; segment: string[] }[] = [];

  for (const segment of segments) {
    const dirPath = path.join(basePath, segment);
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const ext = extensions.find(e => file !== `index${e}` && file.endsWith(e));
      if (ext) {
        const name = path.basename(file, ext);
        data.push({ name, ext, segment: [docs, segment] });
      }
    }
  }

  return data;
}

async function generatedMetaDocs(docs: string, segments: string[]) {
  const basePath = `resource/docs_raw/${docs}`;
  const fileOutput = `resource/docs_demo/generated/files-meta-docs.ts`;
  const nameFileOutput = getSlug(fileOutput.split("/"));

  const fileDocsData = await collectFileDocs(docs, segments);
  const data: string[] = [];

  try {
    await fs.ensureDir(path.dirname(fileOutput));

    for (const fileData of fileDocsData) {
      const { name, ext, segment } = fileData;
      const mdxPath = path.join(basePath, ...segment.slice(1), `${name}.mdx`);

      if (!(await fs.pathExists(mdxPath))) continue;

      const content = await fs.readFile(mdxPath, "utf8");
      const { data: meta } = matter(content);

      const metaString = JSON.stringify(meta, null, 2).replace(/^/gm, "    ");

      data.push(`  {\n    name: "${name}",\n    ext: "${ext}",\n    path: "/docs/${segment.join("/")}/${name}",\n    segment: ["${segment.join('", "')}"],\n    meta:${metaString}\n  }`);
    }

    const content = `// Generated automatically. Do not edit manually.\n` + `// generated: bun run generated:metadocs\n\n` + `export const fileDocsMeta = [\n${data.join(",\n")}\n];\n`;

    await fs.writeFile(fileOutput, content, "utf8");

    // log.success(`File ${nameFileOutput} berhasil dibuat dan diperbarui!`);

    exec(`bun run prettier --write ${fileOutput} --ignore-unknown --no-error-on-unmatched-pattern`, (error, _, stderr) => {
      if (error) {
        log.warn(`Prettier gagal dijalankan:`, error);
        return;
      }
      if (stderr) {
        log.warn(`Prettier stderr: ${stderr}`);
      }

      log.success(`File ${nameFileOutput} berhasil dibuat, diperbarui, dan diformat dengan Prettier!`);
    });
  } catch (error) {
    log.error(`Terjadi kesalahan saat generated ${nameFileOutput}:`, error);
  }
}

// Contoh pemanggilan
generatedMetaDocs("web", ["components", "configuration", "hooks", "utilities"]);
