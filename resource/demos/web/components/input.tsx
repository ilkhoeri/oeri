"use client";
import React from "react";
import { Input, type InputProps } from "@/ui/input";
import { Button } from "@/ui/button";
import { Stack } from "@/ui/stack";
import { Group } from "@/ui/group";
import { useListState } from "@/hooks/use-list-state";
import { sanitizedWord } from "@/utility/text-parser";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { purify } from "@/source/libs/dom-purify";

const codes = {
  usage:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\nimport { Button } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\nimport { Group } from "@/ui/group";\nimport { useListState } from "@/hooks/use-list-state";\nimport { sanitizedWord } from "@/utility/text-parser";\n\nconst initialValues = [\n  { label: "Receive email notifications", checked: false },\n  { label: "Receive sms notifications", checked: false },\n  { label: "Receive push notifications", checked: false },\n];\n\nexport function InputCheckboxDemo() {\n  const [isIndeterminate, setIsIndeterminate] = React.useState(false);\n  const [checked, setChecked] = React.useState(false);\n  const [values, handlers] = useListState(initialValues);\n\n  const allChecked = values.every((value) => value.checked);\n  const indeterminate = values.some((value) => value.checked) && !allChecked;\n\n  const items = values.map((value, index) => (\n    <Group key={index} className="w-max">\n      <Input\n        type="checkbox"\n        id={sanitizedWord(value.label)}\n        className="ml-8"\n        checked={value.checked}\n        onChange={(event) => handlers.setItemProp(index, "checked", event.currentTarget.checked)}\n      />\n      <label htmlFor={sanitizedWord(value.label)} className="text-sm text-muted-foreground">{value.label}</label>\n    </Group>\n  ));\n\n  return (\n    <Stack className="m-auto">\n      <Stack className="m-auto mb-8">\n        <Group className="w-max">\n          <Input\n          type="checkbox"\n          checked={allChecked}\n          indeterminate={indeterminate}\n          id="all-notifications"\n          onChange={() =>\n            handlers.setState((current) =>\n              current.map((value) => ({ ...value, checked: !allChecked }))\n            )\n          }\n        />\n        <label htmlFor="all-notifications" className="text-sm text-muted-foreground">Receive all notifications</label>\n      </Group>\n      {items}\n      </Stack>\n\n      <Stack className="m-auto border-t pt-8">\n        <Input\n          type="checkbox"\n          indeterminate={isIndeterminate}\n          checked={checked}\n          onChange={(e) => {\n            setChecked(e.target.checked);\n            // setIsIndeterminate(false); // Remove indeterminate status if clicked\n          }}\n        />\n        <Button onClick={() => setIsIndeterminate( i => !i )} className="w-max">\n          Indeterminate\n        </Button>\n        <p className="text-sm text-muted-foreground">Clicking the button will change the status to indeterminate.</p>\n      </Stack>\n    </Stack>\n  );\n}',
  configurator:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\n\nexport function InputDemo() {\n  const [value, setValue] = React.useState<string>("");\n  const [checked, setChecked] = React.useState<boolean>(false);\n\n  return (\n    <Input\n      {{props}}\n      value={value}\n      checked={checked}\n      onChange={e => setValue(e.target.value)}\n      onClick={() => setChecked(c => !c)}\n    />\n  );\n}'
};

const initialValues = [
  { label: "Receive email notifications", checked: false },
  { label: "Receive sms notifications", checked: false },
  { label: "Receive push notifications", checked: false }
];

function Demo() {
  const [isIndeterminate, setIsIndeterminate] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every(value => value.checked);
  const indeterminate = values.some(value => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Group key={index} className="w-max">
      <Input type="checkbox" id={sanitizedWord(value.label)} className="ml-8" checked={value.checked} onChange={event => handlers.setItemProp(index, "checked", event.currentTarget.checked)} />
      <label htmlFor={sanitizedWord(value.label)} className="text-sm text-muted-foreground">
        {value.label}
      </label>
    </Group>
  ));

  return (
    <Stack className="m-auto">
      <Stack className="m-auto mb-8">
        <Group className="w-max">
          <Input type="checkbox" checked={allChecked} indeterminate={indeterminate} id="all-notifications" onChange={() => handlers.setState(current => current.map(value => ({ ...value, checked: !allChecked })))} />
          <label htmlFor="all-notifications" className="text-sm text-muted-foreground">
            Receive all notifications
          </label>
        </Group>
        {items}
      </Stack>

      <Stack className="m-auto border-t pt-8">
        <Input
          type="checkbox"
          indeterminate={isIndeterminate}
          checked={checked}
          onChange={e => {
            setChecked(e.target.checked);
            // setIsIndeterminate(false); // Remove indeterminate status if clicked
          }}
        />
        <Button onClick={() => setIsIndeterminate(i => !i)} className="w-max">
          Indeterminate
        </Button>
        <p className="text-sm text-muted-foreground">Clicking the button will change the status to indeterminate.</p>
      </Stack>
    </Stack>
  );
}

function ConfiguratorDemo(props: InputProps) {
  const [value, setValue] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);

  return <Input {...props} value={purify(value)} checked={checked} onChange={e => setValue(e.target.value)} onClick={() => setChecked(c => !c)} />;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "h-52 w-full centered" },
  controls: [
    {
      prop: "type",
      type: "select",
      initialValue: "text",
      libraryValue: null,
      data: ["numeric", "phone", "float", "button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]
    }
  ]
};

export const InputDemos = {
  usage,
  configurator
};
