import { visit } from "unist-util-visit";
import { UnistNode, UnistTree } from "../mdx/unist";
import { sourceCodes } from "@/scripts/generated-source-codes";
import { fileDocsMeta } from "@/resource/docs_demo/generated/files-meta-docs";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const { value: srcPath } =
        (getNodeAttributeByName(node, "resource") as {
          name: string;
          value?: string;
          type?: string;
        }) || {};

      if (node.name === "SourceCodes") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fd = fileDocsMeta.find(obj => obj.name === name);

        if ((!name && !srcPath) || !fd) {
          return null;
        }

        try {
          const content = sourceCodes([...fd.segment, name]);

          if (content.code) {
            node.attributes?.push(
              {
                name: "code",
                type: "mdxJsxAttribute",
                value: `${content.code}`
              },
              {
                name: "ext",
                type: "mdxJsxAttribute",
                value: `${fd.ext}`
              },
              {
                name: "repo",
                type: "mdxJsxAttribute",
                value: `${fd.segment?.join("/")}/${name}${fd.ext}`
              }
            );
          }
          if (content.css) {
            node.attributes?.push({
              name: "css",
              type: "mdxJsxAttribute",
              value: content.css
            });
          }
        } catch (_e) {}
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find(attribute => attribute.name === name);
}
