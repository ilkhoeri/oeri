import fs from "fs";
import path from "node:path";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { Node } from "unist";
import { displayName } from "@/source/utils";
import { tocList } from "@/source/routes";

const textTypes = new Set(["text", "emphasis", "strong", "inlineCode"]);

function flattenNode(node: Node): string {
  let text = "";
  visit(node, (child: any) => {
    if (textTypes.has(child.type)) {
      text += child.value;
    }
  });
  return text.trim();
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\*\*|\*/g, "")
    .replace(/`/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function cleanedName(title: string) {
  return displayName(title.replace("undefined", ""));
}

function removeFrontMatter(content: string): string {
  if (content.startsWith("---")) {
    const endIndex = content.indexOf("\n---", 3);
    return endIndex !== -1 ? content.slice(endIndex + 4).trim() : content;
  }
  return content;
}

function extractHeadingsFromFile(filePath: string) {
  let content = fs.readFileSync(filePath, "utf-8");
  content = removeFrontMatter(content);

  const headings: { level: number; title: string }[] = [];

  const ast = remark().parse(content);

  visit(ast, "heading", (node: any) => {
    const title = flattenNode(node);
    if (title && title !== "undefined") {
      headings.push({ level: node.depth, title });
    }
  });

  return headings;
}

// Default mengurutkan ToC sesuai list `tocList`
function generateTableOfContents(files: string[] = tocList) {
  let toc = `# Table of Contents\n\n---\n\n`;

  files.forEach(file => {
    const filePath = path.join("md", `${file}.mdx`);

    // skip, jika file tidak ditemukan
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}, skipping.`);
      return;
    }

    const headings = extractHeadingsFromFile(filePath);
    if (headings.length === 0) return;

    const fileLink = `/${file}`;
    let fileToc = "";

    headings.forEach(heading => {
      const slug = generateSlug(heading.title.replace("undefined", ""));
      const link = `[${cleanedName(heading.title.trimEnd())}](${fileLink}#${slug})`;

      if (heading.level === 1) {
        fileToc += `- [**${cleanedName(heading.title.trimEnd())}**](${fileLink}#${slug})\n`;
      } else {
        const indentation = "  ".repeat(heading.level - 2);
        fileToc += `  ${indentation}- ${link}\n`;
      }
    });

    if (fileToc) {
      toc += fileToc + "";
    }
  });

  console.log("Running Generated List:", files);

  return toc;
}

interface GenerateTocFileProps {
  title: string;
  date: Date | string | number;
}

function generateTocFile({ title, date }: GenerateTocFileProps) {
  try {
    const toc = generateTableOfContents();

    const tocFilePath = path.join("md", "toc.mdx");

    const yamlMetadata = `---\ntitle: ${title}\ndate: ${date}\n---`;
    const content = `${yamlMetadata}\n\n${toc.trim()}\n`;

    fs.writeFileSync(tocFilePath, content, "utf-8");

    console.info(`\n✅ ${title} has been generated at ${tocFilePath}\n`);
  } catch (error) {
    console.error("Error:", `\n${error}\n`);
  }
}

const date = new Intl.DateTimeFormat("en-CA").format(new Date());

generateTocFile({
  title: "Table of Contents",
  date
});
