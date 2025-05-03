"use client";
import * as React from "react";
import { cn, cvx, inferType, rem } from "cretex";

const classes = cvx({
  variants: {
    variant: {
      default: "stylelayer-table-table rounded-lg bg-background [--bg-table-tr-hover:hsl(var(--primitive-foreground))] [--vertical-align:middle] [--table-border-color:hsl(var(--border))]",
      tile: "stylelayer-table-tile [--shape-rounded:1rem] [--background-th:var(--palette-background-neutral)] [--table-border-color:hsl(var(--border))] [--color-cell:hsl(var(--color))] [--color-icon:hsl(var(--muted-foreground))] [--table-hover-color:hsl(var(--primitive))] [--padding-cell:1.5rem] [--palette-TableCell-border:var(--palette-divider)]"
    },
    selector: {
      root: "",
      table: "w-max text-sm table",
      caption: "caption",
      resizer: "resizer",
      thead: "thead",
      tbody: "tbody",
      tfoot: "tfoot",
      "thead.tr": "tr",
      "tbody.tr": "tr",
      "tfoot.tr": "tr",
      "thead.tr.th": "th",
      "tbody.tr.td": "td",
      "tfoot.tr.td": "td",
      // section
      tr: "tr",
      th: "th",
      td: "td"
    }
  }
});

type SeLv_0 = "root" | "table" | "caption" | "resizer"; // parent atau dianggap independent
type SeLv_1 = "thead" | "tbody" | "tfoot"; // child level 1
type SeLv_2 = `${SeLv_1}.tr`; // child level 2
type SeLv_3 = "thead.tr.th" | "tbody.tr.td" | "tfoot.tr.td"; // child level 3
type SeLv_S = "tr" | "th" | "td";
type Selector = NonNullable<SeLv_0 | SeLv_1 | SeLv_2 | SeLv_3 | SeLv_S>;

export type StyleComposed<R> = Partial<Record<SeLv_0 | SeLv_1 | SeLv_S, R>> & Partial<Record<SeLv_2 | SeLv_3, R | ((index: number) => R)>>;

type CSSProperties = React.CSSProperties & { [key: string]: any };

type Styled = {
  unstyled: boolean | StyleComposed<boolean>;
  classNames: StyleComposed<string | false>;
  styles: StyleComposed<CSSProperties>;
};

interface ComposedProps {
  __areaIndex?: number;
  color?: React.CSSProperties["color"];
  unstyled?: boolean;
  className?: string;
  style?: CSSProperties;
  dir?: "ltr" | "rtl";
}
type WithOutRef<T extends React.ElementType> = Omit<React.PropsWithoutRef<React.ComponentProps<T>>, keyof ComposedProps>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = Omit<ComposedProps & WithOutRef<T>, Exclude>;

type ProviderProps<RootProps extends object, ContextProps extends object = never> = RootProps & (ContextProps extends never ? never : Partial<ContextProps>);

type AttrData<TAttr> = { [k: string]: TAttr };
function createAttrData<TVal, TAttr>(val: TVal, attr: AttrData<TAttr>) {
  return Object.fromEntries(
    Object.entries(attr)
      .filter(([, value]) => value)
      .map(([key, value]) => [key, value ? val : undefined])
  );
}

function getValidStyled(slt: Selector, opts: Partial<Styled> = {}, index: number = 0) {
  const resolveValue = <T,>(obj: StyleComposed<T> | undefined, selector: Selector): T | undefined => {
    const val = obj?.[selector];
    if (typeof val === "function") return (val as any)(index);
    return val;
  };

  const baseKey = slt.includes(".") ? (slt.split(".").at(-1)! as Selector) : slt;
  const specificKey = slt;

  const mergeValues = <T,>(obj: StyleComposed<T> | undefined, merger: (base?: T, specific?: T) => T): T | undefined => {
    const base = resolveValue(obj, baseKey);
    const specific = resolveValue(obj, specificKey);
    if (base === undefined && specific === undefined) return undefined;
    return merger(base, specific);
  };

  const unstyled = typeof opts?.unstyled === "object" ? mergeValues(opts.unstyled, (base, specific) => Boolean(specific ?? base)) : opts?.unstyled;

  const className = cn(mergeValues(opts?.classNames, (base, specific) => cn(base, specific)));

  const style = mergeValues(opts?.styles, (base, specific) => ({
    ...base,
    ...specific
  }));

  return {
    unstyled,
    className,
    style
  };
}

