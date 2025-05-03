"use client";
import { useState } from "react";
import { Group } from "@/ui/group";
import { Checker, type CheckerProps, type CheckerGroupProps } from "@/ui/checker";
import { MoonStarIcon, SunIcon, CheckIcon, XIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { useListState } from "@/hooks/use-list-state";
import { Stack } from "@/ui/stack";
import { Typography } from "@/ui/typography";
import { ConfiguratorControlOptions } from "@/resource/docs_demo/assets/demo-config";
import { createSelectControl } from "@/resource/docs_demo/controls/transform-select-data";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { Group } from "@/ui/group";\n\nexport function CheckerDemo() {\n  const [checked, setChecked] = useState(false);\n  return (\n    <Group>\n      <Checker label="Switch" />\n      <Checker type="checkbox" label="Checkbox" />\n      <Checker type="radio" label="Radio" checked={checked} onClick={() => setChecked(c => !c)} />\n    </Group>\n  );\n}',
  configurator:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\n\nexport function CheckerDemo() {\n  const [checked, setChecked] = useState(false);\n  return <Checker{{props}} onLabel="ON" offLabel="OFF" defaultChecked checked={checked} onCheckedChange={event => setChecked(event.currentTarget.checked)} />;\n}',
  changeIconLabels:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { MoonStarIcon, SunIcon } from "@/icons/*";\n\n\nexport function CheckerChangeIconLabels() {\n  return (\n    <Checker\n      {{props}}\n      color="#543a7b"\n      label="Icon Labels"\n      onLabel={<SunIcon size={16} stroke={2} color="#fff" />}\n      offLabel={<MoonStarIcon size={16} stroke={2} color="rgb(34, 139, 230)" />}\n      className="cursor-pointer rounded-xl border px-3 py-2.5 font-medium transition-colors [&:has(input:checked)]:bg-[#6e5494]"\n    />\n  );\n}',
  changeThumbIcon:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { CheckIcon, XIcon } from "@/icons/*";\n\n\nexport function CheckerChangeThumbIcon() {\n  const [checked, setChecked] = useState(false);\n  return (\n    <Checker\n      {{props}}\n      size={36}\n      color="#930464"\n      label="Icon Labels"\n      checked={checked}\n      onCheckedChange={event => setChecked(event.currentTarget.checked)}\n      onLabel="ON"\n      offLabel="OFF"\n      icon={checked ? <CheckIcon animation size={22} stroke={3} /> : <XIcon animation size={22} stroke={3} />}\n      classNames={{ track: "[&_svg]:text-red-500 [&>svg]:data-[checkbox]:data-[checked]:text-yellow-500 [&>svg]:data-[radio]:data-[checked]:text-color", thumb: "[&>svg]:data-[switch]:data-[checked]:text-red-900" }}\n    />\n  );\n}',
  group:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { Group } from "@/ui/group";\n\nconst data = [\n  { value: "react", label: "React" },\n  { value: "svelte", label: "Svelte" },\n  { value: "ng", label: "Angular" },\n  { value: "vue", label: "Vue" }\n];\n\nexport function CheckerGroupDemo() {\n  const [value, setValue] = useState<string[] | string | null>(["react", "ng"]);\n  return (\n    <Checker.Group{{props}} value={value} onValueChange={setValue}>\n      <Group>\n        {data.map(i => (\n          <Checker key={i.value} id={i.value} {...i} />\n        ))}\n      </Group>\n    </Checker.Group>\n  );\n}',
  groupCard:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { Group } from "@/ui/group";\n\nconst data = [\n  { value: "react", label: "React" },\n  { value: "svelte", label: "Svelte" },\n  { value: "ng", label: "Angular" },\n  { value: "vue", label: "Vue" }\n];\n\nexport function CheckerGroupCardDemo() {\n  const [value, setValue] = useState<string[] | string | null>(["react", "ng"]);\n  return (\n    <Checker.Group{{props}} value={value} onValueChange={setValue} classNames={{ group: "grid grid-cols-2 gap-2" }}>\n      {data2.map(i => (\n        <Checker.Card key={i.value} value={i.value}>\n          <Checker id={i.value} {...i} />\n        </Checker.Card>\n      ))}\n    </Checker.Group>\n  );\n}',
  currentSelected:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { Group } from "@/ui/group";\nimport { Stack } from "@/ui/stack";\nimport { Typography } from "@/ui/typography";\n\nconst data = [\n  { value: "react", label: "React", description: "A JavaScript library for building user interfaces." },\n  { value: "svelte", label: "Svelte", description: "A compiler that generates minimal and efficient JavaScript code." },\n  { value: "ng", label: "Angular", description: "A platform for building mobile and desktop web applications." },\n  { value: "vue", label: "Vue", description: "A progressive JavaScript framework for building UI.", error: "Compatibility issues with older versions of Internet Explorer." },\n];\n\nexport function CheckerCurrentSelectedDemo() {\n  const [value, setValue] = useState<string | string[] | null>(null);\n\n  const cards = data.map(i => (\n    <Checker.Card key={i.value} value={i.value}>\n      <Checker id={i.value} {...i} />\n    </Checker.Card>\n  ));\n\n  return (\n    <Stack>\n      <Checker.Group{{props}} value={value} onValueChange={setValue}>\n        <Group>{cards}</Group>\n      </Checker.Group>\n\n      <Typography prose="p" className="mt-8">\n        CurrentValue: {value || "–"}\n      </Typography>\n    </Stack>\n  );\n}',
  multipleSelected:
    '"use client";\nimport { useState } from "react";\nimport { Checker } from "@/ui/checker";\nimport { CheckIcon, XIcon } from "@/icons/*";\n\nconst data = [\n  { value: "next", label: "Next.js", description: "A React framework for building server-rendered applications with great performance and scalability." },\n  { value: "gatsby", label: "Gatsby", description: "A React-based framework optimized for building fast, static websites with GraphQL.", error: "Potential performance issues with large data sources due to build times." },\n  { value: "remix", label: "Remix", description: "A full-stack framework for building modern web applications focused on user experience and performance.", error: "Limited ecosystem compared to Next.js and Gatsby." },\n];\n\nexport function CheckerMultipleSelectedDemo() {\n  const [value, setValue] = useState<string[] | string | null>([]);\n\n  return (\n    <>\n      <Checker.Group{{props}} multiple value={value} onValueChange={setValue} classNames={{ group: "gap-3" }}>\n        {data.map(i => (\n          <Checker.Card key={i.value} value={i.value}>\n            <Checker\n              {...i}\n              id={i.value}\n              icon={value?.includes(i.value) ? <CheckIcon size={12} stroke={3} color="green" /> : <XIcon size={12} stroke={3} color="red" />}\n            />\n          </Checker.Card>\n        ))}\n      </Checker.Group>\n      <p className="mt-8 w-full text-left text-sm text-muted-foreground">CurrentValue: {value?.length ? JSON.stringify(value) : "-"}</p>\n    </>\n  );\n}',
  indeterminate:
    '"use client";\nimport { Checker } from "@/ui/checker";\nimport { useListState } from "@/hooks/use-list-state";\n\nconst initialValues = [\n  { label: "Receive email notifications", checked: false },\n  { label: "Receive sms notifications", checked: false },\n  { label: "Receive push notifications", checked: false }\n];\n\nexport function CheckerIndeterminateStateDemo() {\n  const [values, handlers] = useListState(initialValues);\n\n  const allChecked = values.every(value => value.checked);\n  const indeterminate = values.some(value => value.checked) && !allChecked;\n\n  const items = values.map((value, index) => (\n    <Checker\n      type="checkbox"\n      key={index}\n      label={value.label}\n      className="ml-8 mt-2"\n      checked={value.checked}\n      onCheckedChange={event => handlers.setItemProp(index, "checked", event.currentTarget.checked)}\n    />\n  ));\n\n  return (\n    <div className="m-auto grid grid-flow-row">\n      <Checker\n        type="checkbox"\n        checked={allChecked}\n        indeterminate={indeterminate}\n        label="Receive all notifications"\n        onCheckedChange={() => handlers.setState(current => current.map(value => ({ ...value, checked: !allChecked })))}\n      />\n      {items}\n    </div>\n  );\n}'
};

