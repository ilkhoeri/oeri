"use client";
import { useImagePopup } from "@/hooks/use-image-popup";

export function Demo() {
  useImagePopup("[data-has-popup]");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-has-popup=""
      src="/icons/oeri-asset.png"
      alt="oeri logo"
      width={96}
      height={96}
      className="size-24 cursor-zoom-in rounded-lg border bg-black"
    />
  );
}
