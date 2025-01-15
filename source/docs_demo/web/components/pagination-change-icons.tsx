import React from "react";
import { Pagination } from "@/ui/pagination";
import { Typography } from "@/ui/typography";
import { ArrowSquareRoundRightIcon, ArrowSquareRoundLeftIcon, ChevronCircleRightIcon, ChevronCircleLeftIcon, Svg } from "@/icons/*";

function Dot() {
  return (
    <Svg>
      <circle cx="12.1" cy="12.1" r="1" />
    </Svg>
  );
}

export function Demo() {
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