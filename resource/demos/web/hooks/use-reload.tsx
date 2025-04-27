"use client";
import { Svg } from "@/ui/svg";
import { Button } from "@/ui/button";
import { useReload } from "@/hooks/use-reload";
import { useEffect, useState } from "react";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Svg } from "@/ui/svg";\nimport { Button } from "@/ui/button";\nimport { useReload } from "@/hooks/use-reload";\nimport { useEffect, useState } from "react";\n\ntype DataItem = {\n  userId: number;\n  id: number;\n  title: string;\n};\n\nfunction Demo() {\n  const { key, onReload, loading, onLoading } = useReload();\n  const [data, setData] = useState<DataItem[]>([]);\n\n  useEffect(() => {\n    async function fetchData() {\n      onLoading(true);\n      try {\n        const res = await fetch("https://jsonplaceholder.typicode.com/albums/");\n        const json = await res.json();\n        setData(json);\n      } finally {\n        onLoading(false);\n      }\n    }\n    fetchData();\n  }, [key, onLoading]);\n\n  return (\n    <div>\n      <Button title="reload" onClick={onReload} variant="outline" size="icon" color="default" className="p-1 [--sz:36px]">\n        <Svg size={28} className="transition-transform">\n          <g>\n            <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />\n            <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />\n          </g>\n        </Svg>\n        <span className="sr-only">Reload</span>\n      </Button>\n\n      {data?.length === 0 || loading ? (\n        <div className="space-y-1.5">\n          {/* Skeleton Row */}\n          {[...Array(12)].map((_, index) => (\n            <div key={index} className="flex animate-pulse space-x-1.5">\n              <div className="h-10 w-11 bg-muted" />\n              <div className="h-10 w-[23rem] bg-muted" />\n            </div>\n          ))}\n        </div>\n      ) : (\n        <table className="w-full border">\n          <thead>\n            <tr>\n              <th className="border p-2.5">ID</th>\n              <th className="border p-2.5">Name</th>\n            </tr>\n          </thead>\n          <tbody>\n            {data.slice(0, 12).map(item => (\n              <tr key={item.id}>\n                <td className="h-[42px] w-11 border p-2">{item.id}</td>\n                <td className="h-[42px] w-[22rem] truncate border p-2">{item.title}</td>\n              </tr>\n            ))}\n          </tbody>\n        </table>\n      )}\n    </div>\n  );\n}',
  reloadWindow:
    '"use client";\nimport { Svg } from "@/ui/svg";\nimport { Button } from "@/ui/button";\nimport { useReload } from "@/hooks/use-reload";\n\nexport function UseReloadDemo() {\n  const { loading, onReloadWindow } = useReload();\n\n  return (\n    <Button title="reload" onClick={onReloadWindow} variant="outline" size="icon" color={loading ? "red" : "default"} className="p-1 [--sz:36px]">\n      <Svg size={28} className="transition-transform">\n        <g className={loading ? "occure_load" : undefined}>\n          <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />\n          <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />\n        </g>\n      </Svg>\n      <span className="sr-only">Reload window</span>\n    </Button>\n  );\n}'
};

function ReloadWindowDemo() {
  const { loading, onReloadWindow } = useReload();

  return (
    <Button title="reload" onClick={onReloadWindow} variant="outline" size="icon" color={loading ? "red" : "default"} className="p-1 [--sz:36px]">
      <Svg size={28} className="transition-transform">
        <g className={loading ? "occure_load" : undefined}>
          <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />
          <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />
        </g>
      </Svg>
      <span className="sr-only">Reload window</span>
    </Button>
  );
}

type DataItem = {
  userId: number;
  id: number;
  title: string;
};

function Demo() {
  const { key, onReload, loading, onLoading } = useReload();
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      onLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/albums/");
        const json = await res.json();
        setData(json);
      } finally {
        onLoading(false);
      }
    }
    fetchData();
  }, [key, onLoading]);

  return (
    <div>
      <Button title="reload" onClick={onReload} variant="outline" size="icon" color="default" className="p-1 [--sz:36px]">
        <Svg size={28} className="transition-transform">
          <g>
            <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />
            <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />
          </g>
        </Svg>
        <span className="sr-only">Reload</span>
      </Button>

      {data?.length === 0 || loading ? (
        <div className="space-y-1.5">
          {/* Skeleton Row */}
          {[...Array(12)].map((_, index) => (
            <div key={index} className="flex animate-pulse space-x-1.5">
              <div className="h-10 w-11 bg-muted" />
              <div className="h-10 w-[23rem] bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2.5">ID</th>
              <th className="border p-2.5">Name</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 12).map(item => (
              <tr key={item.id}>
                <td className="h-[42px] w-11 border p-2">{item.id}</td>
                <td className="h-[42px] w-[22rem] truncate border p-2">{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

const reloadWindow: DataTrees = {
  type: "code",
  component: ReloadWindowDemo,
  code: codes.reloadWindow,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseReloadDemos = {
  usage,
  reloadWindow
};
