"use client";
import { useState } from "react";
import { Stack } from "@/ui/stack";
import { Textarea, type TextareaProps } from "@/ui/textarea";
import { Typography } from "@/ui/typography";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { purify } from "@/source/libs/dom-purify";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Stack } from "@/ui/stack";\nimport { Textarea } from "@/ui/textarea";\nimport { Typography } from "@/ui/typography";\n\nexport function TextareaDemo() {\n  const [value, setValue] = useState<string>("");\n\n  return (\n    <Stack className="mx-auto w-full max-w-xl">\n      <Typography prose="label" htmlFor="textarea-demo">Textarea will autosize to fit the content</Typography>\n      <Textarea{{props}} id="textarea-demo" placeholder="Enter Text here" value={value} onChange={e => setValue(e.currentTarget.value)} />\n    </Stack>\n  );\n}',
  validateJson:
    '"use client";\nimport { useState } from "react";\nimport { Stack } from "@/ui/stack";\nimport { Textarea } from "@/ui/textarea";\nimport { Typography } from "@/ui/typography";\n\nexport function TextareaValidateJsonDemo() {\n  const [error, setError] = useState<Error | null>(null);\n\n  return (\n    <Stack className="mx-auto w-full max-w-xl">\n      <Typography prose="label" htmlFor="textarea-validatejson-demo">Textarea with validate JSON</Typography>\n      <Textarea\n        validateJson\n        formatOnBlur\n        id="textarea-validatejson-demo"\n        validationError="Invalid JSON"\n        onValidationError={error => setError(error)}\n        className="max-w-xl"\n        placeholder="Enter JSON here"\n      />\n      <Typography el="label" htmlFor="textarea-validatejson-demo" hidden={!error} className="-my-2 text-sm text-destructive">{error?.message}</Typography>\n      <Typography prose="muted">Enter inline text in JSON format and blur from Textarea component to format the text.</Typography>\n    </Stack>\n  );\n}'
};

function Demo(props: TextareaProps) {
  const [value, setValue] = useState<string>("");

  return (
    <Stack className="mx-auto w-full max-w-xl">
      {/* @ts-ignore */}
      <Typography prose="label" htmlFor="textarea-demo">
        Textarea will autosize to fit the content
      </Typography>
      <Textarea {...props} id="textarea-demo" placeholder="Enter Text here" value={purify(value)} onChange={e => setValue(e.currentTarget.value)} />
    </Stack>
  );
}

function ValidateJsonDemo() {
  const [error, setError] = useState<Error | null>(null);

  return (
    <Stack className="mx-auto w-full max-w-xl">
      {/* @ts-ignore */}
      <Typography prose="label" htmlFor="textarea-validatejson-demo">
        Textarea with validate JSON
      </Typography>
      <Textarea
        validateJson
        formatOnBlur
        id="textarea-validatejson-demo"
        validationError="Invalid JSON"
        onValidationError={error => setError(error)}
        className="max-w-xl"
        placeholder="Enter JSON here, example: [{}]"
      />
      <Typography el="label" htmlFor="textarea-validatejson-demo" hidden={!error} className="-my-2 text-sm text-destructive">
        {error?.message}
      </Typography>

      <Typography prose="muted">Enter inline text in JSON format and blur from Textarea component to format the text.</Typography>
    </Stack>
  );
}

const usage: DataTrees = {
  type: "configurator",
  component: Demo,
  code: codes.usage,
  centered: true,
  classNames: { demoInner: "min-h-72 w-full centered" },
  controls: [{ prop: "autosize", type: "boolean", initialValue: true, libraryValue: true }]
};

const validateJson: DataTrees = {
  type: "code",
  component: ValidateJsonDemo,
  code: codes.validateJson,
  classNames: { demoInner: "min-h-72 w-full centered" }
};

export const TextareaDemos = {
  usage,
  validateJson
};
