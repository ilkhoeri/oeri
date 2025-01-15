import * as React from "react";
import { cn, cvx, type cvxProps } from "str-merge";

const classes = cvx({
  variants: {
    variant: {
      default: "font-mono leading-none font-bold border border-solid border-b-[.1875rem] border-muted bg-muted/60 text-color [unicode-bidi:embed]",
      primitive:
        "inline-flex items-center justify-center shrink-0 font-geist-mono font-normal align-text-top whitespace-nowrap select-none relative top-[-.03em] text-xs min-w-7 leading-7 box-border pb-[.05em] [word-spacing:-.1em] tracking-normal h-fit text-color bg-primitive [transition:box-shadow_.12s,background-color_.12s] [box-shadow:inset_0_-0.05em_0.5em_hsl(var(--muted-foreground)/0.08),inset_0_0.05em_#f1f7feb5,inset_0_0.25em_0.5em_hsl(var(--muted-foreground)/0.17),inset_0_-0.1em_hsl(var(--background)/0.9),0_0_0_0.075em_hsl(var(--muted-foreground)/0.25),0_0.08em_0.17em_hsl(var(--background)/0.95)]"
    },
    size: {
      xs: "text-[.625rem] py-[0rem] px-[.25rem] rounded border-0 border-b-0",
      sm: "text-[.75rem] py-[.0625rem] px-[.3125rem] rounded-[.375rem]",
      md: "text-[.875rem] py-[.125rem] px-[.4375rem] rounded-[.5rem]",
      lg: "text-[1rem] py-[.1875rem] px-[.5625rem] rounded-[.625rem]",
      xl: "text-[1.25rem] py-[.25rem] px-[.875rem] rounded-[.625rem]"
    }
  }
});

export interface KbdProps extends React.PropsWithoutRef<Omit<React.ComponentProps<"kbd">, "style">>, cvxProps<typeof classes> {
  unstyled?: boolean;
  style?: React.CSSProperties & Record<string, any>;
  items?:string[];
  separator?: React.ReactNode | ((index: number) => React.ReactNode);
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>((_props, ref) => {
  const { children, unstyled, className, size = "sm", variant = "default", items, separator = "+", ...props } = _props;
  const rest = { ref, className: cn(!unstyled && classes({ size, variant }), className), ...props };

  if (items) {
    return items.reduce<React.ReactNode[]>((acc, item, index) => {
      acc.push(
        <Kbd key={`kbd-${index}`} {...rest}>
          {item}
        </Kbd>
      );
      if (index < items.length - 1) {
        const sparators = typeof separator === "function" ? separator?.(index) : separator;
        acc.push(<React.Fragment key={`separator-${index}`}>{sparators}</React.Fragment>);
      }
      return acc;
    }, []);
  }
  return <kbd {...rest}>{children}</kbd>;
});
Kbd.displayName = "Kbd";

/**
 * Memisahkan string menjadi items dan separators berdasarkan ekspresi reguler.
 *
 * @param kbd String yang akan diproses (contoh: "alt+mod+shift+X").
 * @param regexp Ekspresi reguler untuk memisahkan items dan separators (default: /[^+\/\|,]+|[+\/\|,]/g).
 * @returns Tuple berisi array items dan separators.
 */
export function kbdMatcher(kbd: string, regexp: string | RegExp = /[^+\/\|,]+|[+\/\|,]/g): readonly [string[], string[]] {
  const input = kbd.match(regexp) || [];
  const items = input.filter((_, index) => index % 2 === 0);
  const separators = input.filter((_, index) => index % 2 !== 0);
  return [items, separators] as const;
}