type Options = Partial<Styled & __TableProps> & {
  className?: string;
  style?: CSSProperties;
};
function getStyles(selector: Selector, opts: Options = {}, areaIndex?: number) {
  const { unstyled, className, style } = getValidStyled(selector, opts, areaIndex);

  return {
    "data-table": cn(selector),
    "data-striped": selector.includes("tr") ? opts?.striped : undefined,
    "data-orientation": selector === "table" ? opts?.orientation : undefined,
    "data-side": selector === "caption" ? opts?.captionSide : undefined,
    ...createAttrData("true", {
      "data-table-border": selector === "root" && opts?.withTableBorder,
      "data-table-overflow": selector === "root" && opts?.overflowWrap,
      "data-column-border": selector === "root" && opts?.withColumnBorders,
      "data-row-border": selector === "root" && opts?.withRowBorders,
      "data-sticky": selector === "thead" && opts?.stickyHeader,
      "data-hover": selector.includes("tr") && opts?.highlightOnHover
    }),
    className: cn(!unstyled && classes({ selector, variant: selector === "root" ? opts?.variant : undefined }), className, opts?.className),
    style: { ...style, ...opts?.style }
  };
}

export interface __TableProps {
  overflowWrap: boolean;
  stickyHeader: boolean;
  highlightOnHover: boolean;
  withTableBorder: boolean;
  withColumnBorders: boolean;
  withRowBorders: boolean;
  captionSide: "top" | "bottom";
  orientation: "vertical" | "horizontal";
  variant: "default" | "tile";
  dir: "ltr" | "rtl";
  striped: boolean | "odd" | "even" | undefined;
}

