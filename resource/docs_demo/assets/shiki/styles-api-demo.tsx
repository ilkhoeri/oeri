"use client";
import { cloneElement, useState } from "react";
import { DemoRoot } from "../demo-component";
import { UnstyledButton } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { DemoAreaProps, DemoCode, DemoColumns } from "../demo-component";

export interface StylesApiDemoProps extends DemoAreaProps {
  data: { selectors: Record<string, string> };
  code: string;
}

function getCss(hovered: string | null) {
  return hovered ? `.${hovered} {\n  outline: 2px solid #fe0d45;\n  outline-offset: -2px; \n}\n` : "/*\n * Hover over selectors to apply outline styles\n *\n */";
}

export function StylesApiDemo({ data, code, withPadding, maxWidth, centered, children, dimmed, striped }: StylesApiDemoProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const selectors = Object.keys(data.selectors);
  const controls = selectors.map(selector => (
    <UnstyledButton className="block w-full cursor-help rounded-[.25rem] px-[.75rem] py-[.375rem] text-[.875rem] hover:bg-background-box" key={selector} onMouseEnter={() => setHovered(selector)} onMouseLeave={() => setHovered(null)}>
      <Typography className="mb-[.125rem]">{selector}</Typography>
      <Typography className="text-[.6875rem] text-muted-foreground">{data.selectors[selector]}</Typography>
    </UnstyledButton>
  ));

  const classNamesProp = hovered ? ` classNames={{ ${hovered}: classes.${hovered} }}` : "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: getCss(hovered) }} />
      <DemoRoot>
        <DemoColumns withPadding={withPadding} maxWidth={maxWidth} centered={centered} controls={controls} dimmed={dimmed} striped={striped} title="Component Styles API" description="Hover over selectors to highlight corresponding elements">
          {cloneElement(children as React.JSX.Element, {
            classNames: selectors.reduce<Record<string, string>>((acc, item) => {
              acc[item] = item;
              return acc;
            }, {})
          })}
        </DemoColumns>

        <DemoCode
          code={[
            { fileName: "Demo.module.css", language: "scss", code: getCss(hovered) },
            {
              fileName: "Demo.tsx",
              language: "tsx",
              code: code.replace("{{props}}", classNamesProp)
            }
          ]}
        />
      </DemoRoot>
    </>
  );
}
