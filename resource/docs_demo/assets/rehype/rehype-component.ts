// import fs from "fs";
// import path from "path";
// import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { UnistNode, UnistTree } from "../mdx/unist";

import { sourceCodes } from "@/scripts/generated-source-codes";
import { fileDocsWeb } from "./files-docs";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, "resource") as {
          name: string;
          value?: string;
          type?: string;
        }) || {};

      if (node.name === "SourceCodes") {
        // const categories = getNodeAttributeByName(node, "categories")?.value as string[];
        const name = getNodeAttributeByName(node, "name")?.value as string;
        // const fileName = getNodeAttributeByName(node, "fileName")?.value as string | undefined;
        const fd = fileDocsWeb.find(obj => obj.name === name);
        // log.info(content.css);

        if ((!name && !srcPath) || !fd) {
          return null;
        }
        const content = sourceCodes([...fd.segment, name]);

        // const rsrcFolder = path.resolve("resource/docs/web/components");
        // const files = fs.readdirSync(rsrcFolder).filter(file => /.*?ts/.test(file));

        try {
          if (content.code) {
            // node.children?.push(
            //   u("element", {
            //     tagName: "pre",
            //     properties: {
            //       // __src__: src,
            //       // __style__: style.name
            //       className: "m-0 block leading-[0] p-[var(--pre-p,.625rem_1rem)] [--code-line-height:--code-leading,1.7]"
            //     },
            //     // attributes: [
            //     //   {
            //     //     name: "styleName",
            //     //     type: "mdxJsxAttribute",
            //     //     value: style.name
            //     //   }
            //     // ],
            //     children: [
            //       u("element", {
            //         tagName: "code",
            //         properties: {
            //           className: [
            //             "language-tsx",
            //             "inline-block rounded-[.125rem] p-[var(--code-p,.0625rem_.1875rem)] font-mono [font-size:var(--code-fz,.8125rem)] leading-[--code-line-height,1.55]"
            //           ]
            //           // className:
            //         },
            //         children: [
            //           {
            //             type: "text",
            //             value: `${content.code}`
            //           }
            //         ]
            //       })
            //     ]
            //   })
            // );
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
