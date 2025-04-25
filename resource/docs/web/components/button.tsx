import * as React from "react";
import { Loader } from "@/ui/loader";
import { injectComponentIntoFirstChild, PolymorphicSlot } from "@/ui/polymorphic-slot";
import { cn, cvx, type cvxProps } from "cretex";

export type MouseEventButtonType = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type UnstyledButtonProps<Exclude extends string = never> = React.PropsWithoutRef<
  Omit<
    Omit<React.ComponentProps<"button">, "color" | "style"> & {
      asChild?: boolean;
      loading?: boolean;
      color?: React.CSSProperties["color"];
      style?: React.CSSProperties & Record<string, any>;
    },
    Exclude
  >
>;
export const UnstyledButton = React.forwardRef<HTMLButtonElement, UnstyledButtonProps>((_props, ref) => {
  const { asChild = false, type = "button", role = "button", children, loading, disabled, ...props } = _props;

  const Btn = asChild ? PolymorphicSlot : "button";
  const loadingComponent = loading && <Loader size={14} />;
  const enhancedChildren = injectComponentIntoFirstChild(children, loadingComponent);

  return (
    <Btn {...{ ref, type, role, disabled: loading || disabled, ...props }}>
      {asChild ? (
        enhancedChildren
      ) : (
        <>
          {loadingComponent}
          {children}
        </>
      )}
    </Btn>
  );
});
UnstyledButton.displayName = "UnstyledButton";

export const buttonVariants = cvx({
  assign:
    "inline-flex cursor-pointer appearance-none items-center justify-center rounded-lg text-[14px] text-[clamp(0.75rem,0.65rem+0.65vw,0.9rem)] font-medium leading-tight transition-[transform,color,background-color,border-color,text-decoration-color,fill,stroke] duration-75 [-moz-appearance:none] [-webkit-appearance:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[.985] disabled:pointer-events-none disabled:gap-2 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-color text-background border-color focus-visible:ring-color/35 [@media(hover:hover)]:hover:bg-color/90 disabled:opacity-50 disabled:[--spinner-color:hsl(var(--background))]",
      destructive: "bg-destructive text-white border-destructive focus-visible:ring-destructive/35 [@media(hover:hover)]:hover:bg-destructive-foreground",
      constructive: "bg-constructive text-white border-constructive focus-visible:ring-constructive/35 [@media(hover:hover)]:hover:bg-constructive-foreground",
      conservative: "bg-conservative text-white border-conservative focus-visible:ring-conservative/35 [@media(hover:hover)]:hover:bg-conservative-foreground",
      primitive: "bg-primitive text-muted-foreground border border-primitive-emphasis [@media(hover:hover)]:hover:text-color focus-visible:ring-primitive-emphasis/35 [@media(hover:hover)]:hover:bg-accent",
      outline: "bg-background text-muted-foreground focus-visible:ring-muted-foreground/35 border [@media(hover:hover)]:hover:bg-muted/50 [@media(hover:hover)]:hover:text-color",
      ghost: "focus-visible:ring-muted/35 [@media(hover:hover)]:hover:bg-muted text-muted-foreground [@media(hover:hover)]:hover:text-color",
      link: "text-color py-0 px-0 underline-offset-4 active:scale-100 [@media(hover:hover)]:hover:text-constructive [@media(hover:hover)]:hover:underline"
    },
    size: {
      default: "h-8 px-4 py-2",
      sm: "h-8 min-w-8 px-3",
      lg: "h-10 min-w-10 px-8",
      badge: "min-w-[54px] py-1 px-1 z-10 rounded-full text-center text-[12px] font-medium leading-none disabled:gap-[.09375rem]",
      icon: "h-[--sz] w-[--sz] min-h-[--sz,var(--min-sz)] min-w-[--sz,var(--min-sz)] [--sz:2rem] py-1 px-1 border"
    },
    color: {
      default: "",
      base: "text-black dark:text-white bg-[#e6e4e9] dark:bg-[#1a1a1a] [@media(hover:hover)]:hover:bg-[#e2e2e2] dark:[@media(hover:hover)]:hover:bg-[#202020]",
      blue: "bg-[#228be61a] text-[#339af0] border-[#339af0] disabled:[--spinner-color:#339af0] [@media(hover:hover)]:hover:bg-[#228be62a] [@media(hover:hover)]:hover:text-[#3a9def]",
      grape: "bg-[#be4bdb1a] text-[#cc5de8] border-[#cc5de8] disabled:[--spinner-color:#cc5de8] [@media(hover:hover)]:hover:bg-[#be4bdb2a] [@media(hover:hover)]:hover:text-[#da68f6]",
      green: "bg-[#12b8861a] text-[#20c997] border-[#20c997] disabled:[--spinner-color:#20c997] [@media(hover:hover)]:hover:bg-[#12b8862a] [@media(hover:hover)]:hover:text-[#23cf9d]",
      red: "bg-[#fa52521a] text-[#ff6b6b] border-[#ff6b6b] disabled:[--spinner-color:#ff6b6b] [@media(hover:hover)]:hover:bg-[#fa52522a] [@media(hover:hover)]:hover:text-[#fd7171]",
      "gradient-blue": "bg-[linear-gradient(#0dccea,#0d70ea)] text-white disabled:[--spinner-color:white] border-[#0d70ea] [@media(hover:hover)]:hover:bg-[linear-gradient(#0dccea,#0d70ea)]",
      "gradient-orange": "bg-[linear-gradient(-180deg,#FF7E31,#E62C03)] text-white disabled:[--spinner-color:white] border-[#E62C03] [@media(hover:hover)]:hover:bg-[#d4d3d5]",
      "outline-base": "outline-2 outline outline-slate-500 bg-slate-500/20 text-slate-600 disabled:[--spinner-color:#475569] [@media(hover:hover)]:hover:bg-slate-600/20",
      "outline-indigo": "outline-2 outline outline-indigo-500 bg-indigo-500/20 text-indigo-600 disabled:[--spinner-color:#4f46e5] [@media(hover:hover)]:hover:bg-indigo-600/20",
      "outline-teal": "outline-2 outline outline-teal-500 bg-teal-500/20 text-teal-600 disabled:[--spinner-color:#0d9488] [@media(hover:hover)]:hover:bg-teal-600/20"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

type Variants = cvxProps<typeof buttonVariants> & { unstyled?: boolean };
export function buttonStyle(variants?: Variants, className?: string) {
  return cn(!variants?.unstyled && buttonVariants({ ...variants }), className);
}

export interface ButtonProps extends UnstyledButtonProps<"color">, cvxProps<typeof buttonVariants> {
  unstyled?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((_props, ref) => {
  const { unstyled, className, variant = "default", color, size, ...props } = _props;
  return <UnstyledButton {...{ ref, className: buttonStyle({ color, size, unstyled, variant }, className), ...props }} />;
});
Button.displayName = "Button";
