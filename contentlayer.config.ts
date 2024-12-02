import {
  defineDocumentType,
  defineNestedType,
  makeSource,
  type ComputedFields
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { getHighlighter } from "@shikijs/compat";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeStringify from "rehype-stringify";

import moonlightTheme from "./source/md/moonlight.json" with { type: "json" };
import {
  generateRawToJson
  // generateNameFilesToJson
} from "./source/generated/generated";

generateRawToJson(
  "resource/docs/icons",
  ".contentlayer/generated/resources/icons.json"
);

/**
 *- `URL`: https://example.com/blog/posts/article-1
 *- `Path`: /blog/posts/article-1
 *- `Segment`: blog | posts | article-1
 *- `Slug`: article-1 (last of segment)
 */
export const computedFields: ComputedFields = {
  path: {
    type: "string",
    resolve: doc => `${doc._raw.flattenedPath}`
  },
  // slugAsParams change of nested routes become single route
  slug: {
    type: "string",
    resolve: doc => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  url: {
    type: "string",
    resolve: doc => `/docs/${doc._raw.flattenedPath}`
  }
};

const Related = defineNestedType(() => ({
  name: "Related",
  fields: {
    label: { type: "string" },
    link: { type: "string" }
  }
}));

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    doc: {
      type: "string"
    },
    related: {
      type: "list",
      of: Related
    }
  }
}));

const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    summary: {
      type: "string",
      required: true
    },
    links: {
      type: "nested",
      of: LinksProperties
    },
    featured: {
      type: "boolean",
      default: false,
      required: false
    },
    component: {
      type: "boolean",
      default: false,
      required: false
    },
    toc: {
      type: "boolean",
      default: true,
      required: false
    }
  },
  computedFields
}));

export default makeSource({
  contentDirPath: "resource/docs_raw",
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      //rehypeComponent,
      () => tree => {
        visit(tree, node => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") return;

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, "");
              }
            }

            node.__rawString__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src__;
            node.__style__ = node.properties?.__style__;
          }
        });
      },
      rehypeStringify,
      [
        rehypePrettyCode,
        {
          grid: true,
          theme: moonlightTheme,
          keepBackground: false,
          tokensMap: {
            fn: "entity.name.function"
          },

          // transformers: [
          //   transformerCopyButton({
          //     visibility: "hover",
          //     feedbackDuration: 3_000
          //   })
          // ],
          getHighlighter,
          // filterMetaString: (string: any) => string.replace(/filename="[^"]*"/, "")
          // onclick="navigator.clipboard.writeText(this.attributes.data.value);this.classList.add('rehype-pretty-copied');window.setTimeout(() => this.classList.remove('rehype-pretty-copied'), 3000);"

          // theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      () => tree => {
        visit(tree, node => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }

            preElement.properties["__withMeta__"] =
              node.children.at(0).tagName === "figure";
            preElement.properties["__rawString__"] = node.__rawString__;

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }

            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }

            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
      // rehypeNpmCommand,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [
              "subheading-anchor",
              "anchor_id text-color flex flex-row-reverse items-center gap-2"
            ],
            ariaLabel: "Link to section"
          },
          content: [
            {
              type: "element",
              tagName: "svg",
              properties: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "26",
                height: "26",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                className: ""
              },
              children: [
                {
                  type: "element",
                  tagName: "path",
                  properties: {
                    d: "M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                  }
                }
              ]
            }
          ]
        }
      ]
    ]
  }
});

// generateNameFilesToJson(
//   "resource/docs/icons",
//   ".contentlayer/generated/resources/icons.json"
// );
