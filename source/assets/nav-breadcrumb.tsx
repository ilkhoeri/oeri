"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/ui/breadcrumb";
import { displayName } from "../utils";

export interface BreadcrumbDropdownProps {
  paths: string[];
}

export function NavigationBreadcrumb() {
  const pathname = usePathname();
  // Memecah pathname menjadi bagian-bagian yang dipisahkan oleh '/'
  // const path = pathname.split("/").filter((part) => part !== ""); // Filter untuk menghapus bagian yang kosong
  const paths = pathname.split("/").filter(Boolean);
  const active = (index: number) => index === paths.length - 1 || undefined;
  const links = (index: number) =>
    active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`;

  const items = paths.map((path, index) => (
    <Link
      key={path}
      href={links(index)}
      aria-disabled={paths[1] === path || active(index)}
    >
      {displayName(path)}
    </Link>
  ));

  return (
    <Breadcrumb
      items={items}
      separator={<Breadcrumb.Icons icon="chevron" />}
      classNames={{
        root: "mb-8",
        breadcrumb: "[font-size:clamp(0.75rem,0.35rem+0.8vw,1rem)]"
      }}
    />
  );
}
