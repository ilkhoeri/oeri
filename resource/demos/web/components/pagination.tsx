"use client";
import React from "react";
import { Typography } from "@/ui/typography";
import { Pagination, PaginationFirst, PaginationItems, PaginationLast, PaginationNext, PaginationPrevious, type PaginationProps } from "@/ui/pagination";
import { ArrowSquareRoundRightIcon, ArrowSquareRoundLeftIcon, ChevronCircleRightIcon, ChevronCircleLeftIcon, Svg } from "@/icons/*";
import { dataRenderer, Table } from "@/ui/table";
import { Stack } from "@/ui/stack";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { ClientOnly } from "@/source/assets/client-only";

const codes = {
  usage: 'import { Pagination } from "@/ui/pagination";\n\nexport function PaginationDemo() {\n  return <Pagination total={16} defaultValue={11} />;\n}',
  configurator: 'import { Pagination } from "@/ui/pagination";\n\nexport function PaginationDemo() {\n  return <Pagination{{props}} total={16} defaultValue={11} />;\n}',
  asLink:
    '"use client";\nimport React from "react";\nimport { Typography } from "@/ui/typography";\nimport { Pagination, PaginationFirst, PaginationItems, PaginationLast, PaginationNext, PaginationPrevious } from "@/ui/pagination";\n\nexport function PaginationAsLinkDemo() {\n  const [activePage, setPage] = React.useState(8);\n  const lastPage = 15;\n\n  const getHrefForControl = (control: string, currentPage: number): string => {\n    switch (control) {\n      case "first":\n        return `#page-1`;\n      case "previous":\n        return `#page-${Math.max(1, currentPage - 1)}`;\n      case "next":\n        return `#page-${Math.min(lastPage, currentPage + 1)}`;\n      case "last":\n        return `#page-${lastPage}`;\n      default:\n        return "#";\n    }\n  };\n  return (\n    <div className="m-auto size-full">\n      <Typography prose="span">Regular Component</Typography>\n      <Pagination\n        withEdges\n        total={lastPage}\n        value={activePage}\n        onChange={page => setTimeout(() => setPage(page), 150)}\n        getItemProps={page => ({\n          el: "a",\n          href: `#page-${page}`\n        })}\n        getControlProps={control => ({\n          el: "a",\n          href: getHrefForControl(control, activePage)\n        })}\n      />\n\n      <Typography prose="span">Composite Component</Typography>\n      <Pagination\n        total={10}\n        getItemProps={page => ({\n          el: "a",\n          href: `#page-${page}`\n        })}\n      >\n        <PaginationFirst el="a" href="#page-0" />\n        <PaginationPrevious el="a" href="#page-1" />\n        <PaginationItems />\n        <PaginationNext el="a" href="#page-2" />\n        <PaginationLast el="a" href="#page-10" />\n      </Pagination>\n    </div>\n  );\n}',
  changeIcon:
    'import React from "react";\nimport { Pagination } from "@/ui/pagination";\nimport { Typography } from "@/ui/typography";\nimport { ArrowSquareRoundRightIcon, ArrowSquareRoundLeftIcon, ChevronCircleRightIcon, ChevronCircleLeftIcon, Svg } from "@/icons/*";\n\nfunction Dot() {\n  return (\n    <Svg>\n      <circle cx="12.1" cy="12.1" r="1" />\n    </Svg>\n  );\n}\n\nexport function PaginationChangeIconsDemo() {\n  return (\n    <div className="m-auto size-full">\n      <Typography prose="span">Regular Component</Typography>\n      <Pagination\n        siblings={2}\n        boundaries={2}\n        withEdges\n        total={15}\n        defaultValue={8}\n        icons={{\n          first: ArrowSquareRoundLeftIcon,\n          previous: ChevronCircleLeftIcon,\n          next: ChevronCircleRightIcon,\n          last: ArrowSquareRoundRightIcon,\n          dots: Dot\n        }}\n      />\n\n      <Typography prose="span">Composite Component</Typography>\n      <Pagination siblings={2} boundaries={2} total={15} defaultValue={8}>\n        <Pagination.First icon={ArrowSquareRoundLeftIcon} />\n        <Pagination.Previous icon={ChevronCircleLeftIcon} />\n        <Pagination.Items dotsIcon={Dot} />\n        <Pagination.Next icon={ChevronCircleRightIcon} />\n        <Pagination.Last icon={ArrowSquareRoundRightIcon} />\n      </Pagination>\n    </div>\n  );\n}',
  withChunk:
    '"use client";\nimport { useState } from "react";\nimport { Pagination } from "@/ui/pagination";\nimport { dataRenderer, Table } from "@/ui/table";\nimport { Stack } from "@/ui/stack";\n\nfunction randomId() {\n  return `${Math.random().toString(36).slice(2, 11)}`;\n}\nfunction chunk<T>(array: T[], size: number): T[][] {\n  if (!array.length) {\n    return [];\n  }\n  const head = array.slice(0, size);\n  const tail = array.slice(size);\n  return [head, ...chunk(tail, size)];\n}\n\nconst data = chunk(\n  Array(30)\n    .fill(0)\n    .map((_, index) => ({ id: index, name: randomId() })),\n  5\n);\n\nexport function PaginationWithChunkedContentDemo() {\n  const [activePage, setPage] = useState(1);\n\n  const tableData = {\n    head: ["ID", "NAME"],\n    body: dataRenderer(data[activePage - 1], [\n      (item) => item.id + 1,\n      (item) => item.name,\n    ])\n  }\n\n  return (\n    <Stack>\n      <Table data={tableData} />\n      <Pagination total={data.length} value={activePage} onChange={setPage} />\n    </Stack>\n  );\n}'
};

