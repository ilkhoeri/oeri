"use client";
import { Svg } from "@/ui/svg";
import { useReload } from "@/hooks/use-reload";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { reload, onReload } = useReload();

  return (
    <button
      type="button"
      role="button"
      title="reload"
      aria-label="reload"
      onClick={onReload}
      className={globalStyle({ button: "outline", size: "icon-sm" }, "m-auto", { "text-constructive border-constructive": reload })}
    >
      <Svg size={32} className="transition-transform">
        <g className={reload ? "occure_load" : undefined}>
          <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />
          <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />
        </g>
      </Svg>
      <span className="sr-only">Reload</span>
    </button>
  );
}
