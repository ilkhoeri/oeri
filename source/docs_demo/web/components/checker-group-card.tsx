
"use client";
import { useState } from "react";
import { Checker } from "@/ui/checker";
import { __docs_demo } from "../../__docs_demo";
import { Group } from "@/ui/group";

const data = [
  { value: "react", label: "React", description: "A JavaScript library for building user interfaces." },
  { value: "svelte", label: "Svelte", description: "A compiler that generates minimal and efficient JavaScript code." },
  { value: "ng", label: "Angular", description: "A platform for building mobile and desktop web applications." },
  { value: "vue", label: "Vue", description: "A progressive JavaScript framework for building UI.", error: "Compatibility issues with older versions of Internet Explorer." },
];

export function Demo() {
  const { str: labelPosition, ...first } = __docs_demo.useDemo({ Str: "right" });
  const { str: type, ...six } = __docs_demo.useDemo({ Str: "switch" });
  const [value, setValue] = useState<string | string[] | null>(null);

  const cards = data.map((i) => (
    <Checker.Card key={i.value} value={i.value}>
      <Checker id={i.value} {...i} />
    </Checker.Card>
  ));

  return (
    <>
    <__docs_demo.area>
    <Checker.Group
      value={value}
      onChange={setValue}
      // @ts-ignore
      type={type} // @ts-ignore
      labelPosition={labelPosition} // @ts-ignore
    >
      <Group>{cards}</Group>
    </Checker.Group>

    <p className="mt-8 w-full text-left text-sm text-muted-foreground">
      CurrentValue: {value || '–'}
    </p>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="type" values={["switch", "checkbox", "radio"]} str={type} {...six} />
    <__docs_demo.setSelect label="labelPosition" values={["left", "right"]} str={labelPosition} {...first} />
    </__docs_demo.controls>
    </>
  );
}
