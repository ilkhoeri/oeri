"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(_props: ToasterProps) {
  const { theme: _, position = "bottom-right", ...props } = _props;
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      {...props}
      position={position}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "[--image:url(/assets/background/cover.webp)] group toast [&_*]:select-none [&_*]:pointer-events-none !z-[calc(121+var(--z-index,0))] group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg bg-cover bg-no-repeat bg-center [background-image:linear-gradient(to_right,#cccccc91_0%,#f4f6ffe8_75%),var(--image)] dark:[background-image:linear-gradient(to_right,_#151619e0_0%,#151619_75%),var(--image)]",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:whitespace-pre-wrap",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          title: "whitespace-pre-wrap"
        }
      }}
    />
  );
}