function Demo() {
  return <Pagination total={16} defaultValue={11} />;
}

function ConfiguratorDemo(props: PaginationProps) {
  return <Pagination {...props} total={21} defaultValue={11} />;
}

function PaginationAsLinkDemo() {
  const [activePage, setPage] = React.useState(8);
  const lastPage = 15;

  const getHrefForControl = (control: string, currentPage: number): string => {
    switch (control) {
      case "first":
        return `#page-1`;
      case "previous":
        return `#page-${Math.max(1, currentPage - 1)}`;
      case "next":
        return `#page-${Math.min(lastPage, currentPage + 1)}`;
      case "last":
        return `#page-${lastPage}`;
      default:
        return "#";
    }
  };
  return (
    <div className="m-auto size-full">
      <Typography prose="span">Regular Component</Typography>
      <Pagination
        withEdges
        total={lastPage}
        value={activePage}
        onChange={page => setTimeout(() => setPage(page), 150)}
        getItemProps={page => ({
          el: "a",
          href: `#page-${page}`
        })}
        getControlProps={control => ({
          el: "a",
          href: getHrefForControl(control, activePage)
        })}
      />

      <Typography prose="span">Composite Component</Typography>
      <Pagination
        total={10}
        getItemProps={page => ({
          el: "a",
          href: `#page-${page}`
        })}
      >
        <PaginationFirst el="a" href="#page-0" />
        <PaginationPrevious el="a" href="#page-1" />
        <PaginationItems />
        <PaginationNext el="a" href="#page-2" />
        <PaginationLast el="a" href="#page-10" />
      </Pagination>
    </div>
  );
}

// ChangeIcons
function Dot() {
  return (
    <Svg>
      <circle cx="12.1" cy="12.1" r="1" />
    </Svg>
  );
}

function PaginationChangeIconsDemo() {
  return (
    <div className="m-auto size-full">
      <Typography prose="span">Regular Component</Typography>
      <Pagination
        siblings={2}
        boundaries={2}
        withEdges
        total={15}
        defaultValue={8}
        icons={{
          first: ArrowSquareRoundLeftIcon,
          previous: ChevronCircleLeftIcon,
          next: ChevronCircleRightIcon,
          last: ArrowSquareRoundRightIcon,
          dots: Dot
        }}
      />

      <Typography prose="span">Composite Component</Typography>
      <Pagination siblings={2} boundaries={2} total={15} defaultValue={8}>
        <Pagination.First icon={ArrowSquareRoundLeftIcon} />
        <Pagination.Previous icon={ChevronCircleLeftIcon} />
        <Pagination.Items dotsIcon={Dot} />
        <Pagination.Next icon={ChevronCircleRightIcon} />
        <Pagination.Last icon={ArrowSquareRoundRightIcon} />
      </Pagination>
    </div>
  );
}

// ChunkedContent
function randomId() {
  return `${Math.random().toString(36).slice(2, 11)}`;
}
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  5
);

function PaginationWithChunkedContentDemo() {
  const [activePage, setPage] = React.useState(1);

  const tableData = {
    head: ["ID", "NAME"],
    body: dataRenderer(data[activePage - 1], [item => item.id + 1, item => item.name])
  };

  return (
    <ClientOnly>
      <Stack>
        <Table data={tableData} />
        <Pagination total={data.length} value={activePage} onChange={setPage} />
      </Stack>
    </ClientOnly>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "sibling", type: "number", initialValue: 2, libraryValue: 2, min: 1, max: 3 },
    { prop: "boundaries", type: "number", initialValue: 1, libraryValue: 1, min: 1, max: 3 },
    { prop: "color", type: "color", initialValue: "", libraryValue: "" },
    { prop: "withEdges", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const asLink: DataTrees = {
  type: "code",
  component: PaginationAsLinkDemo,
  code: codes.asLink
};

const changeIcon: DataTrees = {
  type: "code",
  component: PaginationChangeIconsDemo,
  code: codes.changeIcon
};

const withChunk: DataTrees = {
  type: "code",
  component: PaginationWithChunkedContentDemo,
  code: codes.withChunk
};

export const PaginationDemos = {
  usage,
  configurator,
  asLink,
  changeIcon,
  withChunk
};
