"use client";
import * as React from "react";
import Image from "next/image";
import { Mark } from "./mark";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { Anchor, type AnchorProps } from "@/ui/anchor";
import type { IconType, DetailedSvgProps } from "@/ui/svg";

type NavLinkTrees = "link" | "active" | "icon" | "img" | "title" | "mark";
export type NavLinkClass = {
  classNames?: Partial<Record<NavLinkTrees, string>>;
};

export interface NavLinkItemProps {
  href: string;
  title?: string;
  icon?: IconType | undefined;
  iconProps?: DetailedSvgProps & { ["data-animation"]?: boolean };
  image?: string | undefined;
  isNew?: boolean | undefined;
  isUpdated?: boolean | undefined;
  style?: React.CSSProperties & { [key: string]: any };
}
export interface NavLinkProps extends Omit<AnchorProps, "href">, NavLinkClass {
  items: NavLinkItemProps[];
  includePath?: boolean;
  children?: React.ReactNode;
}

// Helper function to split pathname into segments
export const getPathSegments = (path: string) => path.toLowerCase().split("/").filter(Boolean);

export function NavLink({ items, ...props }: NavLinkProps) {
  return items.map((item, index) => <NavLinkItem key={index} href={item.href} title={item.title} icon={item.icon} {...props} />);
}

interface NavLinkItemTypes extends Omit<AnchorProps, "href">, NavLinkItemProps, NavLinkClass {
  includePath?: boolean;
}
export function NavLinkItem(_props: NavLinkItemTypes) {
  const { href = "", title, icon: Icon, image, isNew, isUpdated, scroll = false, className, classNames, includePath, iconProps, style, ...props } = _props;
  const pathname = usePathname();
  const pathSegments = getPathSegments(pathname);
  const pathActive = includePath ? pathSegments.includes(href) : pathname === href;

  const isMark = isNew || isUpdated;
  const labelIsMark = isNew ? "New" : isUpdated ? "Updated" : null;
  const markVariant: React.ComponentProps<typeof Mark>["variant"] = isNew ? "new" : isUpdated ? "updated" : undefined;

  return (
    <>
      <Anchor
        {...{
          href,
          scroll,
          "data-path": pathActive ? "active" : undefined,
          "data-mark": isMark ? "true" : undefined,
          className: cn(className, classNames?.link, pathActive && classNames?.active),
          style,
          ...props
        }}
      >
        {image && <Image alt="" draggable="false" src={image || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"} height={20} width={20} loading="lazy" data-linkitem="img" className={classNames?.img} onContextMenu={e => e.preventDefault()} />}
        {Icon && <Icon data-linkitem="icon" className={cn(classNames?.icon, iconProps?.className)} {...iconProps} />}
        <span data-linkitem="title" className={classNames?.title}>
          {title}
        </span>
      </Anchor>

      <Mark active={isMark} variant={markVariant} label={labelIsMark} className={classNames?.mark} />
    </>
  );
}