interface CtxProps extends __TableProps, Styled {
  getStyles(selector: Selector, options?: Options, areaIndex?: number): inferType<typeof getStyles>;
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useTable = () => React.useContext(ctx)!;

export interface DataTableProps {
  head?: React.ReactNode[];
  body?: React.ReactNode[][];
  foot?: React.ReactNode[];
  caption?: React.ReactNode;
}

export interface TableProps extends ProviderProps<TableRootProps, __TableProps & Styled> {
  data?: DataTableProps;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>((_props, ref) => {
  const {
    unstyled = false,
    classNames = {},
    styles = {},
    layout,
    striped = false,
    stickyHeader = false,
    variant = "default",
    orientation = "vertical",
    captionSide = "bottom",
    overflowWrap = true,
    withRowBorders = true,
    withTableBorder = true,
    highlightOnHover = true,
    withColumnBorders = false,
    data,
    dir,
    children,
    ...props
  } = _props;
  return (
    <ctx.Provider
      value={{
        getStyles,
        variant,
        unstyled,
        classNames,
        styles,
        orientation,
        stickyHeader,
        highlightOnHover,
        withColumnBorders,
        withRowBorders,
        withTableBorder,
        overflowWrap,
        captionSide,
        dir: dir ?? "ltr",
        striped: (striped === true ? "odd" : striped !== false ? striped : undefined) ?? undefined
      }}
    >
      <TableRoot {...{ ref, orientation, unstyled, ...props }}>{children || (!!data && <TableDataRenderer {...{ data, unstyled, classNames, styles }} />)}</TableRoot>
    </ctx.Provider>
  );
}) as TableComponent;
Table.displayName = "Table";

export interface TableDataRendererProps extends Styled {
  data: DataTableProps;
}
export function TableDataRenderer(_props: TableDataRendererProps) {
  const { data, ...rest } = _props;
  return (
    <>
      {data.caption && <TableCaption {...getValidStyled("caption", rest)}>{data.caption}</TableCaption>}

      {data.head && (
        <TableHeader {...getValidStyled("thead", rest)}>
          <TableRow __areaIndex={0} {...getValidStyled("thead.tr", rest)}>
            {data.head.map((item, index) => (
              <TableHead key={index} __areaIndex={index} {...getValidStyled("thead.tr.th", rest, index)}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}

      {data.body && (
        <TableBody {...getValidStyled("tbody", rest)}>
          {data.body.map((row, rowIndex) => (
            <TableRow key={rowIndex} __areaIndex={rowIndex} {...getValidStyled("tbody.tr", rest, rowIndex)}>
              {row.map((cell, cellIndex) => (
                <TableData key={cellIndex} __areaIndex={cellIndex} {...getValidStyled("tbody.tr.td", rest, cellIndex)}>
                  {cell}
                </TableData>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}

      {data.foot && (
        <TableFooter {...getValidStyled("tfoot", rest)}>
          <TableRow {...getValidStyled("tfoot.tr", rest)}>
            {data.foot.map((cell, cellIndex) => (
              <TableData key={cellIndex} __areaIndex={cellIndex} {...getValidStyled("tfoot.tr.td", rest, cellIndex)}>
                {cell}
              </TableData>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </>
  );
}

interface TableRootProps extends ComponentProps<"table", "__areaIndex"> {
  layout?: React.CSSProperties["tableLayout"];
  spacing?: { x?: number | string; y?: number | string };
  highlightOnHoverColor?: React.CSSProperties["color"];
  stickyHeaderOffset?: number | string;
  borderColor?: React.CSSProperties["color"];
  stripedColor?: React.CSSProperties["color"];
  rootProps?: ComponentProps<"div", "__areaIndex">;
}
const DEFAULT_SPACE: Record<__TableProps["variant"], Record<keyof NonNullable<TableRootProps["spacing"]>, string | number>> = {
  default: { x: 12, y: 16 },
  tile: { x: 0, y: 10 }
};
const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>((_props, ref) => {
  const { unstyled: unstyledProp, className, style, layout, spacing = {}, stickyHeaderOffset, borderColor, stripedColor = "hsl(var(--primitive))", highlightOnHoverColor = "var(--bg-table-tr-hover)", "aria-orientation": ariaOrientation, dir: dirProp, rootProps, ...props } = _props;

  const { dir: dirCtx, orientation, unstyled: unstyledCtx, classNames, styles, ...ctx } = useTable();

  const unstyled = unstyledProp ?? unstyledCtx;
  const dir = dirProp ?? dirCtx;
  const stylesApi = { unstyled, classNames, styles, orientation, dir, ...ctx };
  const { x = DEFAULT_SPACE[ctx?.variant].x, y = DEFAULT_SPACE[ctx?.variant].y } = spacing;

  return (
    <div
      {...{
        dir,
        ...rootProps,
        ...ctx.getStyles("root", {
          className,
          style: {
            "--table-layout": layout,
            "--table-caption-side": ctx.captionSide,
            "--table-spacing-x": rem(x),
            "--table-spacing-y": rem(y),
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
      <table {...{ ...props, ref, dir, "aria-orientation": ariaOrientation || orientation, ...ctx.getStyles("table", stylesApi) }} />
    </div>
  );
});
TableRoot.displayName = "Table/TableRoot";

type TableHeaderProps = ComponentProps<"thead", "__areaIndex">;
export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>((props, ref) => <Edge<"thead"> {...{ ...props, ref, el: "thead" }} />);
TableHeader.displayName = "TableHeader";

type TableBodyProps = ComponentProps<"tbody", "__areaIndex">;
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => <Edge<"tbody"> {...{ ...props, ref, el: "tbody" }} />);
TableBody.displayName = "TableBody";

type TableFooterProps = ComponentProps<"tfoot", "__areaIndex">;
export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>((props, ref) => <Edge<"tfoot"> {...{ ...props, ref, el: "tfoot" }} />);
TableFooter.displayName = "TableFooter";

interface TableRowProps extends ComponentProps<"tr"> {
  __areaSelector?: SeLv_2;
}
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ "aria-rowindex": aRI, __areaIndex, __areaSelector, ...props }, ref) => (
  <Edge<"tr"> {...{ ...props, ref, el: "tr", selector: __areaSelector, "aria-rowindex": aRI ?? (typeof __areaIndex !== "undefined" ? __areaIndex + 1 : undefined), __areaIndex }} />
));
TableRow.displayName = "TableRow";

interface TableHeadProps extends ComponentProps<"th"> {
  __areaSelector?: "thead.tr.th";
}
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ scope = "col", "aria-colindex": aCI, __areaIndex, __areaSelector, ...props }, ref) => (
  <Edge<"th"> {...{ ...props, ref, el: "th", scope, "aria-colindex": aCI ?? (typeof __areaIndex !== "undefined" ? __areaIndex + 1 : undefined), __areaIndex, selector: __areaSelector }} />
));
TableHead.displayName = "TableHead";

interface TableDataProps extends ComponentProps<"td"> {
  __areaSelector?: "tbody.tr.td" | "tfoot.tr.td";
}
export const TableData = React.forwardRef<HTMLTableCellElement, TableDataProps>(({ scope = "col", "aria-colindex": aCI, __areaIndex, __areaSelector, ...props }, ref) => (
  <Edge<"td"> {...{ ...props, ref, el: "td", scope, "aria-colindex": aCI ?? (typeof __areaIndex !== "undefined" ? __areaIndex + 1 : undefined), __areaIndex, selector: __areaSelector }} />
));
TableData.displayName = "TableData";

export const TableCell = TableData;
TableCell.displayName = "TableCell";

type TableCaptionProps = ComponentProps<"caption", "__areaIndex">;
export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>((props, ref) => <Edge<"caption"> {...{ ref, el: "caption", ...props }} />);
TableCaption.displayName = "TableCaption";

type ResizeEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>;
interface TableResizerProps extends ComponentProps<"div", "__areaIndex"> {
  resizeMode?: true | "onChange" | "onEnd";
  onResize?: (e: ResizeEvent) => void;
  resizing?: boolean | undefined;
  setsize?: number | null | undefined;
}
export const TableResizer = React.forwardRef<HTMLDivElement, TableResizerProps>(({ onMouseDown, onTouchStart, "aria-setsize": aSS, setsize, onResize, resizing, dir, style, resizeMode, ...props }, ref) => (
  <Edge<"div">
    {...{
      ...props,
      ref,
      dir,
      el: "div",
      selector: "resizer",
      "aria-setsize": aSS || (setsize ?? undefined),
      "data-resizing": resizing || undefined,
      onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onMouseDown?.(e);
        onResize?.(e);
      },
      onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => {
        onTouchStart?.(e);
        onResize?.(e);
      },
      style: {
        transform: resizeMode === "onEnd" && resizing ? `translateX(${(dir === "rtl" ? -1 : 1) * (setsize ?? 0)}px)` : "",
        ...style
      }
    }}
  />
));
TableResizer.displayName = "TableResizer";

function Edge<T extends React.ElementType>(_props: React.ComponentPropsWithRef<T> & ComposedProps & { el?: T; selector?: Selector }) {
  const { ref, unstyled: unstyledProp, className, style, el, selector, __areaIndex, dir: dirProp, ...props } = _props;

  const { dir: dirCtx, unstyled: unstyledCtx, classNames, styles, ...ctx } = useTable();

  const Components = el as React.ElementType;
  return (
    <Components
      {...{
        ...props,
        ref,
        dir: dirProp ?? dirCtx,
        ...ctx.getStyles((selector || el) as Selector, { unstyled: unstyledProp ?? unstyledCtx, className, classNames, style, styles, dir: dirProp ?? dirCtx, ...ctx }, __areaIndex)
      }}
    />
  );
}

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
type ForwardRef<T extends React.ElementType, Props> = React.ForwardRefExoticComponent<{ ref?: React.ComponentPropsWithRef<T>["ref"] } & Props>;
type TableComponent = ForwardRef<"table", TableProps> & {
  Root: typeof Table;
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Head: typeof TableHead;
  Data: typeof TableData;
  Cell: typeof TableData;
  Caption: typeof TableCaption;
  Resizer: typeof TableResizer;
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
Table.Cell = TableData;
Table.Caption = TableCaption;
Table.Resizer = TableResizer;
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
