"use client";
import React from "react";
import { Input, InputWrapperProps, type InputProps } from "@/ui/input";
import { Button } from "@/ui/button";
import { Stack } from "@/ui/stack";
import { Group } from "@/ui/group";
import { useListState } from "@/hooks/use-list-state";
import { sanitizedWord } from "@/utils/text-parser";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { purify } from "@/source/libs/dom-purify";

const codes = {
  checkbox:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\nimport { Stack } from "@/ui/stack";\nimport { Group } from "@/ui/group";\nimport { useListState } from "@/hooks/use-list-state";\nimport { sanitizedWord } from "@/utils/text-parser";\n\nconst initialValues = [\n  { label: "Receive sms notifications", checked: false },\n  { label: "Receive email notifications", checked: true },\n  { label: "Receive push notifications", checked: false },\n];\n\nexport function InputCheckboxDemo() {\n  const [values, handlers] = useListState(initialValues);\n\n  const allChecked = values.every(value => value.checked);\n  const indeterminate = values.some(value => value.checked) && !allChecked;\n\n  const items = values.map((value, index) => (\n    <Group key={index} className=\"w-max\">\n      <Input type=\"checkbox\" id={sanitizedWord(value.label)} className=\"ml-8\" checked={value.checked} onChange={event => handlers.setItemProp(index, \"checked\", event.currentTarget.checked)} />\n      <label htmlFor={sanitizedWord(value.label)} className=\"text-sm text-muted-foreground\">\n        {value.label}\n      </label>\n    </Group>\n  ));\n\n  return (\n    <Stack className=\"m-auto mb-8\">\n      <Group className=\"w-max\">\n        <Input type=\"checkbox\" checked={allChecked} indeterminate={indeterminate} id=\"all-notifications\" onChange={() => handlers.setState(current => current.map(value => ({ ...value, checked: !allChecked })))} />\n        <label htmlFor=\"all-notifications\" className=\"text-sm text-muted-foreground\">\n          Receive all notifications\n        </label>\n      </Group>\n      {items}\n    </Stack>\n  );\n}',
  checkboxIndeterminate:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\nimport { Button } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\n\nexport function CheckboxIndeterminateDemo() {\n  const [isIndeterminate, setIsIndeterminate] = React.useState(false);\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Stack className="m-auto border-t pt-8">\n      <Input\n        type="checkbox"\n        indeterminate={isIndeterminate}\n        checked={checked}\n        onChange={e => {\n          setChecked(e.target.checked);\n          // setIsIndeterminate(false); // Remove indeterminate status if clicked\n        }}\n      />\n      <Button onClick={() => setIsIndeterminate(i => !i)} className="w-max">\n        Indeterminate\n      </Button>\n      <p className="text-sm text-muted-foreground">Clicking the button will change the status to indeterminate.</p>\n    </Stack>\n  );\n}',
  configurator:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\n\nexport function InputDemo() {\n  const [value, setValue] = React.useState<string>("");\n  const [checked, setChecked] = React.useState<boolean>(false);\n\n  return (\n    <Input\n      {{props}}\n      value={value}\n      checked={checked}\n      onChange={e => setValue(e.target.value)}\n      onClick={() => setChecked(c => !c)}\n    />\n  );\n}',
  password: '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\n\nexport function InputPasswordDemo() {\n  const [value, setValue] = React.useState<string>("");\n\n  return <Input.Password value={value} onChange={e => setValue(e.target.value)} />;\n}',
  wrapper: 'import { Input } from "@/ui/input";\n\nexport function WrapperDemo() {\n  return (\n    <Input.Wrapper{{props}}>\n      <Input placeholder="enter here" />\n    </Input.Wrapper>\n  );\n}'
};

const initialValues = [
  { label: "Receive sms notifications", checked: false },
  { label: "Receive email notifications", checked: true },
  { label: "Receive push notifications", checked: false }
];

export function InputCheckboxDemo() {
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
    <Stack className="m-auto mb-8">
      <Group className="w-max">
        <Input type="checkbox" checked={allChecked} indeterminate={indeterminate} id="all-notifications" onChange={() => handlers.setState(current => current.map(value => ({ ...value, checked: !allChecked })))} />
        <label htmlFor="all-notifications" className="text-sm text-muted-foreground">
          Receive all notifications
        </label>
      </Group>
      {items}
    </Stack>
  );
}

function CheckboxIndeterminateDemo() {
  const [isIndeterminate, setIsIndeterminate] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  return (
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
  );
}

function ConfiguratorDemo(props: InputProps) {
  const [value, setValue] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);

  return <Input {...props} value={purify(value)} checked={checked} onChange={e => setValue(e.target.value)} onClick={() => setChecked(c => !c)} />;
}

function PasswordDemo() {
  const [value, setValue] = React.useState<string>("");

  return <Input.Password value={purify(value)} onChange={e => setValue(e.target.value)} />;
}

function WrapperDemo(props: InputWrapperProps) {
  return (
    <Input.Wrapper {...props}>
      <Input placeholder="enter here" />
    </Input.Wrapper>
  );
}

const checkboxUsage: DataTrees = {
  type: "code",
  component: InputCheckboxDemo,
  code: codes.checkbox,
  defaultExpanded: false
};

const checkboxIndeterminate: DataTrees = {
  type: "code",
  component: CheckboxIndeterminateDemo,
  code: codes.checkboxIndeterminate,
  defaultExpanded: false
};

const password: DataTrees = {
  type: "code",
  component: PasswordDemo,
  code: codes.password
};

const wrapperAndConfigurator: DataTrees = {
  type: "configurator",
  component: WrapperDemo,
  code: codes.wrapper,
  centered: true,
  classNames: { demoInner: "min-h-52 w-full centered my-8" },
  controls: [
    { prop: "label", type: "string", initialValue: null, libraryValue: null },
    { prop: "description", type: "string", initialValue: null, libraryValue: null },
    { prop: "error", type: "string", initialValue: null, libraryValue: null },
    { prop: "withAsterisk", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "size", type: "number", initialValue: 14, libraryValue: undefined, min: 12, max: 32 }
  ]
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
  configurator,
  password,
  wrapperAndConfigurator,
  checkboxUsage,
  checkboxIndeterminate
};
