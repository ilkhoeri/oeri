import React from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbProps } from "@/ui/breadcrumb";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Stack } from "@/ui/stack";

const codes = {
  usage:
    'import React from "react";\nimport Link from "next/link";\nimport { Breadcrumb } from "@/ui/breadcrumb";\n\nfunction renamed(str: string) {\n  const words = str.split("-");\n  return words.map(word => word.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(" ");\n}\n\n// Declarative Props\nexport function BreadcrumbDeclarativeUsageDemo() {\n  const pathname = "docs/web/components/breadcrumb";\n  const paths = pathname.split("/").filter(Boolean);\n  const active = (index: number) => index === paths.length - 1 || undefined;\n  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);\n  const items = paths.map((path, index) => (\n    <Link key={path} href={links(index)} aria-disabled={active(index)}>\n      {renamed(path)}\n    </Link>\n  ));\n  return <Breadcrumb items={items} />;\n}\n\n// Compound Components\nexport function BreadcrumbCompoundUsageDemo() {\n  const pathname = "docs/web/components/breadcrumb";\n  const paths = pathname.split("/").filter(Boolean);\n  const active = (index: number) => index === paths.length - 1 || undefined;\n  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);\n\n  return (\n    <Breadcrumb>\n      {paths.map((path, index) => (\n        <React.Fragment key={path}>\n          <Breadcrumb.Item>\n            <Link href={links(index)} aria-disabled={active(index)}>\n              {renamed(path)}\n            </Link>\n          </Breadcrumb.Item>\n          {index < paths.length - 1 && <Breadcrumb.Separator separator="⇄" />}\n        </React.Fragment>\n      ))}\n    </Breadcrumb>\n  );\n}',
  changeSeparator:
    '"use client";\nimport React from "react";\nimport Link from "next/link";\nimport { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/ui/breadcrumb";\n\nfunction renamed(str: string) {\n  const words = str.split("-");\n  return words.map(word => word.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(" ");\n}\n\n// Declarative Props\nexport function BreadcrumbChangeSeparatorDeclarativeDemo() {\n  const pathname = "docs/web/components/breadcrumb";\n  const paths = pathname.split("/").filter(Boolean);\n  const active = (index: number) => index === paths.length - 1 || undefined;\n  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);\n  const separator = (index: number) => (index % 2 === 0 ? "+" : "-");\n\n  const items = paths.map((path, index) => (\n    <Link key={path} href={links(index)} aria-disabled={active(index)}>\n      {renamed(path)}\n    </Link>\n  ));\n\n  return <Breadcrumb gap={16} items={items} overflowWrap separator={separator} />;\n}\n\n// Independent Components\nexport function BreadcrumbChangeSeparatorIndependentDemo() {\n  const pathname = "docs/web/components/breadcrumb";\n  const paths = pathname.split("/").filter(Boolean);\n  const active = (index: number) => index === paths.length - 1 || undefined;\n  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);\n\n  return (\n    <Breadcrumb gap={14} overflowWrap>\n      {paths.map((path, index) => (\n        <React.Fragment key={path}>\n          <BreadcrumbItem>\n            <Link href={links(index)} aria-disabled={active(index)}>\n              {renamed(path)}\n            </Link>\n          </BreadcrumbItem>\n          {index < paths.length - 1 && index % 2 === 0 ? <BreadcrumbSeparator separator="+" /> : <BreadcrumbSeparator separator="-" />}\n        </React.Fragment>\n      ))}\n    </Breadcrumb>\n  );\n}',
  configurator:
    'import Link from "next/link";\nimport { Breadcrumb } from "@/ui/breadcrumb";\n\nfunction BreadcrumbDemo() {\n  const pathname = "docs/web/components/breadcrumb";\n  const paths = pathname.split("/").filter(Boolean);\n  const active = (index: number) => index === paths.length - 1 || undefined;\n  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);\n\n  const items = paths.map((path, index) => (\n    <Link key={path} href={links(index)} aria-disabled={active(index)}>\n      {renamed(path)}\n    </Link>\n  ));\n\n  return <Breadcrumb{{props}} items={items} />;\n}'
};

function renamed(str: string) {
  const words = str.split("-");
  return words.map(word => word.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(" ");
}
export function BreadcrumbUsageDemo() {
  const pathname = "docs/web/components/breadcrumb";
  const paths = pathname.split("/").filter(Boolean);
  const active = (index: number) => index === paths.length - 1 || undefined;
  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);
  const items = paths.map((path, index) => (
    <Link key={path} href={links(index)} aria-disabled={active(index)}>
      {renamed(path)}
    </Link>
  ));
  return (
    <Stack>
      <Breadcrumb items={items} />

      <Breadcrumb>
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <Breadcrumb.Item>
              <Link href={links(index)} aria-disabled={active(index)}>
                {renamed(path)}
              </Link>
            </Breadcrumb.Item>
            {index < paths.length - 1 && <Breadcrumb.Separator separator="⇄" />}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </Stack>
  );
}

export function BreadcrumbChangeSeparatorDemo() {
  const pathname = "docs/web/components/breadcrumb";
  const paths = pathname.split("/").filter(Boolean);
  const active = (index: number) => index === paths.length - 1 || undefined;
  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);
  const separator = (index: number) => (index % 2 === 0 ? "+" : "-");

  const items = paths.map((path, index) => (
    <Link key={path} href={links(index)} aria-disabled={active(index)}>
      {renamed(path)}
    </Link>
  ));

  return <Breadcrumb gap={16} items={items} overflowWrap separator={separator} />;
}

function BreadcrumbConfiguratorDemo(props: BreadcrumbProps) {
  const pathname = "docs/web/components/breadcrumb";
  const paths = pathname.split("/").filter(Boolean);
  const active = (index: number) => index === paths.length - 1 || undefined;
  const links = (index: number) => (active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`);
  const items = paths.map((path, index) => (
    <Link key={path} href={links(index)} aria-disabled={active(index)}>
      {renamed(path)}
    </Link>
  ));

  return <Breadcrumb {...props} items={items} />;
}

const usage: DataTrees = {
  type: "code",
  component: BreadcrumbUsageDemo,
  code: codes.usage,
  centered: true
};

const changeSeparator: DataTrees = {
  type: "code",
  component: BreadcrumbChangeSeparatorDemo,
  code: codes.changeSeparator,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: BreadcrumbConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "gap", type: "number", initialValue: 12, libraryValue: 12 },
    { prop: "color", type: "color", initialValue: "", libraryValue: "" },
    { prop: "overflowWrap", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const BreadcrumbDemos = {
  usage,
  configurator,
  changeSeparator
};