export function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Group>
      <Checker label="Switch" />
      <Checker type="checkbox" label="Checkbox" />
      <Checker type="radio" label="Radio" checked={checked} onClick={() => setChecked(c => !c)} />
    </Group>
  );
}

function CheckerDemo(props: CheckerProps) {
  const [checked, setChecked] = useState(false);
  return <Checker {...props} onLabel="ON" offLabel="OFF" defaultChecked checked={checked} onCheckedChange={event => setChecked(event.currentTarget.checked)} />;
}

function CheckerChangeIconLabels(props: CheckerProps) {
  return (
    <Checker {...props} label="Icon Labels" color="#543a7b" onLabel={<SunIcon size={16} stroke={2} color="#fff" />} offLabel={<MoonStarIcon size={16} stroke={2} color="rgb(34, 139, 230)" />} className="cursor-pointer rounded-xl border px-3 py-2.5 font-medium transition-colors [&:has(input:checked)]:bg-[#6e5494]" />
  );
}

function CheckerChangeThumbIcon(props: CheckerProps) {
  const [checked, setChecked] = useState(false);

  return (
    <Checker
      {...props}
      size={36}
      color="#930464"
      label="Icon Labels"
      checked={checked}
      onCheckedChange={event => setChecked(event.currentTarget.checked)}
      onLabel="ON"
      offLabel="OFF"
      icon={checked ? <CheckIcon animation size={22} stroke={3} /> : <XIcon animation size={22} stroke={3} />}
      classNames={{ track: "[&_svg]:text-red-500 [&>svg]:data-[checkbox]:data-[checked]:text-yellow-500 [&>svg]:data-[radio]:data-[checked]:text-color", thumb: "[&>svg]:data-[switch]:data-[checked]:text-red-900" }}
    />
  );
}

