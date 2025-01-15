
"use client";
import { useState } from "react";
import { Checker, type CheckerType } from "@/ui/checker";
import { CheckIcon, MoonStarIcon, SunIcon, XIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

function CheckerChangeIconLabels({ type, labelPosition }: { type?: CheckerType; labelPosition?: "left" | "right" }) {
  const sunIcon = (
    <SunIcon size={16} stroke={2} color="#fff" />
  );
  const moonIcon = (
    <MoonStarIcon size={16} stroke={2} color="rgb(34, 139, 230)" />
  );
  return (
    <Checker
      type={type}
      label={`${type} button`}
      onLabel={sunIcon}
      offLabel={moonIcon}
      color="#6e5494"
      labelPosition={labelPosition}
      className="cursor-pointer rounded-lg border px-3 py-2.5 font-medium transition-colors [&:has(input:checked)]:bg-[--colors]"
      style={{
        "--colors": `var(--${type}-bg)`
      }}
    />
  );
}

const data = [
  { value: "next", label: "Next.js", description: "A React framework for building server-rendered applications with great performance and scalability." },
  { value: "gatsby", label: "Gatsby", description: "A React-based framework optimized for building fast, static websites with GraphQL.", error: "Potential performance issues with large data sources due to build times." },
  { value: "remix", label: "Remix", description: "A full-stack framework for building modern web applications focused on user experience and performance.", error: "Limited ecosystem compared to Next.js and Gatsby." },
];

export function CheckerChangeThumbIcon({ type, labelPosition }: { type?: CheckerType; labelPosition?: "left" | "right" }) {
  const [value, setValue] = useState<string[] | string | null>([]);

  return (
    <>
      <Checker.Group multiple type={type} value={value} onChange={setValue} classNames={{ group: "gap-3" }} labelPosition={labelPosition}>
        {data.map(i => (
          <Checker.Card key={i.value} value={i.value}>
            <Checker
              {...i}
              id={i.value}
              icon={value?.includes(i.value) ? <CheckIcon size={12} stroke={3} color="green" /> : <XIcon size={12} stroke={3} color="red" />}
            />
          </Checker.Card>
        ))}
      </Checker.Group>
      <p className="mt-8 w-full text-left text-sm text-muted-foreground">CurrentValue: {value?.length ? JSON.stringify(value) : "-"}</p>
    </>
  );
}

export function Demo() {
  const { str: labelPosition, ...first } = __docs_demo.useDemo({ Str: "right" });
  const { str: type, ...six } = __docs_demo.useDemo({ Str: "switch" });
  return (
    <>
    <__docs_demo.area>
    <__docs_demo.comment title="// Change Icon Labels" className="mb-1.5 mr-auto" />
    {/* @ts-ignore */}
    <CheckerChangeIconLabels type={type} labelPosition={labelPosition} />
    <__docs_demo.comment title="// Change Thumb Icon" className="mb-1.5 mr-auto mt-16" />
    {/* @ts-ignore */}
    <CheckerChangeThumbIcon type={type} labelPosition={labelPosition} />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="type" values={["switch", "checkbox", "radio"]} str={type} {...six} />
    <__docs_demo.setSelect label="labelPosition" values={["left", "right"]} str={labelPosition} {...first} />
    </__docs_demo.controls>
    </>
  );
}
