import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { Root, RootContent, ListItem, Text } from "mdast";

const textTypes = new Set(["text", "emphasis", "strong", "inlineCode"]);

function flattenNode(node: RootContent): string {
  const result: string[] = [];

  visit(node, child => {
    if (textTypes.has(child.type as string) && "value" in child) {
      result.push((child as Text).value);
    }
  });

  return result.join("");
}

export interface Item {
  title: string;
  url: string;
  items?: Item[];
}

export type TableOfContents = {
  items?: Item[];
};

function getItems(node: any): Item | Item[] | undefined {
  if (!node) return;

  switch (node.type) {
    case "paragraph": {
      const item: Item = { title: "", url: "" };

      visit(node, child => {
        if (child.type === "link") {
          item.url = child.url;
          item.title = flattenNode(node);
        } else if (child.type === "text") {
          item.title ||= flattenNode(node);
        }
      });

      return item;
    }

    case "list":
      return node.children.map((child: ListItem) => getItems(child)).filter(Boolean) as Item[];

    case "listItem": {
      const [first, second] = node.children;
      const item = getItems(first) as Item;

      if (second) {
        const subItems = getItems(second);
        if (Array.isArray(subItems) && subItems.length > 0) {
          item.items = subItems;
        }
      }

      return item;
    }

    default:
      return;
  }
}

const getToc = () => (node: Root, file: any) => {
  const table = toc(node);
  const items = getItems(table.map);

  file.data = { items: Array.isArray(items) ? items : [items] };
};

export async function getTableOfContents(raw: string | null | undefined): Promise<TableOfContents> {
  const result = await remark()
    .use(getToc)
    .process(raw ?? "");
  return result.data as TableOfContents;
}