<div className=" "></div>;
const data2 = [
  { value: "react", label: "React" },
  { value: "svelte", label: "Svelte" },
  { value: "ng", label: "Angular" },
  { value: "vue", label: "Vue" }
];

function CheckerGroupDemo(props: CheckerGroupProps) {
  const [value, setValue] = useState<string[] | string | null>(["react", "ng"]);
  return (
    <Checker.Group {...props} value={value} onValueChange={setValue}>
      <Group>
        {data2.map(i => (
          <Checker key={i.value} id={`group-${i.value}`} {...i} />
        ))}
      </Group>
    </Checker.Group>
  );
}

function CheckerGroupCardDemo(props: CheckerGroupProps) {
  const [value, setValue] = useState<string[] | string | null>(["react", "ng"]);
  return (
    <Checker.Group {...props} value={value} onValueChange={setValue} classNames={{ group: "grid grid-cols-2 gap-2" }}>
      {data2.map(i => (
        <Checker.Card key={i.value} value={i.value}>
          <Checker id={i.value} {...i} />
        </Checker.Card>
      ))}
    </Checker.Group>
  );
}

const data3 = [
  { value: "react", label: "React", description: "A JavaScript library for building user interfaces." },
  { value: "svelte", label: "Svelte", description: "A compiler that generates minimal and efficient JavaScript code." },
  { value: "ng", label: "Angular", description: "A platform for building mobile and desktop web applications." },
  { value: "vue", label: "Vue", description: "A progressive JavaScript framework for building UI.", error: "Compatibility issues with older versions of Internet Explorer." }
];

function CheckerCurrentSelectedDemo(props: CheckerGroupProps) {
  const [value, setValue] = useState<string | string[] | null>(null);

  const cards = data3.map(i => (
    <Checker.Card key={i.value} value={i.value}>
      <Checker id={i.value} {...i} />
    </Checker.Card>
  ));

  return (
    <Stack>
      <Checker.Group {...props} value={value} onValueChange={setValue}>
        <Group>{cards}</Group>
      </Checker.Group>

      <Typography prose="p" className="mt-8">
        CurrentValue: {value || "–"}
      </Typography>
    </Stack>
  );
}

const datamultipleSelect = [
  { value: "next", label: "Next.js", description: "A React framework for building server-rendered applications with great performance and scalability." },
  {
    value: "gatsby",
    label: "Gatsby",
    description: "A React-based framework optimized for building fast, static websites with GraphQL.",
    error: "Potential performance issues with large data sources due to build times."
  },
  {
    value: "remix",
    label: "Remix",
    description: "A full-stack framework for building modern web applications focused on user experience and performance.",
    error: "Limited ecosystem compared to Next.js and Gatsby."
  }
];

function CheckerMultipleSelectedDemo(props: CheckerGroupProps) {
  const [value, setValue] = useState<string[] | string | null>([]);

  return (
    <>
      <Checker.Group {...props} multiple value={value} onValueChange={setValue} classNames={{ group: "gap-3" }}>
        {datamultipleSelect.map(i => (
          <Checker.Card key={i.value} value={i.value}>
            <Checker {...i} id={i.value} icon={value?.includes(i.value) ? <CheckIcon animation size={12} stroke={3} color="green" /> : <XIcon animation size={12} stroke={3} color="red" />} />
          </Checker.Card>
        ))}
      </Checker.Group>
      <p className="mt-8 w-full text-left text-sm text-muted-foreground">CurrentValue: {value?.length ? JSON.stringify(value) : "-"}</p>
    </>
  );
}

