"use client";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { bottom, scrollWindow, mounted, position } = useWindowScroll();

  if (!mounted) return null;

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-4">
      <button
        type="button"
        role="button"
        onClick={scrollWindow}
        /* onClick={() => scrollTo({ y: 0 })} // use scrollTo() if you want to specify a scroll with a specific value */
        className={globalStyle({ button: "default", size: "sm" }, "min-w-24")}
      >
        Scroll to {bottom ? "top" : "bottom"}
      </button>
      <p className="text-sm">
        window scroll x=&#123;{position.x}&#125; y=&#123;{position.y}&#125;
      </p>
    </div>
  );
}
