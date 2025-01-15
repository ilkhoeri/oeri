"use client";
import * as React from "react";
import { cn, cvx, inferType, rem } from "str-merge";

const classes = cvx({
  variants: {
    selector: {
      root: "stylelayer-table rounded-lg",
      table: "w-max text-sm table",
      thead: "thead",
      tbody: "tbody",
      tfoot: "tfoot",
      tr: "tr",
      th: "th",
      td: "td",
      caption: "caption",
      trhead: "tr",
      trbody: "tr",
      tdbody: "td",
      trfoot: "tr",
      tdfoot: "td"
    }
  }
});

type CSSProperties = React.CSSProperties & { [key: string]: any };
type P1 = "root" | "table" | "thead" | "trhead" | "tr" | "td" | "tbody" | "tfoot" | "trfoot" | "caption";
type P2 = "th" | "trbody" | "tdbody" | "tdfoot";
type __Selector = P1 | P2;
type PropsStyles = { index?: number };
export type __TDStNms<P1 extends string, P2 extends string, Key> = Partial<Record<P1, Key>> & Partial<Record<P2, Key | ((index: number) => Key)>>;
type StylesNames = {
  className?: string;
  style?: CSSProperties;
  unstyled?: __TDStNms<P1, P2, boolean>;
  classNames?: __TDStNms<P1, P2, string>;
  styles?: __TDStNms<P1, P2, CSSProperties>;
};
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames & {
  propsStyles?: PropsStyles;
  selector?: __Selector;
  color?: React.CSSProperties["color"];
} & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;
type Options = StylesNames & __TableProps & {};
type DataAttributes = Record<string, any>;
type Attributes = { [key: string]: boolean | string | undefined };
function createDataAttr(attributes: Attributes): DataAttributes {
  return Object.fromEntries(
    Object.entries(attributes)
      .filter(([, value]) => value)
      .map(([key, value]) => [key, value ? "true" : undefined])
  );
}
function getStyles(selector: __Selector, options: Options = {}, propsStyles: PropsStyles = {}) {
  const classNames = options?.classNames?.[selector];
  const styles = options?.styles?.[selector];
  const unstyled = options.unstyled?.[selector];
  const defaultIndex = propsStyles.index ?? 0;
  const computedClassName = typeof classNames === "function" ? classNames?.(defaultIndex) : classNames;
  const computedStyle = typeof styles === "function" ? styles?.(defaultIndex) : styles;
  const computedUnstyled = typeof unstyled === "function" ? unstyled?.(defaultIndex) : unstyled;

  return {
    "data-table": cn(selector),
    "data-striped": selector.includes("tr") ? options?.striped : undefined,
    "data-variant": selector === "table" ? options?.variant : undefined,
    "data-side": selector === "caption" ? options?.captionSide : undefined,
    ...createDataAttr({
      "data-table-border": selector === "root" && options?.withTableBorder,
      "data-table-overflow": selector === "root" && options?.tableOverflow,
      "data-column-border": selector === "root" && options?.withColumnBorders,
      "data-row-border": selector === "root" && options?.withRowBorders,
      "data-sticky": selector === "thead" && options?.stickyHeader,
      "data-hover": selector.includes("tr") && options?.highlightOnHover
    }),
    className: cn(!computedUnstyled && classes({ selector }), computedClassName, options?.className),
    style: { ...computedStyle, ...options?.style }
  };
}

type CtxProps = __TableProps & {
  getStyles(selector: __Selector, options?: Options, propsStyles?: PropsStyles): inferType<typeof getStyles>;
};
const ctx = React.createContext<CtxProps | undefined>(undefined);
const useTable = () => React.useContext(ctx)!;

export interface TableDataProps {
  head?: React.ReactNode[];
  body?: React.ReactNode[][];
  foot?: React.ReactNode[];
  caption?: React.ReactNode;
}

