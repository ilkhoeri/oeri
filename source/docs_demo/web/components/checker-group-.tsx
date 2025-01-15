
"use client";
import { useState } from "react";
import { Checker } from "@/ui/checker";
import { __docs_demo } from "../../__docs_demo";
import { Group } from "@/ui/group";

const data = [
  { value: "react", label: "React" },
  { value: "svelte", label: "Svelte" },
  { value: "ng", label: "Angular" },
  { value: "vue", label: "Vue" },
]

export function Demo() {
  const { boo: disabled, numb: size, str: labelPosition, ...first } = __docs_demo.useDemo({ Numb: 20, Str: "right" });
  const { boo: required, numb: number, str: color, ...second } = __docs_demo.useDemo({ Numb: 5, Str: "#0076f5" });
  const { str: label, ...third } = __docs_demo.useDemo({ Str: "Select your favorite framework/library", Boo: false });
  const { str: description, ...fourth } = __docs_demo.useDemo({ Str: "This is anonymous"});
  const { str: error, ...five } = __docs_demo.useDemo({});
  const { str: type, ...six } = __docs_demo.useDemo({ Str: "switch" });
  const [value, setValue] = useState<string[] | string | null>(["react", "ng"]);
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Checker.Group
      // @ts-ignore
      type={type}
      value={value}
      onChange={setValue}
      size={size} // @ts-ignore
      color={color} // @ts-ignore
      disabled={disabled} // @ts-ignore
      required={required} // @ts-ignore
      labelPosition={labelPosition} // @ts-ignore
      label={label} // @ts-ignore
      description={description} // @ts-ignore
      error={error} // @ts-ignore
    >
      <Group>
        {data.map(i => <Checker key={i.value} id={i.value} {...i} />)}
      </Group>
    </Checker.Group>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="type" values={["switch", "checkbox", "radio"]} str={type} {...six} />
    <__docs_demo.setSelect label="labelPosition" values={["left", "right"]} str={labelPosition} {...first} />
    <__docs_demo.setText placeholder="label" str={label} setStr={third.setStr} />
    <__docs_demo.setText placeholder="description" str={description} setStr={fourth.setStr} />
    <__docs_demo.setText placeholder="error" str={error} setStr={five.setStr} />
    <__docs_demo.setRange label="size" value={size} setNumb={first.setNumb} min="16" max="40" />
    <__docs_demo.setBoo label="disabled" boo={disabled} setBoo={first.setBoo} />
    <__docs_demo.setBoo label="required" boo={required} setBoo={second.setBoo} />
    <__docs_demo.setColor format="hex" swatches={["#6e5494", "#436ab2", "#b11c66"]} str={color} {...second} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
