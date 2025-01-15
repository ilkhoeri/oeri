import AutoScroll from "embla-carousel-auto-scroll";
import { useCarousel } from "@/ui/carousel";
import { cn } from "str-merge";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: orientation, ...first } = __docs_demo.useDemo({ Str: "vertical" });
  const { carouselRef, stopOnHover, opts } = useCarousel(
    // @ts-ignore
    { orientation: orientation },
    [AutoScroll({ playOnInit: true, speed: 0.35, direction: "forward" })]
  );
  const isHorizontal = opts.orientation === "horizontal";
  return (
    <__docs_demo>
    <__docs_demo.area>
    <div ref={carouselRef} data-carousel="viewport" className={cn(
        "relative overflow-hidden [--spacing:1rem]",
        isHorizontal ? "max-w-full" : "max-h-[--h] [--h:28rem]"
      )}
    >
      <div className={cn(
          "flex touch-pinch-zoom items-center",
          isHorizontal ? "ml-[calc(var(--spacing)*-1)] h-full flex-row py-3 [--tw-pan-y:pan-y]" : "mt-[calc(var(--spacing)*-1)] h-[calc(var(--spacing)+var(--h))] w-full flex-col px-3 [--tw-pan-x:pan-x]"
        )}
      >
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "relative flex shrink-0 grow-0 select-none items-center justify-center",
              isHorizontal ? "py-[--spacing] pl-[--spacing]" : "px-[--spacing] pt-[--spacing]"
            )}
            {...stopOnHover}
          >
            <div className="flex h-64 w-[300px] min-w-[300px] flex-col items-center justify-center rounded-lg border bg-background text-muted shadow-sm transition-all font-heading after:-mt-6 after:text-sm after:italic after:content-['stop_on_hover'] hover:rounded-xl hover:border-color hover:text-color hover:[scale:1.05] hover:after:content-['isHover']">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="orientation" values={["horizontal", "vertical"]} str={orientation} setStr={first.setStr}/>
    </__docs_demo.controls>
    </__docs_demo>
  );
}
