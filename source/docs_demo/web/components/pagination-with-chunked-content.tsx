"use client";
import { useState } from "react";
import { Pagination } from "@/ui/pagination";
import { dataRenderer, Table } from "@/ui/table";
import { Stack } from "@/ui/stack";

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

export function Demo() {
  const [activePage, setPage] = useState(1);

  const tableData = {
    head: ["ID", "NAME"],
    body: dataRenderer(data[activePage - 1], [
      (item) => item.id + 1,
      (item) => item.name,
    ])
  }

  return (
    <Stack>
      <Table data={tableData} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Stack>
  );
}
