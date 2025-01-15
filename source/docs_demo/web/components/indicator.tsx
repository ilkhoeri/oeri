import Image from "next/image";
import { Indicator } from "@/ui/indicator";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, boo: disabled, str: color, ...first } = __docs_demo.useDemo({ Numb: 10, Str: "hsl(211.1deg 100% 48.04%)" });
  const { boo: processing, str: position, ...second } = __docs_demo.useDemo({ Numb: 4, Str: "top-end" });
  const { boo: withBorder, ...third } = __docs_demo.useDemo({ Numb: 4, Str: "top-end" });
  return (
    <__docs_demo>
      <__docs_demo.area>
        {/* @ts-ignore */}
      <Indicator position={position} processing={processing} size={size} color={color} disabled={disabled} withBorder={withBorder}>
        <Image
          unoptimized
          alt=""
          height="60"
          width="60"
          src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude"
          className="rounded-md"
        />
      </Indicator>
      </__docs_demo.area>
      <__docs_demo.controls>
      <__docs_demo.setRange label="Size" value={size} setNumb={first.setNumb} min="4" max="32" />
      <__docs_demo.setBoo label="disabled" booleanish={false} boo={disabled} setBoo={first.setBoo} />
      <__docs_demo.setBoo label="processing" booleanish={false} boo={processing} setBoo={second.setBoo} />
      <__docs_demo.setBoo label="withBorder" booleanish={false} boo={withBorder} setBoo={third.setBoo} />
      <__docs_demo.setColor str={color} setStr={first.setStr} />
      <__docs_demo.setSelect label="Position" values={["top-start", "top-center", "top-end", "middle-start", "middle-center", "middle-end", "bottom-start", "bottom-center", "bottom-end"]} str={position} setStr={second.setStr}/>
      </__docs_demo.controls>
    </__docs_demo>
  );
}