import * as React from "react";
import { cn } from "@/utils/cn";

type __Selector = "root" | "highlight";
type Options = StylesNames<__Selector> & {};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<NestedRecord<Styles, T> & { color?: React.CSSProperties["color"]; className?: string; style?: CSSProperties }, Exclude>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__Selector> & {} & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;

function getStyles(selector: __Selector, options: Options = {}) {
  return {
    className: cn({ "[&_mark]:bg-[--highlight-bg,yellow] [&_mark]:rounded-[2px]": selector === "root" }, options?.classNames?.[selector], options?.className),
    style: {
      "--highlight-bg": selector === "root" ? options?.color : undefined,
      ...options?.styles?.[selector],
      ...options?.style
    }
  };
}
interface __HighlightProps {
  text?: string;
  children?: string;
  highlight?: string | string[];
}
export type HighlightProps<T extends React.ElementType = "p"> = ComponentProps<T, "children"> &
  __HighlightProps & {
    el?: T;
  };

export const Highlight = React.forwardRef(function Highlight<T extends React.ElementType>(_props: HighlightProps<T>, ref: React.ComponentPropsWithRef<T>["ref"]) {
  const { el, className, classNames, style, styles, children, text = "", highlight = "", color = "#fcc419", ...props } = _props;
  const Root = (el || "p") as React.ElementType;
  const highlightChunks = highlighter(children || text, highlight);

  return (
    <Root
      {...{
        ref,
        ...getStyles("root", { className, classNames, style, styles, color }),
        ...props
      }}
    >
      {highlightChunks.map(({ chunk, highlighted }, _i) =>
        highlighted ? (
          <mark key={_i} {...getStyles("highlight", { classNames, styles })}>
            {chunk}
          </mark>
        ) : (
          chunk // Part without highlight.
        )
      )}
    </Root>
  );
}) as <T extends React.ElementType>(
  _props: HighlightProps<T> & {
    ref?: React.ComponentPropsWithRef<T>["ref"];
  }
) => React.ReactElement;

function escapeRegex(value: string) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
}

export function highlighter(value: string, _highlight: string | string[]) {
  if (_highlight == null) {
    return [{ chunk: value, highlighted: false }];
  }

  const highlight = Array.isArray(_highlight) ? _highlight.map(escapeRegex) : escapeRegex(_highlight);

  const shouldHighlight = Array.isArray(highlight) ? highlight.filter(part => part.trim().length > 0).length > 0 : highlight.trim() !== "";

  if (!shouldHighlight) {
    return [{ chunk: value, highlighted: false }];
  }

  const matcher =
    typeof highlight === "string"
      ? highlight.trim()
      : highlight
          .filter(part => part.trim().length !== 0)
          .map(part => part.trim())
          .sort((a, b) => b.length - a.length)
          .join("|");

  const re = new RegExp(`(${matcher})`, "gi");
  const chunks = value
    .split(re)
    .map(part => ({ chunk: part, highlighted: re.test(part) }))
    .filter(({ chunk }) => chunk);

  return chunks;
}