export interface __TableProps {
  tableOverflow?: boolean;
  stickyHeader?: boolean;
  highlightOnHover?: boolean;
  withTableBorder?: boolean;
  withColumnBorders?: boolean;
  withRowBorders?: boolean;
  captionSide?: "top" | "bottom";
  variant?: "vertical" | "horizontal";
  striped?: boolean | "odd" | "even";
}
interface IntrinsicTableProps extends ComponentProps<"table", "selector" | "propsStyles"> {
  layout?: React.CSSProperties["tableLayout"];
  spacing?: { x?: number | string; y?: number | string };
  highlightOnHoverColor?: React.CSSProperties["color"];
  stickyHeaderOffset?: number | string;
  borderColor?: React.CSSProperties["color"];
  stripedColor?: React.CSSProperties["color"];
}

export interface TableProps extends __TableProps, IntrinsicTableProps {
  data?: TableDataProps;
}
export const Table = React.forwardRef<HTMLTableElement, TableProps>((_props, ref) => {
  const { unstyled, classNames, styles, striped, children, stickyHeader, variant = "vertical", captionSide = "bottom", tableOverflow = true, withRowBorders = true, withTableBorder = true, highlightOnHover = true, withColumnBorders = false, data, ...props } = _props;
  return (
    <ctx.Provider
      value={{
        getStyles,
        variant,
        stickyHeader,
        highlightOnHover,
        withColumnBorders,
        withRowBorders,
        withTableBorder,
        tableOverflow,
        captionSide,
        striped: striped === true ? "odd" : striped || undefined
      }}
    >
      <TableRoot {...{ ref, unstyled, classNames, styles, ...props }}>
        {children || (!!data && <TableDataRenderer {...{ data, unstyled, classNames, styles }} />)}
      </TableRoot>
    </ctx.Provider>
  );
}) as TableComponent;
Table.displayName = "Table";

