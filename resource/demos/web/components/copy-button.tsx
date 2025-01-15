"use client";
import { CopyButton, CopyButtonProps } from "@/ui/copy-button";
import { CopyCheckIcon, CopyIcon } from "@/icons/*";
import { Button } from "@/ui/button";
import { Tooltip } from "@/ui/tooltip";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { CopyButton } from "@/ui/copy-button";\nimport { CopyCheckIcon, CopyIcon } from "@/icons/*";\nimport { Button } from "@/ui/button";\n\nconst value = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse veritatis molestias ex architecto maxime, exercitationem sint perferendis nulla aperiam doloremque?";\n\nexport function CopyButoonDemo() {\n  return (\n    <CopyButton value={value.trimEnd()}>\n      {({ copied, copy }) => (\n        <Button variant="outline" size="icon" color="grape" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>\n          {copied ? <CopyCheckIcon size="sm" /> : <CopyIcon size="sm" />}\n        </Button>\n      )}\n    </CopyButton>\n  );\n}',
  configurator:
    '"use client";\nimport { CopyButton } from "@/ui/copy-button";\nimport { Tooltip } from "@/ui/tooltip";\nimport { CopyCheckIcon, CopyIcon } from "@/icons/*";\n\nexport function CopyButtonDemo() {\n  return (\n    <CopyButton{{props}}>\n      {({ copied, copy }) => (\n        <Tooltip content={copied ? "Copied" : "Copy code"} side="top" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>\n          {copied ? <CopyCheckIcon size="sm" /> : <CopyIcon size="sm" />}\n        </Tooltip>\n      )}\n    </CopyButton>\n  );\n}'
};

const value =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse veritatis molestias ex architecto maxime, exercitationem sint perferendis nulla aperiam doloremque?";

function Demo() {
  return (
    <CopyButton value={value.trimEnd()}>
      {({ copied, copy }) => (
        <Button variant="outline" size="icon" color="grape" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? <CopyCheckIcon size="sm" /> : <CopyIcon size="sm" />}
        </Button>
      )}
    </CopyButton>
  );
}

function ConfiguratorDemo(props: CopyButtonProps) {
  return (
    <CopyButton {...props}>
      {({ copied, copy }) => (
        <Tooltip content={copied ? "Copied" : "Copy code"} side="top" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? <CopyCheckIcon size="sm" /> : <CopyIcon size="sm" />}
        </Tooltip>
      )}
    </CopyButton>
  );
}
const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "value", type: "string", initialValue: "", libraryValue: null },
    { prop: "timeout", type: "number", initialValue: 1000, libraryValue: 1000, min: 1000, max: 2500 }
  ]
};

export const CopyButtonDemos = {
  usage,
  configurator
};
