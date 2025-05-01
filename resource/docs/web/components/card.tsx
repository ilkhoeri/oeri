"use client";
import * as React from "react";
import { cn, cvx, inferType, type cvxProps } from "cretex";

const classes = cvx({
  variants: {
    selector: {
      root: "relative rounded-lg border bg-background text-muted-foreground shadow-sm",
      header: "flex flex-col space-y-1.5 p-6",
      title: "text-2xl font-semibold leading-none tracking-tight",
      description: "text-sm text-muted-foreground",
      content: "p-6 pt-0",
      footer: "flex items-center p-6 pt-0"
    }
  }
});

type __CardSelector = NonNullable<cvxProps<typeof classes>["selector"]>;
type Options = StylesNames<__CardSelector> & {};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<NestedRecord<Styles, T> & { className?: string; style?: CSSProperties }, Exclude>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__CardSelector> & {
  color?: React.CSSProperties["color"];
} & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;

type CtxProps = {
  getStyles(selector: __CardSelector, options?: StylesNames<__CardSelector>): inferType<typeof getStyles>;
} & NestedRecord<Styles, __CardSelector>;

function getStyles(selector: __CardSelector, options?: Options) {
  return {
    "data-card": cn(selector),
    className: cn(!options?.unstyled?.[selector] && classes({ selector }), options?.classNames?.[selector], options?.className),
    style: { ...options?.styles?.[selector], ...options?.style }
  };
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useCard = () => React.useContext(ctx)!;

const Edge = React.forwardRef<HTMLDivElement, ComponentProps<"div"> & { selector: __CardSelector }>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, selector, ...props } = _props;
  const ctx = useCard();
  const Cmp: React.ElementType = selector === "title" ? "h3" : "div";
  const _getStyles = ctx?.getStyles ?? getStyles;
  const stylesApi = { unstyled: ctx?.unstyled ?? unstyled, classNames: ctx?.classNames ?? classNames, styles: ctx?.styles ?? styles };
  return <Cmp {...{ ref, ..._getStyles(selector, { className, style, ...stylesApi }), ...props }} />;
});
Edge.displayName = "Card/Edge";

export const CardHeader = React.forwardRef<HTMLDivElement, ComponentProps<"div">>((props, ref) => <Edge {...{ ref, selector: "header", ...props }} />);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, ComponentProps<"h3">>((props, ref) => <Edge {...{ ref, selector: "title", ...props }} />);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, ComponentProps<"p">>((props, ref) => <Edge {...{ ref, selector: "description", ...props }} />);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, ComponentProps<"div">>((props, ref) => <Edge {...{ ref, selector: "content", ...props }} />);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, ComponentProps<"div">>((props, ref) => <Edge {...{ ref, selector: "footer", ...props }} />);
CardFooter.displayName = "CardFooter";

export interface CardProps extends ComponentProps<"div", "content"> {
  title?: string;
}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(_props, ref) {
  const { children, unstyled, classNames, styles, ...props } = _props;
  // const childrens = React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { unstyled, classNames, styles }) // Forward classNames : child);
  return (
    <ctx.Provider value={{ getStyles, unstyled, classNames, styles }}>
      <Edge {...{ ref, selector: "root", unstyled, classNames, styles, ...props }}>{children}</Edge>
    </ctx.Provider>
  );
}) as CardComponent;
Card.displayName = "Card";

// Export as a composite component
type ForwardRef<T extends React.ElementType, Props> = React.ForwardRefExoticComponent<{ ref?: React.ComponentPropsWithRef<T>["ref"] } & Props>;
type CardComponent = ForwardRef<"div", CardProps> & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};
// Attach sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
