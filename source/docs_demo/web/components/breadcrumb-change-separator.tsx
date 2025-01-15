"use client";
import React from "react";
import Link from "next/link";
import { Typography } from "@/ui/typography";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/ui/breadcrumb";

function renamed(str: string) {
  const words = str.split("-");
  return words
    .map(word => word.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
    .join(" ");
}

export function Demo() {
  const pathname = "docs/web/components/breadcrumb";
  const paths = pathname.split("/").filter(Boolean);
  const active = (index: number) => index === paths.length - 1 || undefined;
  const links = (index: number) => active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`;

  const items = paths.map((path, index) => (
    <Link key={path} href={links(index)} aria-disabled={active(index)}>
      {renamed(path)}
    </Link>
  ));

  const separator = (index: number) => {
    return index % 2 === 0 ? "🤩" : "😎";
  };

  return (
    <div className="flex w-full max-w-full flex-col items-center justify-center">
      <Typography prose="span">Declarative Props</Typography>
      <Breadcrumb gap={16} items={items} overflowWrap separator={separator} />
      <hr data-ignore />

      <Typography prose="span">Independent Components</Typography>
      <Breadcrumb gap={14} overflowWrap>
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <BreadcrumbItem>
              <Link href={links(index)} aria-disabled={active(index)}>{renamed(path)}</Link>
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator separator={<Breadcrumb.Icons icon="chevron"/>} />}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </div>
  );
}
