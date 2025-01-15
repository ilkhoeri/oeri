"use client";
import React from "react";
import { Typography } from "@/ui/typography";
import { Pagination, PaginationFirst, PaginationItems, PaginationLast, PaginationNext, PaginationPrevious } from "@/ui/pagination";

export function Demo() {
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
        onChange={page =>
          setTimeout(() => {
            setPage(page);
          }, 150)
        }
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
