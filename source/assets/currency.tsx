"use client";
import React, { ElementType, useEffect, useState } from "react";
import { merge } from "str-merge";

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
  el?: ElementType;
  quantity?: number;
  value?: string | number;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  format?: "default" | "long" | "medium" | "short";
} & React.HTMLAttributes<HTMLElement>;

export function Currency(_props: CurrencyProps) {
  const { value = 0, quantity, format = "default", className, leftSection, rightSection, el = "div", ...others } = _props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;
  const total = Number(value) * quantity!;
  const formattedValue = quantity ? formatterIDR.format(Number(total)) : formatterIDR.format(Number(value));
  const sanitizedValue = formattedValue.replace(/Rp\s*/, "").replace(/\,00$/, ""); // Remove "Rp " and ",00"

  return (
    <Component className={merge("min-w-max", className)} {...others}>
      {leftSection}
      {format === "default" && formattedValue}
      {format === "long" && (quantity ? formatterLong.format(Number(total)) : formatterLong.format(Number(value)))}
      {format === "medium" && sanitizedValue}
      {format === "short" && (quantity ? formatterIDRK(Number(total)) : formatterIDRK(Number(value)))}
      {rightSection}
    </Component>
  );
}
