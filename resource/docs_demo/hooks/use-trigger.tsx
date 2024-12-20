"use client";
import { useTrigger } from "@/hooks/use-trigger";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { ref, open } = useTrigger<HTMLButtonElement>({ defaultOpen: true });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        ref={ref}
        type="button"
        role="button"
        // prettier-ignore
        className={globalStyle({ button: "default", size: "sm" }, "min-w-24")}
      >
        Click me to {open ? "close" : "open"}
      </button>

      {open && (
        <div
          role="tooltip"
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">
          Content that is {open ? "open" : "closed"}
        </div>
      )}
    </div>
  );
}
