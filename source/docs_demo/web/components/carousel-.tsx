"use client";
import { Carousel } from "@/ui/carousel"
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: orientation, numb: height, boo: dragFree, ...first } = __docs_demo.useDemo({ Str: "horizontal", Numb: 448 });
  const { boo: loop, numb: spacing, ...second } = __docs_demo.useDemo({ Boo: true, Numb: 16 });
  const { boo: withControls, ...third } = __docs_demo.useDemo({});
  const { boo: withIndicators, ...fourth } = __docs_demo.useDemo({ Boo: true });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Carousel
      spacing={spacing}
      height={height || 448}
      // @ts-ignore
      orientation={orientation}
      withControls={withControls}
      withIndicators={withIndicators}
      opts={{ dragFree: dragFree, loop: loop }}
      classNames={{ root: "", content: "" }}
      // plugins={[AutoScroll({ playOnInit: true, speed: 0.35, direction: "backward" })]}
    >
      {[...Array(5)].map((_, index) => (
        <Carousel.Item key={index}>
          <div className="flex h-64 w-[300px] min-w-[300px] items-center justify-center rounded-lg border bg-background text-muted shadow-sm font-heading">
            {index + 1}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="orientation" values={["horizontal", "vertical"]} str={orientation} setStr={first.setStr}/>
    <__docs_demo.setRange label="height" value={height} setNumb={first.setNumb} min="256" max="448" />
    <__docs_demo.setRange label="spacing" value={spacing} setNumb={second.setNumb} min="4" max="42" />
    <__docs_demo.setBoo label="dragFree" booleanish={false} boo={dragFree} setBoo={first.setBoo} />
    <__docs_demo.setBoo label="loop" booleanish={false} boo={loop} setBoo={second.setBoo} />
    <__docs_demo.setBoo label="withControls" booleanish={false} boo={withControls} setBoo={third.setBoo} />
    <__docs_demo.setBoo label="withIndicators" booleanish={false} boo={withIndicators} setBoo={fourth.setBoo} />
    </__docs_demo.controls>
    </__docs_demo>
  )
}
