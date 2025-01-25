import * as React from "react";
import { merge, cvx, type cvxProps } from "cretex";

const classes = cvx({
  variants: {
    prose: {
      h1: "scroll-m-20 text-[clamp(2rem,1rem+4vw,2.75rem)] leading-[clamp(2rem,1rem+4vw,4.25rem)] font-extrabold tracking-tight",
      h2: "scroll-m-20 text-[clamp(1.25rem,0.75rem+4vw,2.25rem)] leading-9 font-bold tracking-tight pb-2 first:mt-0",
      h3: "scroll-m-20 text-[clamp(1.125rem,11px+3.5vw,1.875rem)] leading-9 font-bold tracking-normal",
      h4: "scroll-m-20 text-[clamp(1.1875rem,0.75rem+3vw,1.5rem)] leading-7 font-semibold tracking-tight",
      h5: "scroll-m-20 text-[clamp(1rem,0.75rem+2vw,1.25rem)] leading-6 font-medium tracking-tight",
      h6: "scroll-m-20 text-[clamp(0.9375rem,0.75rem+2vw,1.125rem)] leading-4 font-medium tracking-tight",
      label: "mr-auto w-full text-sm text-muted-foreground [&:not(:first-child)]:mt-4 rtl:ml-auto rtl:mr-0",
      p: "leading-7 [&:not(:first-child)]:mt-4",
      span: "mt-1 w-full text-start text-sm text-muted-foreground first-of-type:mt-8",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      ol: "my-5 ml-5 pl-5 list-decimal marker:font-normal [&:has(+ul)]:mb-0 [&:has(+ul)+ul]:my-0 [&:has(+ul)+ul]:ml-10 [&>li]:mt-2",
      ul: "my-5 ml-5 pl-5 list-disc marker:font-normal [&>li]:mt-2 [&>li]:whitespace-pre-wrap",
      li: "list-item [text-align:-webkit-match-parent] [unicode-bidi:isolate] leading-normal",
      code: "relative rounded bg-muted/60 border border-solid border-border px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
      kbd: "text-[calc(.85em*1)] rounded py-[calc(.15em*1)] px-[calc(.35em*1)] text-color [--shadow:hsl(var(--border))] [box-shadow:0_0_0_.0625em_var(--shadow),0_.09375em_0_.0625em_var(--shadow)]",
      em: "italic",
      hr: "my-3 h-0 w-full border-t border-solid border-border",
      lead: "text-xl text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      blockquote: "my-5 border-l-4 pl-6 rtl:border-l-0 rtl:pl-0 rtl:border-r-4 rtl:pr-6 italic"
    }
  }
});

export type TypographyProps<T extends React.ElementType = "div"> = React.PropsWithoutRef<React.ComponentProps<T>> & {
  el?: T | React.ElementType;
  unstyled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties & Record<string, any>;
  ref?: React.ComponentPropsWithRef<T>["ref"];
} & cvxProps<typeof classes>;

type TypographyElement = <T extends React.ElementType = "div">(_props: TypographyProps<T>) => React.ReactElement;

export const Typography = React.forwardRef(function Typography<T extends React.ElementType>(
  _props: Omit<TypographyProps<T>, "ref">,
  ref: React.ComponentPropsWithRef<T>["ref"]
) {
  const { el, unstyled, className, prose, ...props } = _props;
  const proseElm = ["large", "lead", "muted"].includes(prose as string) ? "div" : prose;
  const Component = (el || proseElm || "div") as React.ElementType;
  return <Component {...{ ref, className: merge(!unstyled && classes({ prose }), className), ...props }} />;
}) as TypographyElement;
