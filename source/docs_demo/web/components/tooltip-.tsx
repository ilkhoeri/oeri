import { Tooltip } from "@/ui/tooltip";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: offset, side, align, boo: withArrow, ...x } = __docs_demo.useDemo({ Numb: 6, Side: "top" });
  const content = [...Array(4)].map((_, index) => (
    <span key={index}>Lorem ipsum...</span>
  ));

  return (
    <>
    <__docs_demo.area className="gap-8">
      <Tooltip
        touch
        side={side}
        align={align}
        content={content}
        sideOffset={offset}
        withArrow={withArrow}
        contentProps={{ className: "flex flex-col" }}
        className="flex h-9 items-center justify-center rounded-md border border-background bg-color px-2.5 text-background hover:bg-color/90 disabled:opacity-50"
      >
        <span>Tooltip</span>
      </Tooltip>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="sideOffset" min={4} max={32} value={offset} setNumb={x.setNumb} />
    <__docs_demo.setBoo label="withArrow" boo={withArrow} setBoo={x.setBoo} />
    <__docs_demo.setSideAlign side={side} align={align} setAlign={x.setAlign} setSide={x.setSide}/>
    </__docs_demo.controls>
    </>
  );
}
