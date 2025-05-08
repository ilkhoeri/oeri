"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { default as NextImage } from "next/image";
import { cn } from "@/utils/cn";

import type { ImageProps } from "next/image";

type ImageOrigin = {
  classNames?: Partial<Record<"image" | "srcLoad", string>>;
};
type Exclude = "width" | "src" | "height" | "alt" | "ref" | "loading" | "srcSet";
export interface ImgProps extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, Exclude>, ImageOrigin, ImageProps {
  ref?: React.Ref<HTMLImageElement | null>;
  srcLoad?: React.ReactNode;
}

export const IMAGESRC = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";

export const Image = React.forwardRef<HTMLImageElement, ImgProps>(function Image(_props, ref) {
  const { src, onLoad, srcLoad, alt = "", priority, className, classNames, onContextMenu, loading = "lazy", draggable = "false", ...props } = _props;
  const [hasLoad, setHasLoad] = React.useState(false);

  const setLoaded = React.useCallback(() => {
    setHasLoad(true);
  }, [setHasLoad]);

  return (
    <>
      {!hasLoad && (
        <Slot data-src-load="true" className={cn("absolute flex h-full w-full items-center justify-center font-bold opacity-20", classNames?.srcLoad)}>
          {typeof srcLoad === "string" ? <code className="line-clamp-1 uppercase">{srcLoad.slice(0, 2)}</code> : srcLoad}
        </Slot>
      )}
      <NextImage
        data-image-popup
        {...{
          ref,
          alt,
          priority,
          draggable,
          onLoad: e => {
            setLoaded();
            onLoad?.(e);
          },
          onContextMenu: e => {
            e.preventDefault();
            onContextMenu?.(e);
          },
          src: hasLoad ? src : IMAGESRC,
          loading: priority ? "eager" : loading,
          className: cn(className, classNames?.image),
          ...props
        }}
      />
    </>
  );
});
Image.displayName = "Image";
