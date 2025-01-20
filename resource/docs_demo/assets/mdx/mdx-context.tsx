"use client";
import React from "react";
import { getMDXComponent } from "@contentlayer2/core/client";
import { components } from "./mdx-component";
import { createHighlighter } from "shiki";
import { getSlug, sourceFile } from "@/source/utils";
import { getContent, getCssContent } from "@/source/generated/fs-get-contents";
import { ShikiProvider } from "@/resource/docs_demo/assets/shiki/shiki-context";

type FunctionElementType = Extract<ElementType, (props: Record<string, any>) => any>;
type ClassElementType = Extract<ElementType, new (props: Record<string, any>) => any>;
type FunctionComponent<Props> = ElementType extends never
  ? (props: Props) => Element | null
  : FunctionElementType extends never
    ? never
    : (props: Props) => ReturnType<FunctionElementType>;
type ClassComponent<Props> = ElementType extends never
  ? new (props: Props) => JSX.ElementClass
  : ClassElementType extends never
    ? never
    : new (props: Props) => InstanceType<ClassElementType>;
type ElementType = any extends JSX.ElementType ? never : JSX.ElementType;
type StringComponent = Extract<keyof JSX.IntrinsicElements, ElementType extends never ? string : ElementType>;
type Component<Props> = FunctionComponent<Props> | ClassComponent<Props> | StringComponent;
interface NestedMDXComponents {
  [key: string]: NestedMDXComponents | Component<any>;
}
export type MDXComponents = NestedMDXComponents & {
  [Key in StringComponent]?: Component<JSX.IntrinsicElements[Key]>;
} & {
  wrapper?: Component<any>;
};
export interface MDXContentProps {
  [props: string]: unknown;
  components?: MDXComponents;
}

export interface MdxProps {
  code: string;
  segment?: string[];
}

export const useMDXComponent = (code: string, globals: Record<string, unknown> = {}) => {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals]);
};

async function loadShiki() {
  const shiki = await createHighlighter({
    langs: ["ts", "tsx", "css", "scss", "html", "bash", "json"],
    themes: []
  });
  return shiki;
}
async function loadCodes(segment?: string[]) {
  const resource = `/resource/docs/${sourceFile(segment)}`;
  const content = await getContent(resource, [".tsx", ".ts"], undefined, { wrap: false });

  // const git_raw = "https://raw.githubusercontent.com/ilkhoeri/oeri/refs/heads/master";
  return {
    code: {
      // content: content.content || (await getRepo(`${git_raw}/resource/docs/${sourceFile(segment)}`, undefined, { ext: ".tsx" })),
      content: content.content,
      extension: content.extension || ".ts"
    },
    css: await getCssContent(getSlug(segment), { wrap: false })
  };
}

export function MDXComponent({ code, segment }: MdxProps) {
  const Component = useMDXComponent(code, {});
  return (
    <div className="mdx_customizer">
      <ShikiProvider segment={segment} loadCodes={() => loadCodes(segment)} loadShiki={loadShiki}>
        <Component components={components} />
      </ShikiProvider>
    </div>
  );
}