const initialValues = [
  { label: "Receive email notifications", checked: false },
  { label: "Receive sms notifications", checked: false },
  { label: "Receive push notifications", checked: false }
];

function CheckerIndeterminateStateDemo() {
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every(value => value.checked);
  const indeterminate = values.some(value => value.checked) && !allChecked;

  const items = values.map((value, index) => <Checker type="checkbox" key={index} label={value.label} className="ml-8 mt-2" checked={value.checked} onCheckedChange={event => handlers.setItemProp(index, "checked", event.currentTarget.checked)} />);

  return (
    <div className="m-auto grid grid-flow-row">
      <Checker type="checkbox" checked={allChecked} indeterminate={indeterminate} label="Receive all notifications" onCheckedChange={() => handlers.setState(current => current.map(value => ({ ...value, checked: !allChecked })))} />
      {items}
    </div>
  );
}

const propType: ConfiguratorControlOptions[] = createSelectControl([
  { prop: "type", initialValue: "switch", libraryValue: "switch", data: ["switch", "checkbox", "radio"] as const },
  { prop: "labelPosition", initialValue: "right", libraryValue: "right", data: ["left", "right"] as const }
]);

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: CheckerDemo,
  code: codes.configurator,
  controls: [
    ...propType,
    { prop: "size", type: "number", initialValue: 20, libraryValue: 20 },
    { prop: "label", type: "string", initialValue: "I agree to sell my privacy", libraryValue: "" },
    { prop: "description", type: "string", initialValue: "", libraryValue: "" },
    { prop: "error", type: "string", initialValue: "", libraryValue: "" },
    { prop: "color", type: "color", initialValue: "#0076f5", libraryValue: "#0076f5" },
    { prop: "required", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "disabled", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const changeIconLabels: DataTrees = {
  type: "configurator",
  component: CheckerChangeIconLabels,
  code: codes.changeIconLabels,
  centered: true,
  controls: createSelectControl([
    { prop: "type", initialValue: "switch", libraryValue: null, data: ["switch", "checkbox", "radio"] as const },
    { prop: "labelPosition", initialValue: "right", libraryValue: "right", data: ["left", "right"] as const }
  ])
};

const changeThumbIcon: DataTrees = {
  type: "configurator",
  component: CheckerChangeThumbIcon,
  code: codes.changeThumbIcon,
  centered: true,
  controls: createSelectControl([
    { prop: "type", initialValue: "switch", libraryValue: null, data: ["switch", "checkbox", "radio"] },
    { prop: "labelPosition", initialValue: "right", libraryValue: "right", data: ["left", "right"] }
  ])
};

const group: DataTrees = {
  type: "configurator",
  component: CheckerGroupDemo,
  code: codes.group,
  centered: true,
  controls: [
    ...propType,
    { prop: "size", type: "number", initialValue: 20, libraryValue: 20, min: 8, max: 60 },
    { prop: "label", type: "string", initialValue: "Select your favorite framework/library", libraryValue: "" },
    { prop: "description", type: "string", initialValue: "This is anonymous", libraryValue: "" },
    { prop: "error", type: "string", initialValue: "", libraryValue: "" },
    { prop: "color", type: "color", initialValue: "#0076f5", libraryValue: "#0076f5", swatches: ["#6e5494", "#436ab2", "#b11c66"] },
    { prop: "required", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "disabled", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const groupCard: DataTrees = {
  type: "configurator",
  component: CheckerGroupCardDemo,
  code: codes.groupCard,
  centered: true,
  controls: propType
};

const currentSelected: DataTrees = {
  type: "configurator",
  component: CheckerCurrentSelectedDemo,
  code: codes.currentSelected,
  centered: true,
  controls: propType
};

const multipleSelected: DataTrees = {
  type: "configurator",
  component: CheckerMultipleSelectedDemo,
  code: codes.multipleSelected,
  centered: true,
  controls: propType
};

const indeterminate: DataTrees = {
  type: "code",
  component: CheckerIndeterminateStateDemo,
  code: codes.indeterminate,
  centered: true
};

export const CheckerDemos = {
  usage,
  configurator,
  changeIconLabels,
  changeThumbIcon,
  group,
  groupCard,
  currentSelected,
  multipleSelected,
  indeterminate
};
