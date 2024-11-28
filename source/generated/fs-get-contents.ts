"use server";

import fs from "fs-extra";
import path from "node:path";
import { log } from "../log/development";

async function filterContent(
  content: string,
  replace: Record<string, string>
): Promise<string> {
  const lines = content.split("\n");

  const filteredLines = lines
    .filter(
      line =>
        !line.includes("ignore") &&
        !line.includes("import globalStyle") &&
        !line.includes("className={globalStyle") &&
        !line.includes("__set_props") &&
        !line.includes("useSetProps") &&
        !line.includes("SetProps")
    )
    .map(line => {
      for (const [key, value] of Object.entries(replace)) {
        const regex = new RegExp(`\\b${key}\\b`, "g");
        line = line.replace(regex, value);
      }
      return line;
    });

  return filteredLines.join("\n").trimEnd();
}

export type Content = { content: string | null; extension: string | null };
export type GetContentOptions = {
  lang?: string;
  wrap?: boolean;
};

export async function getRepo(
  gitrepo: string,
  ext: string,
  lang: string = "js showLineNumbers"
): Promise<string> {
  const response = await fetch(`${gitrepo}${ext}`);
  let text = await response.text();
  text = await filterContent(text, {});
  return `\`\`\`${lang}\n${text}\n\`\`\``.trimEnd();
}

const gitrepo = `https://raw.githubusercontent.com/ilkhoeri/oeri/main`;

export async function getContent(
  basePath: string,
  extensions: string[] = [".tsx", ".ts"],
  replace: Record<string, string> = {},
  options: GetContentOptions = {}
) {
  const { lang = "js showLineNumbers", wrap = true } = options;

  try {
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), `${basePath}${ext}`);
      try {
        let text = await fs.readFile(fullPath, "utf-8");
        text = await filterContent(text, replace);

        if (wrap) {
          text = `\`\`\`${lang}\n${text}\n\`\`\``;
        }

        return {
          content: text.trimEnd()
            ? text
            : await getRepo(
                `${gitrepo}/resource/docs/${basePath}`,
                ext || ".tsx"
              ),
          extension: ext
        };
      } catch (error: any) {
        log(error);
        // Continue to the next extension if file is not found
      }
    }
    return { content: null, extension: null }; // If none of the extensions matched
  } catch (error: any) {
    log(error);
    return { content: null, extension: null };
  }
}

export async function getMdx(
  basePath: string,
  sectionId?: string
): Promise<string | null> {
  try {
    const fullPathMd = path.join(process.cwd(), `${basePath}.md`);
    const fullPathMdx = path.join(process.cwd(), `${basePath}.mdx`);

    let text;
    try {
      text = await fs.readFile(fullPathMdx, "utf-8");
    } catch (error: any) {
      log(error);
      text = await fs.readFile(fullPathMd, "utf-8");
    }

    if (!sectionId) {
      return text.trim() ? text : null;
    }

    const sectionRegex = new RegExp(
      `\\$:${sectionId}[\\s\\S]*?(?=\\$:|$)`,
      "g"
    );
    const match = text.match(sectionRegex);

    if (match) {
      return match[0].replace(`$:${sectionId}`, "").trim();
    } else {
      return null;
    }
  } catch (error: any) {
    log(error);
    return null;
  }
}
