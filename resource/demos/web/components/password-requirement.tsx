"use client";
import React from "react";
import { Input } from "@/ui/input";
import { Stack } from "@/ui/stack";
import { twMerge } from "tailwind-merge";
import { PasswordRequirement, PasswordRequirementProvider, PasswordRequirementProviderProps } from "@/ui/password-requirement";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Input } from "@/ui/input";\nimport { Stack } from "@/ui/stack";\nimport { PasswordRequirement, PasswordRequirementProvider } from "@/ui/password-requirement";\n\nexport function PasswordRequirementDemo() {\n  return (\n    <PasswordRequirementProvider>\n      <Stack>\n        <Input.Password />\n        <PasswordRequirement />\n      </Stack>\n    </PasswordRequirementProvider>\n  );\n}',
  configurator:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\nimport { Stack } from "@/ui/stack";\nimport { twMerge } from "tailwind-merge";\nimport { PasswordRequirement, PasswordRequirementProvider } from "@/ui/password-requirement";\n\nexport function PasswordRequirementDemo() {\n  const [visibility, setVisibility] = React.useState(false);\n  return (\n    <PasswordRequirementProvider{{props}}>\n      {({ meets }) => {\n        const isMeets = meets().every(pass => pass.isPass() === true);\n        return (\n          <Stack>\n            <Input.Password open={visibility} onOpenChange={setVisibility} />\n            <Input.Password validating open={visibility} onOpenChange={setVisibility} />\n            <div className="flex flex-col md:col-span-2">\n              <span className={twMerge("overflow-hidden text-sm font-medium transition-[height]", isMeets && "h-0")}>Password requirements:</span>\n              <span className={twMerge("text-muted-foreground mb-1 text-sm font-normal", isMeets && "text-blue-500 line-through")}>Make sure the following requirements are met:</span>\n              <PasswordRequirement classNames={{ root: "ml-1.5 rtl:ml-0 rtl:mr-1.5", item: "text-muted-foreground data-[state=pass]:text-muted data-[state=pass]:line-through" }} />\n            </div>\n          </Stack>\n        );\n      }}\n    </PasswordRequirementProvider>\n  );\n}'
};

function Demo() {
  const [value, setValue] = React.useState<string>("");
  return (
    <Stack>
      <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
      <PasswordRequirement value={value} />
    </Stack>
  );
}

function ConfiguratorDemo(props: PasswordRequirementProviderProps) {
  const [visibility, setVisibility] = React.useState(false);
  return (
    <PasswordRequirementProvider {...props}>
      {({ meets }) => {
        const isMeets = meets().every(pass => pass.isPass() === true);
        return (
          <Stack>
            <Input.Password open={visibility} onOpenChange={setVisibility} />
            <Input.Password validating open={visibility} onOpenChange={setVisibility} />

            <div className="flex flex-col md:col-span-2">
              <span className={twMerge("overflow-hidden text-sm font-medium transition-[height]", isMeets && "h-0")}>Password requirements:</span>
              <span className={twMerge("mb-1 text-sm font-normal text-muted-foreground", isMeets && "text-blue-500 line-through")}>Make sure the following requirements are met:</span>
              <PasswordRequirement classNames={{ root: "ml-1.5 rtl:ml-0 rtl:mr-1.5", item: "text-muted-foreground data-[state=pass]:text-muted data-[state=pass]:line-through" }} />
            </div>
          </Stack>
        );
      }}
    </PasswordRequirementProvider>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "[--demo-margin-y:3rem] w-full centered" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "[--demo-margin-y:3rem] w-full centered" },
  controls: [{ prop: "withProgressBars", type: "boolean", initialValue: false, libraryValue: false }]
};

export const PasswordRequirementDemos = {
  usage,
  configurator
};
