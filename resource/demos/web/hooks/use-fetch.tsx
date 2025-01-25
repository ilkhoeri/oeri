"use client";
import { cn } from "cretex";
import { Code } from "@/ui/code";
import { Stack } from "@/ui/stack";
import { Button } from "@/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { cn } from "cretex";\nimport { Code } from "@/ui/code";\nimport { Stack } from "@/ui/stack";\nimport { Button } from "@/ui/button";\nimport { useFetch } from "@/hooks/use-fetch";\n\ntype Data = {\n  userId: number;\n  id: number;\n  title: string;\n};\n\nexport function UseFetchDemo() {\n  const { data, loading, error, refetch, abort } = useFetch<Data[]>("https://jsonplaceholder.typicode.com/albums/");\n\n  const uniqueUserData = data\n    ? Object.values(\n        data.reduce(\n          (acc, data) => {\n            if (!acc[data.userId]) {\n              acc[data.userId] = data;\n            }\n            return acc;\n          },\n          {} as Record<number, Data>\n        )\n      )\n    : null;\n\n  if (error) return <p className="text-sm font-medium text-red-600">{error.message}</p>;\n  return (\n    <>\n      <Stack className="relative size-full overflow-y-auto scrollbar">\n        <Code code={uniqueUserData ? JSON.stringify(uniqueUserData, null, 2) : "Fetching"} className="h-max min-h-max w-full" />\n        <Code label="data type:" samp={uniqueUserData} className="h-max w-full" />\n      </Stack>\n\n      <Stack align="end" className="absolute right-3 top-0">\n        <span className={cn("size-4 rounded-full", !uniqueUserData || loading ? "bg-destructive" : "bg-conservative")} />\n        <Button onClick={refetch} color="blue" variant="outline" className="w-24">\n          Refetch\n        </Button>\n        <Button onClick={abort} color="red" variant="outline" className="w-24">\n          Abort\n        </Button>\n      </Stack>\n    </>\n  );\n}'
};

type Data = {
  userId: number;
  id: number;
  title: string;
};

function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Data[]>("https://jsonplaceholder.typicode.com/albums/");

  const uniqueUserData = data
    ? Object.values(
        data.reduce(
          (acc, data) => {
            if (!acc[data.userId]) {
              acc[data.userId] = data;
            }
            return acc;
          },
          {} as Record<number, Data>
        )
      )
    : null;

  if (error) return <p className="text-sm font-medium text-red-600">{error.message}</p>;
  return (
    <>
      <Stack className="relative size-full overflow-y-auto scrollbar">
        <Code code={uniqueUserData ? JSON.stringify(uniqueUserData, null, 2) : "Fetching"} className="h-max min-h-max w-full" />
        <Code label="data type:" samp={uniqueUserData} className="h-max w-full" />
      </Stack>

      <Stack align="end" className="absolute right-3 top-0">
        <span className={cn("size-4 rounded-full", !uniqueUserData || loading ? "bg-destructive" : "bg-conservative")} />
        <Button onClick={refetch} color="blue" variant="outline" className="w-24">
          Refetch
        </Button>
        <Button onClick={abort} color="red" variant="outline" className="w-24">
          Abort
        </Button>
      </Stack>
    </>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "h-96 max-h-96 w-full centered relative overflow-hidden" }
};

export const UseFetchDemos = {
  usage
};
