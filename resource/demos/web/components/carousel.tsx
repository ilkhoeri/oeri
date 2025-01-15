import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Carousel, type CarouselProps } from "@/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import AutoPlay from "embla-carousel-autoplay";
import { useCarousel } from "@/ui/carousel";
import { merge } from "str-merge";

const codes = {
  usage:
    'import { Carousel } from "@/ui/carousel";\n\nexport function CarouselDemo() {\n  return (\n    <Carousel opts={{ dragFree: false }}>\n      {[...Array(5)].map((_, index) => (\n        <Carousel.Item key={index}>\n          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">\n            {index + 1}\n          </div>\n        </Carousel.Item>\n      ))}\n    </Carousel>\n  );\n}',
  configurator:
    'import { Carousel, type CarouselProps } from "@/ui/carousel";\n\nexport function CarouselDemo() {\n  return (\n    <Carousel{{props}}>\n      {[...Array(5)].map((_, index) => (\n        <Carousel.Item key={index}>\n          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">\n            {index + 1}\n          </div>\n        </Carousel.Item>\n      ))}\n    </Carousel>\n  );\n}',
  hooks:
    '"use client";\nimport { useCarousel } from "@/ui/carousel";\nimport { merge } from "str-merge";\nimport type { CarouselProps } from "@/ui/carousel";\n\nimport classes from "./carousel.module.css";\n\nexport function CarouselHooksDemo({ plugins, {{props}} }: { orientation?: CarouselProps["orientation"]; plugins?: CarouselProps["plugins"] }) {\n  const { carouselRef, stopOnHover, opts } = useCarousel({ orientation }, plugins);\n  const dataState = { "data-orientation": opts.orientation };\n  return (\n    <div ref={carouselRef} className={merge("group/viewport", classes.viewport)} {...dataState}>\n      <div className={classes.container} {...dataState}>\n        {[...Array(5)].map((_, index) => (\n          <div key={index} className={classes.content} {...dataState} {...stopOnHover}>\n            <div className={classes.item} {...dataState}>{index + 1}</div>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}',
  hooksCss:
    ".viewport {\n  @apply relative overflow-hidden [--h:28rem] [--spacing:1rem] data-[orientation=horizontal]:max-w-full data-[orientation=vertical]:max-h-[--h];\n}\n.container {\n  @apply flex touch-pinch-zoom items-center data-[orientation=horizontal]:ml-[calc(var(--spacing)*-1)] data-[orientation=horizontal]:h-full data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:py-3 data-[orientation=horizontal]:[--tw-pan-y:pan-y] data-[orientation=vertical]:mt-[calc(var(--spacing)*-1)] data-[orientation=vertical]:h-[calc(var(--spacing)+var(--h))] data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-3 data-[orientation=vertical]:[--tw-pan-x:pan-x];\n}\n.content {\n  @apply relative flex shrink-0 grow-0 select-none items-center justify-center data-[orientation=horizontal]:py-[--spacing] data-[orientation=horizontal]:pl-[--spacing] data-[orientation=vertical]:px-[--spacing] data-[orientation=vertical]:pt-[--spacing];\n}\n.item {\n  @apply flex h-64 w-[300px] min-w-[300px] flex-col items-center justify-center rounded-lg border bg-background text-muted shadow-sm transition-all font-heading after:-mt-6 after:text-sm after:italic after:content-['stop_on_hover'] hover:rounded-xl hover:border-muted-foreground/60 hover:text-muted-foreground hover:[scale:1.05] hover:after:content-['isHover'];\n}",
  autoScrollPlugins:
    'import { Carousel } from "@/ui/carousel";\nimport AutoScroll from "embla-carousel-auto-scroll";\n\nexport function CarouselAutoScrollDemo() {\n  return (\n    <Carousel plugins={[AutoScroll({ playOnInit: true, speed: 0.35, direction: "forward" })]}>\n      {[...Array(5)].map((_, index) => (\n        <Carousel.Item key={index}>\n          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">\n            {index + 1}\n          </div>\n        </Carousel.Item>\n      ))}\n    </Carousel>\n  );\n}',
  autoplayPlugins:
    'import { Carousel } from "@/ui/carousel";\nimport AutoPlay from "embla-carousel-autoplay";\n\nexport function CarouselAutoPlayDemo() {\n  return (\n    <Carousel plugins={[AutoPlay({ playOnInit: true })]}>\n      {[...Array(5)].map((_, index) => (\n        <Carousel.Item key={index}>\n          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">\n            {index + 1}\n          </div>\n        </Carousel.Item>\n      ))}\n    </Carousel>\n  );\n}'
};

