"use client";
import React from "react";
import { cn } from "@/utils/cn";

export const formatterIDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"
});

export const formatterLong = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0, // minimum number of digits after the comma
  maximumFractionDigits: 0 // maximum number of digits after the comma
});

export const formatterIDRK = (value: number) => {
  if (value >= 1000 && value < 1000000) {
    return `Rp ${Math.floor(value / 1000)} K`;
  } else {
    return formatterIDR.format(value);
  }
};

type CurrencyProps = {
  el?: React.ElementType;
  quantity?: number;
  value?: string | number;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  format?: "default" | "long" | "medium" | "short";
} & React.HTMLAttributes<HTMLElement>;

export function Currency(_props: CurrencyProps) {
  const { value = 0, quantity, format = "default", className, leftSection, rightSection, el = "div", ...others } = _props;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;
  const total = Number(value) * quantity!;
  const formattedValue = quantity ? formatterIDR.format(Number(total)) : formatterIDR.format(Number(value));
  const sanitizedValue = formattedValue.replace(/Rp\s*/, "").replace(/\,00$/, ""); // Remove "Rp " and ",00"

  return (
    <Component className={cn("min-w-max", className)} {...others}>
      {leftSection}
      {format === "default" && formattedValue}
      {format === "long" && (quantity ? formatterLong.format(Number(total)) : formatterLong.format(Number(value)))}
      {format === "medium" && sanitizedValue}
      {format === "short" && (quantity ? formatterIDRK(Number(total)) : formatterIDRK(Number(value)))}
      {rightSection}
    </Component>
  );
}
