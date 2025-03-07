"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "cretex";
import { Button, ButtonProps } from "@/ui/button";
import { CheckIcon, ClipboardCheckIcon } from "@/icons/*";

type SizeImage = number | `${number}`;
type DataFigure = {
  name: string;
  src: string;
  caption?: string | string[];
};
interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  data: (DataFigure | DataFigure[]) | null;
  width?: SizeImage;
  height?: SizeImage;
  size?: [SizeImage, SizeImage];
  classNames?: {
    figure?: string;
    image?: string;
    caption?: string;
    h4?: string;
    p?: string;
  };
}

export function Figure({ data, width = "260", height = "300", size, className, classNames, ...props }: FigureProps) {
  if (!data) {
    return null;
  }
  return Array.isArray(data) ? (
    data.map((data, __i) => <Figure key={__i} {...{ data, size, classNames }} />)
  ) : (
    <figure
      {...{
        className: cn("relative", className, classNames?.figure),
        ...props
      }}
    >
      <Image src={data.src} alt={data.name} width={size?.[0] || width} height={size?.[1] || height} className={classNames?.image} />
      <figcaption className={classNames?.caption}>
        <h4 className={classNames?.h4}>{data.name}</h4>
        {data.caption && Array.isArray(data.caption) ? (
          data.caption.map((i, __i) => (
            <p key={__i} className={classNames?.p}>
              {i}
            </p>
          ))
        ) : (
          <p className={classNames?.p}>{data.caption}</p>
        )}
      </figcaption>
    </figure>
  );
}

interface CopyButtonProps extends ButtonProps {
  text: string | undefined;
  className?: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 700);
  };

  return (
    <Button size="icon" className={cn("size-7 !bg-slate-700 !text-white", className)} disabled={isCopied} onClick={copy} aria-label="Copy" {...props}>
      <span className="sr-only">Copy</span>
      {isCopied ? <CheckIcon className="text-green-400" /> : <ClipboardCheckIcon />}
    </Button>
  );
}
