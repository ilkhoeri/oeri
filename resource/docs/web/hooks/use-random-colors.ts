"use client";
import { useEffect, useState } from "react";

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function useRandomColors(initialColors: string[], intervalTime: number) {
  const [colors, setColors] = useState<string[]>(initialColors);

  useEffect(() => {
    const interval = setInterval(() => {
      const newColors = initialColors.map(() => getRandomColor());
      setColors(newColors);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [initialColors, intervalTime]);

  return colors;
}

export function useStringToHEx(
  state: {
    defaultValue?: string;
    color?: string;
    setColor?: (e: string) => void;
  } = {}
) {
  const { defaultValue = "", color, setColor } = state;

  const [inColor, setInColor] = useState(defaultValue);
  const clr = color !== undefined ? color : inColor;
  const setClr = setColor !== undefined ? setColor : setInColor;

  const convertToHex = (color: string): string | null => {
    if (typeof document === "undefined") return null;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = color;
    const computedColor = ctx.fillStyle;
    return /^#[0-9A-Fa-f]{6}$/.test(computedColor) ? computedColor : null;
  };

  const hexColor = convertToHex(clr) || "#000000";

  return { hexColor, setColor: setClr, color: clr };
}

/**
 *
 * @param color string
 * @param defaultColor "hsl(var(--color))"
 * @returns `color` | `defaultColor`
 */
export function getContrastColor(color?: string, defaultColor: string = "hsl(var(--color))"): string {
  if (!color) return defaultColor;

  const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
  const clr = color ?? "#000000";

  if (!isBrowser) {
    // console.warn("getContrastColor is running in a non-browser environment.");
    return defaultColor;
  }

  const convertToHex = (color: string): string | null => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = color;
    const computedColor = ctx.fillStyle;

    // Warna dalam format HEX
    if (/^#[0-9A-Fa-f]{6}$/.test(computedColor)) {
      return computedColor;
    }

    // Konversi nama warna atau format RGB ke HEX
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    const rgb = getComputedStyle(div).color;
    document.body.removeChild(div);

    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [r, g, b] = match.slice(1, 4).map(Number);
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    }

    return null;
  };

  const hexColor = convertToHex(clr) || clr;

  function parseColor(color: string): [number, number, number, number] {
    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const computedColor = getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
      return [r, g, b, a];
    }

    throw new Error(`Invalid color: ${hexColor}`);
  }

  function getLuminance(r: number, g: number, b: number): number {
    const [R, G, B] = [r, g, b].map(value => {
      const normalized = value / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  try {
    const [r, g, b, a] = parseColor(hexColor);

    if (a < 0.5) return defaultColor;

    const luminance = getLuminance(r, g, b);
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  } catch (error) {
    console.error(error);
    return defaultColor;
  }
}
