import { Tooltip } from "@/modules/components/web";
// prettier-ignore
import { SetProps, SetPropsBoolean, SetPropsRange, SetPropsSideAlign, useSetProps} from "../../__set_props";

export function Demo() {
  const { numb: offset, side, align, boo: withArrow, ...x } = useSetProps({ Numb: 6, Side: "top" });
  const content = [...Array(4)].map((_, index) => (
    <span key={index}>Lorem ipsum...</span>
  ));

  function Hover({ label }: { label: string }) {
    return (
      <Tooltip
        asChild
        touch
        content={`What's ${label}?`}
        side={side}
        align={align}
        sideOffset={offset}
        withArrow={withArrow}
        contentProps={{
          className:
            "bg-color text-background [&_[data-tooltip]]:text-color font-medium"
        }}
      >
        <mark>{label}</mark>
      </Tooltip>
    );
  }
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-8">
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

      <p className="w-80 text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
        <Hover label="Blanditiis" /> dolor placeat odit{" "}
        <Hover label="reprehenderit" /> expedita nisi ab natus inventore
        consectetur a? <Hover label="Quibusdam" /> harum sapiente voluptas nam
        quaerat odit, atque, iusto repellendus expedita, nostrum aperiam magni
        perspiciatis!
      </p>
      {/* prettier-ignore */}
      <SetProps.Wrapper>
        <SetPropsRange label="sideOffset" value={offset} setNumb={x.setNumb} />
        <SetPropsSideAlign side={side} align={align} setAlign={x.setAlign} setSide={x.setSide}/>
        <SetPropsBoolean label="withArrow" boo={withArrow} setBoo={x.setBoo} />
      </SetProps.Wrapper>
    </div>
  );
}