export interface TableDataRendererProps extends StylesNames {
  data: TableDataProps;
}
export function TableDataRenderer(_props: TableDataRendererProps) {
  const { data, ...rest } = _props;
  return (
    <>
      {data.caption && <TableCaption {...rest}>{data.caption}</TableCaption>}

      {data.head && (
        <TableHeader {...rest}>
          <TableRow {...rest}>
            {data.head.map((item, index) => (
              <TableHead key={index} propsStyles={{ index }} {...rest}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}

      {data.body && (
        <TableBody {...rest}>
          {data.body.map((row, rowIndex) => (
            <TableRow key={rowIndex} selector="trbody" propsStyles={{ index: rowIndex }} {...rest}>
              {row.map((item, index) => (
                <TableData key={index} selector="tdbody" propsStyles={{ index }} {...rest}>
                  {item}
                </TableData>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}

      {data.foot && (
        <TableFooter {...rest}>
          <TableRow {...rest}>
            {data.foot.map((item, index) => (
              <TableData key={index} selector="tdfoot" propsStyles={{ index }} {...rest}>
                {item}
              </TableData>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}

interface TableRootProps extends IntrinsicTableProps {
  title?: string;
}
const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(_props, ref) {
  const { unstyled, className, classNames, style, styles, layout, spacing = {}, stickyHeaderOffset, borderColor = "hsl(var(--border))", stripedColor = "hsl(var(--primitive))", highlightOnHoverColor = "hsl(var(--primitive-foreground))", ...props } = _props;
  const ctx = useTable();
  const { x, y = 8 } = spacing;
  const stylesApi = { unstyled, classNames, styles, ...ctx };

  const table = (
    <table {...{ ref, ...ctx.getStyles("table", stylesApi), ...props }} />
  );

  return (
    <div
      {...{
        ...ctx.getStyles("root", {
          className,
          style: {
            "--table-layout": layout,
            "--table-caption-side": ctx.captionSide,
            "--table-horizontal-spacing": rem(x),
            "--table-vertical-spacing": rem(y),
            "--table-spacing": "var(--table-vertical-spacing, 1rem) var(--table-horizontal-spacing, 0.75rem)",
            "--table-border-color": borderColor ? borderColor : undefined,
            "--table-striped-color": ctx.striped && stripedColor ? stripedColor : undefined,
            "--table-highlight-on-hover-color": ctx.highlightOnHover && highlightOnHoverColor ? highlightOnHoverColor : undefined,
            "--table-sticky-header-offset": ctx.stickyHeader ? rem(stickyHeaderOffset) : undefined,
            ...style
          },
          ...stylesApi
        })
      }}
    >
      {table}
    </div>
  );
});
TableRoot.displayName = "Table/TableRoot";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, ComponentProps<"thead">>((props, ref) => <Edge {...{ ref, el: "thead", ...props }} />);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, ComponentProps<"tbody">>((props, ref) => <Edge {...{ ref, el: "tbody", ...props }} />);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, ComponentProps<"tfoot">>((props, ref) => <Edge {...{ ref, el: "tfoot", ...props }} />);
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, ComponentProps<"tr">>((props, ref) => <Edge {...{ ref, el: "tr", ...props }} />);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, ComponentProps<"th">>((props, ref) => <Edge {...{ ref, el: "th", ...props }} />);
TableHead.displayName = "TableHead";

export const TableData = React.forwardRef<HTMLTableCellElement, ComponentProps<"td">>((props, ref) => <Edge {...{ ref, el: "td", ...props }} />);
TableData.displayName = "TableData";

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, ComponentProps<"caption">>((props, ref) => <Edge {...{ ref, el: "caption", ...props }} />);
TableCaption.displayName = "TableCaption";

const Edge = React.forwardRef(function Edge<T extends React.ElementType>(_props: { el?: T } & ComponentProps<T>, ref: React.ComponentPropsWithRef<T>["ref"]) {
  const { unstyled, className, classNames, el, style, styles, selector, propsStyles, ...props } = _props;
  const ctx = useTable();
  const Components = el as React.ElementType;
  return (
    <Components {...{ ref, ...ctx.getStyles((selector || el) as __Selector, { unstyled, className, classNames, style, styles, ...ctx }, propsStyles), ...props }} />
  );
}) as <T extends React.ElementType>(
  _props: ComponentProps<T> & {
    el?: T;
    ref?: React.ComponentPropsWithRef<T>["ref"];
  }
) => React.ReactElement;

type TransformKey<T> = keyof T | ((item: T, index: number) => React.ReactNode);
export function dataRenderer<T extends Record<string, any>>(data: T[], transforms: TransformKey<T>[]): React.ReactNode[][] {
  return data.map((item, index) =>
    transforms.map(transform => {
      if (typeof transform === "function") {
        return transform(item, index);
      }
      return item[transform as keyof T];
    })
  );
}

// Export as a composite component
type TableComponent = React.ForwardRefExoticComponent<TableProps> & {
  Root: typeof Table;
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Head: typeof TableHead;
  Data: typeof TableData;
  Caption: typeof TableCaption;
  dataRenderer: typeof dataRenderer;
};
// Attach sub-components
Table.Root = Table;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Data = TableData;
Table.Caption = TableCaption;
Table.dataRenderer = dataRenderer;

/**
type TransformKey<T> = keyof T | ((item: T) => React.ReactNode);
export function dataRenderer<T extends Record<string, any>>(
  data: T[],
  keys: TransformKey<T>[]
): any[][] {
  return data.map(item =>
    keys.map(key => {
      if (typeof key === "function") {
        return key(item);
      }
      return item[key];
    })
  );
}

type TransformKeys<T> = (keyof T)[];
export function dataRenderer<T extends Record<string, any>>(
  data: T[],
  keys: TransformKeys<T>
): any[][] {
  return data.map(item => keys.map(key => item[key]));
}
*/
