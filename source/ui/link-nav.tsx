"use client";
import * as React from "react";
import Image from "next/image";
import { Mark } from "./mark";
import { cnx } from "str-merge";
import { usePathname } from "next/navigation";
import { IconType } from "@/modules/icons";
import { Link, type AnchorProps } from "./link";

type NavLinkTrees = "link" | "active" | "icon" | "img" | "title" | "mark";
export type NavLinkClass = {
  classNames?: Partial<Record<NavLinkTrees, string>>;
};

export interface NavLinkItemProps {
  href: string;
  title?: string;
  icon?: IconType | undefined;
  image?: string | undefined;
  isNew?: boolean | undefined;
}
export interface NavLinkProps extends Omit<AnchorProps, "href">, NavLinkClass {
  items: NavLinkItemProps[];
  includePath?: boolean;
  children?: React.ReactNode;
}

// Helper function to split pathname into segments
export const getPathSegments = (path: string) =>
  path.split("/").filter(Boolean);

export function NavLink({ items, ...props }: NavLinkProps) {
  return items.map((item, index) => (
    <NavLinkItem
      key={index}
      href={item.href}
      title={item.title}
      icon={item.icon}
      {...props}
    />
  ));
}

export function NavLinkItem({
  href,
  title,
  icon: Icon,
  image,
  isNew,
  scroll = false,
  className,
  classNames,
  includePath,
  ...props
}: NavLinkItemProps & AnchorProps & NavLinkClass & { includePath?: boolean }) {
  const pathname = usePathname();

  const pathSegments = getPathSegments(pathname);
  const pathActive = includePath
    ? pathSegments.includes(href)
    : pathname === href;

  return (
    <>
      <Link
        href={href}
        scroll={scroll}
        data-path={pathActive ? "active" : ""}
        data-mark={isNew ? "true" : undefined}
        className={cnx(
          className,
          classNames?.link,
          pathActive && classNames?.active
        )}
        {...props}
      >
        {image && (
          <Image
            alt=""
            draggable="false"
            src={
              image ||
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"
            }
            height={20}
            width={20}
            loading="lazy"
            data-linkitem="img"
            className={classNames?.img}
            onContextMenu={e => e.preventDefault()}
          />
        )}
        {Icon && <Icon data-linkitem="icon" className={classNames?.icon} />}
        <span data-linkitem="title" className={classNames?.title}>
          {title}
        </span>
      </Link>

      {isNew && (
        <Mark mark={true} childTrue="NEW" className={classNames?.mark} />
      )}
    </>
  );
}
