import React from "react";
import { merge, rem } from "str-merge";
import { Typography } from "@/ui/typography";
import { getCodeFileIcon } from "./shiki/shiki-code-get-icon";
import { CodeHighlightTabs, CodeHighlightTabsCode, CodeHighlightTabsProps } from "./shiki/shiki-code-highlight-tabs";
import { ComponentProps } from "./types/component";

function set<K, T>(state: K, s: T) {
  return (state as K) ? (s as T) : undefined;
}
function is<T>(state: T) {
  return set(state as T, "true");
}

export interface DemoRootProps extends ComponentProps<"div"> {
  title?: string;
}
export function DemoRoot(_props: DemoRootProps) {
  const { className, style, ...others } = _props;
  return (
    <div className={merge("mb-20 rounded-[.5rem] border border-solid border-[--demo-border] [--demo-border:hsl(var(--border))]", className)} {...others} />
  );
}

type DemoColumnsTrees = "root" | "controls" | "title" | "wrapTitle" | "description";
export type DemoColumnsProps = DemoAreaProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  controls: React.ReactNode;
  classNames?: Partial<Record<DemoColumnsTrees, string>>;
};
export function DemoColumns(_props: DemoColumnsProps) {
  const { children, withPadding, centered, maxWidth, minHeight, title, description, controls, dimmed, striped, className, classNames, orientation } = _props;
  return (
    <div
      className={merge(
        "flex flex-row [--demo-border:hsl(var(--border))] rtl:flex-row-reverse [@media(max-width:55em)]:flex-col [@media_not_all_and_(max-width:55em)]:[--basis:13.625rem]",
        classNames?.root
      )}
    >
      <DemoArea {...{ withPadding, maxWidth, minHeight, centered, dimmed, striped, className, classNames, orientation }}>{children}</DemoArea>

      <div
        className={merge(
          "flex-[0_0_var(--basis)] border-l border-solid border-[--demo-border] p-[.25rem] pb-[.625rem] rtl:border-l-0 rtl:border-r [@media(max-width:55em)]:!border-x-0 [@media(max-width:55em)]:border-t",
          classNames?.controls
        )}
      >
        {title && (
          <div
            className={merge(
              "mx-[-.25rem] mb-[.625rem] border-b border-solid border-[--demo-border] px-[1rem] pb-[.625rem] pt-[calc(1rem-.25rem)]",
              classNames?.wrapTitle
            )}
          >
            <Typography prose="span" className={merge("mb-[.3125rem] font-medium", classNames?.title)}>
              {title}
            </Typography>
            {description && (
              <Typography prose="span" className={merge("text-[.6875rem] leading-[1.45] text-muted-foreground", classNames?.description)}>
                {description}
              </Typography>
            )}
          </div>
        )}

        {controls}
      </div>
    </div>
  );
}

export interface CodeDemoProps extends DemoCodeProps, DemoAreaProps {}
export function CodeDemo(_props: CodeDemoProps) {
  const { code, children, withPadding, centered, defaultExpanded = true, maxWidth, minHeight, dimmed, striped, className, classNames, orientation } = _props;
  return (
    <DemoRoot>
      <DemoArea {...{ withPadding, centered, maxWidth, minHeight, dimmed, striped, className, classNames, orientation }}>{children}</DemoArea>
      <DemoCode {...{ code, defaultExpanded }} />
    </DemoRoot>
  );
}

export interface DemoCodeProps {
  code?: string | CodeHighlightTabsCode | CodeHighlightTabsCode[];
  defaultExpanded?: boolean;
}
export function DemoCode(_props: DemoCodeProps & Omit<CodeHighlightTabsProps, keyof DemoCodeProps>) {
  const { code, defaultExpanded = true, withExpandButton = true, code: _, className, ...props } = _props;
  const _code: CodeHighlightTabsCode | CodeHighlightTabsCode[] | undefined = typeof code === "string" ? { code, fileName: "Demo.tsx", language: "tsx" } : code;

  return _code ? (
    <CodeHighlightTabs
      className={merge("overflow-hidden rounded-b-[.5rem] border-t border-solid border-[--demo-border]", className, props.classNames?.root)}
      {...{ code: _code, withExpandButton, defaultExpanded, getFileIcon: getCodeFileIcon, ...props }}
    />
  ) : null;
}

export interface DemoAreaProps {
  children?: React.ReactNode;
  withPadding?: boolean;
  centered?: boolean;
  maxWidth?: number | string;
  minHeight?: number | string;
  dimmed?: boolean;
  striped?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
  classNames?: Partial<Record<"demoArea" | "demoInner", string>>;
}
export function DemoArea(_props: DemoAreaProps) {
  const { withPadding = true, centered = true, maxWidth, minHeight, children, dimmed, striped, className, classNames, orientation } = _props;
  return (
    <div
      data-demo-area=""
      data-dimmed={is(dimmed)}
      data-striped={is(striped)}
      data-centered={is(centered)}
      data-with-padding={is(withPadding)}
      data-orientation={orientation}
      className={merge(
        "max-w-[calc(100%-var(--basis,0))] flex-1 overflow-hidden rounded-t-[calc(.5rem-.0625rem)] data-[centered]:flex data-[centered]:items-center data-[centered]:justify-center data-[dimmed]:bg-muted data-[with-padding]:p-4",
        {
          "data-[striped]:rounded-tl-[calc(.5rem-.0625rem)] data-[striped]:[--stripe-color:#00000008] data-[striped]:dark:[--stripe-color:#ffffff08]": striped
        },
        classNames?.demoArea,
        className
      )}
      {...{
        style: {
          "--demo-flex": set(maxWidth, "1"),
          "--demo-max-width": set(maxWidth, rem(maxWidth)),
          "--demo-min-height": set(minHeight, rem(minHeight)),
          "--demo-margin-y": set(maxWidth && centered, "auto"),
          background: striped
            ? "repeating-linear-gradient(45deg, transparent 0, transparent 10px, var(--stripe-color) 10px, var(--stripe-color) 12px), repeating-linear-gradient(135deg, transparent 0, transparent 10px, var(--stripe-color) 10px, var(--stripe-color) 12px)"
            : undefined
        } as React.CSSProperties
      }}
    >
      <div
        className={merge("mx-[--demo-margin-y,unset] min-h-[--demo-min-height,unset] max-w-[--demo-max-width,100%] flex-[--demo-flex]", classNames?.demoInner)}
      >
        {children}
      </div>
    </div>
  );
}
