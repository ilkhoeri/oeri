import { cnx } from "str-merge";
import classes from "./loader.module.css";

export function Spinner({
  size = "20px",
  color = "hsl(var(--color))",
  style,
  classNames
}: {
  size?: string | number;
  classNames?: Partial<Record<"root" | "bar", string>>;
  style?: React.CSSProperties & { [key: string]: any };
  color?: React.CSSProperties["color"] | "currentColor" | (string & {});
}) {
  return (
    <div
      {...{
        className: cnx(classes.spinner, classNames?.root),
        style: {
          "--spinner-size": String(
            typeof size === "number" ? `${size}px` : size
          ),
          "--spinner-color-set": String(color),
          ...style
        } as React.CSSProperties,
        "data-loader": "spinner"
      }}>
      {[...Array(12)].map((_, index) => (
        <div key={index} className={cnx(classes.bar, classNames?.bar)} />
      ))}
    </div>
  );
}
