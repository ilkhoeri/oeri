import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { SlashIcon } from "@/icons/*";
import { cn } from "@/utils/cn";

import type { IconType } from "@/ui/svg";

type Unstyled = { unstyled?: boolean };

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ className, ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" className={cn("max-w-full overflow-hidden", className)} {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol"> & Unstyled>(({ unstyled, className, ...props }, ref) => (
  <ol ref={ref} className={cn(!unstyled && "flex w-max max-w-full flex-row flex-wrap items-center gap-1.5 overflow-auto break-words text-sm text-muted-foreground sm:gap-2.5", className)} {...props} />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li"> & Unstyled>(({ unstyled, className, ...props }, ref) => <li ref={ref} className={cn(!unstyled && "inline-flex items-center gap-1.5", className)} {...props} />);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & Unstyled & { active?: boolean }>(({ active, unstyled, scroll = false, className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      tabIndex={-1}
      scroll={scroll}
      data-path={active ? "active" : "inactive"}
      className={cn(
        !unstyled &&
          "inline-flex max-w-max truncate rounded-md border-0 leading-tight text-muted-foreground transition-colors [font-size:clamp(0.925rem,0.925rem+1vw,1rem)] data-[path=active]:font-semibold max-md:active:border-primitive-emphasis max-md:active:bg-primitive md:hover:border-primitive-emphasis md:hover:bg-primitive",
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span"> & Unstyled>(({ unstyled, className, ...props }, ref) => <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn(!unstyled && "font-normal text-muted-foreground", className)} {...props} />);
BreadcrumbPage.displayName = "BreadcrumbPage";

function IconSeparator({ separator }: { separator?: "slash" | "arrow-right" }) {
  let icon;
  if (separator === "slash") {
    icon = <SlashIcon className="size-[18px]" />;
  } else if (separator === "arrow-right") {
    icon = (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="size-3.5">
        <path d="M9 6l6 6l-6 6" />
      </svg>
    );
  }
  return icon;
}

const BreadcrumbSeparator = ({
  children,
  title,
  icon: Icon,
  separator = "arrow-right",
  ...props
}: React.ComponentProps<"li"> & {
  icon?: IconType;
  separator?: "slash" | "arrow-right";
}) => (
  <li role="presentation" aria-hidden="true" {...props}>
    {children || (Icon && <Icon />) || title || <IconSeparator separator={separator} />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ unstyled, className, ...props }: React.ComponentProps<"span"> & Unstyled) => (
  <span role="presentation" aria-hidden="true" aria-label="More" className={cn(!unstyled && "flex size-7 items-center justify-center", className)} {...props}>
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
