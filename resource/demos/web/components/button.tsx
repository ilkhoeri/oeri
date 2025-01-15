"use client";
import { useState } from "react";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Button, UnstyledButton, ButtonProps } from "@/ui/button";

const codes = {
  usage: 'import { Button } from "@/ui/button";\n\nexport function ButtonDemo() {\n  return <Button>Button</Button>;\n}',
  configurator: 'import { Button } from "@/ui/button";\n\nexport function ButtonDemo() {\n  return <Button{{props}}>Button</Button>;\n}',
  decoration: "",
  unstyledButton:
    '"use client";\nimport { useState } from "react";\nimport { UnstyledButton } from "@/ui/button";\n\nexport function UnstyledButtonDemo() {\n  const [loading, setLoading] = useState(false);\n  return (\n    <UnstyledButton\n      loading={loading}\n      onClick={() => {\n        setLoading(true);\n        setTimeout(() => setLoading(false), 2500);\n      }}\n    >\n      UnstyledButton\n    </UnstyledButton>\n  );\n}'
};

function ButtonDemo() {
  return <Button>Button</Button>;
}

function ButtonConfiguratorDemo(props: ButtonProps) {
  return <Button {...props}>Button</Button>;
}

function UnstyledButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <UnstyledButton
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2500);
      }}
    >
      UnstyledButton
    </UnstyledButton>
  );
}

export const usage: DataTrees = {
  type: "code",
  component: ButtonDemo,
  code: codes.usage
};

export const unstyled: DataTrees = {
  type: "code",
  component: UnstyledButtonDemo,
  code: codes.unstyledButton
};

export const configurator: DataTrees = {
  type: "configurator",
  component: ButtonConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    {
      prop: "variant",
      type: "select",
      initialValue: "default",
      libraryValue: "default",
      data: ["default", "link", "destructive", "constructive", "conservative", "primitive", "outline", "ghost"]
    },
    {
      prop: "color",
      type: "select",
      initialValue: "default",
      libraryValue: "default",
      data: ["default", "base", "blue", "grape", "green", "red", "gradient-blue", "gradient-orange", "outline-base", "outline-indigo", "outline-teal"]
    },
    { prop: "size", type: "select", initialValue: "default", libraryValue: "default", data: ["default", "badge", "sm", "lg", "icon"] },
    { prop: "disabled", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "loading", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const ButtonDemos = {
  usage,
  configurator,
  unstyled
};