function CarouselDemo(props: CarouselProps) {
  return (
    <Carousel {...props}>
      {[...Array(5)].map((_, index) => (
        <Carousel.Item key={index}>
          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">
            {index + 1}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function CarouselUsage() {
  return (
    <Carousel opts={{ dragFree: false }}>
      {[...Array(5)].map((_, index) => (
        <Carousel.Item key={index}>
          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">
            {index + 1}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function CarouselAutoScrollDemo() {
  return (
    <Carousel plugins={[AutoScroll({ playOnInit: true, speed: 0.35, direction: "forward" })]}>
      {[...Array(5)].map((_, index) => (
        <Carousel.Item key={index}>
          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">
            {index + 1}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function CarouselAutoPlayDemo() {
  return (
    <Carousel plugins={[AutoPlay({ playOnInit: true })]}>
      {[...Array(5)].map((_, index) => (
        <Carousel.Item key={index}>
          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">
            {index + 1}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

import classes from "./carousel.module.css";

function CarouselHooksDemo({ plugins, orientation }: { orientation?: CarouselProps["orientation"]; plugins?: CarouselProps["plugins"] }) {
  const { carouselRef, stopOnHover, opts } = useCarousel({ orientation }, plugins);
  const dataState = { "data-orientation": opts.orientation };
  return (
    <div ref={carouselRef} className={merge("group/viewport", classes.viewport)} {...dataState}>
      <div className={classes.container} {...dataState}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={classes.content} {...dataState} {...stopOnHover}>
            <div className={classes.item} {...dataState}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: CarouselUsage,
  code: codes.usage,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: CarouselDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "spacing", type: "number", initialValue: 16, libraryValue: 16 },
    { prop: "height", type: "number", initialValue: 448, libraryValue: null, min: 320, max: 528 },
    { prop: "orientation", type: "select", initialValue: "horizontal", libraryValue: "horizontal", data: ["horizontal", "vertical"] },
    { prop: "withControls", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "withIndicators", type: "boolean", initialValue: false, libraryValue: false }
    // {
    //   prop: "opts",
    //   type: "object",
    //   controls: [
    //     { prop: "loop", type: "boolean", initialValue: false, libraryValue: false },
    //     { prop: "dragFree", type: "boolean", initialValue: false, libraryValue: false }
    //   ]
    // }
  ]
};

const configuratorHook: DataTrees = {
  type: "configurator",
  component: CarouselHooksDemo,
  code: [
    { fileName: "CarouselHooksDemo.tsx", code: codes.hooks, language: "tsx" },
    { fileName: "CarouselHooksDemo.module.css", code: codes.hooksCss, language: "scss" }
  ],
  centered: true,
  controls: [{ prop: "orientation", type: "select", initialValue: "horizontal", libraryValue: null, data: ["horizontal", "vertical"] }]
};

const autoScrollPlugins: DataTrees = {
  type: "code",
  component: CarouselAutoScrollDemo,
  code: codes.autoScrollPlugins,
  centered: true
};

const autoplayPlugins: DataTrees = {
  type: "code",
  component: CarouselAutoPlayDemo,
  code: codes.autoplayPlugins,
  centered: true
};

export const CarouselDemos = {
  usage,
  configurator,
  configuratorHook,
  autoScrollPlugins,
  autoplayPlugins
};
