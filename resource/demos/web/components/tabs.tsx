"use client";
import React from "react";
import { Tabs, type TabsProps, type TabsListProps } from "@/ui/tabs";
import { GitBranchIcon, GitCommitIcon, GitPullRequestIcon } from "@/icons/*";
import { FloatingIndicator } from "@/ui/floating-indicator";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { ClientOnly } from "@/source/assets/client-only";

const codes = {
  usage:
    '// Using Compound Components is only supported on client side rendering\n"use client";\nimport { Tabs } from "@/ui/tabs";\nimport { GitBranchIcon, GitCommitIcon, GitPullRequestIcon } from "@/icons/*";\n\nexport function TabsDemo() {\n  return (\n    <Tabs defaultValue="branch" color="#f08c00" classNames={{ panel: "min-w-56 p-4" }}>\n      <Tabs.List>\n        <Tabs.Tab value="branch" leftSection={<GitBranchIcon size={14} />}>Branch</Tabs.Tab>\n        <Tabs.Tab value="commit" leftSection={<GitCommitIcon size={14} />}>Commit</Tabs.Tab>\n        <Tabs.Tab value="pullrequest" leftSection={<GitPullRequestIcon size={14} />}>Pull Request</Tabs.Tab>\n      </Tabs.List>\n\n      <Tabs.Panel value="branch">Branch tab content</Tabs.Panel>\n      <Tabs.Panel value="commit">Commit tab content</Tabs.Panel>\n      <Tabs.Panel value="pullrequest">Pull Request tab content</Tabs.Panel>\n    </Tabs>\n  );\n}',
  configurator:
    '// Using Compound Components is only supported on client side rendering\n"use client";\nimport { Tabs } from "@/ui/tabs";\nimport { GitBranchIcon, GitCommitIcon, GitPullRequestIcon } from "@/icons/*";\n\nexport function TabsDemo() {\n  return (\n    <Tabs{{props}} defaultValue="commit" classNames={{ root: "data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-col data-[inverted]:data-[orientation=horizontal]:flex-col-reverse size-full", panel: "min-w-56 p-4" }}>\n      <Tabs.List>\n        <Tabs.Tab value="branch" leftSection={<GitBranchIcon size={14} />}>Branch</Tabs.Tab>\n        <Tabs.Tab value="commit" leftSection={<GitCommitIcon size={14} />}>Commit\n        </Tabs.Tab>\n        <Tabs.Tab value="pullrequest" leftSection={<GitPullRequestIcon size={14} />}>Pull Request</Tabs.Tab>\n      </Tabs.List>\n\n      <Tabs.Panel value="branch">Branch tab content</Tabs.Panel>\n      <Tabs.Panel value="commit">Commit tab content</Tabs.Panel>\n      <Tabs.Panel value="pullrequest">Pull Request tab content</Tabs.Panel>\n    </Tabs>\n  );\n}',
  position:
    '// Using Compound Components is only supported on client side rendering\n"use client";\nimport { Tabs } from "@/ui/tabs";\nimport { GitBranchIcon, GitCommitIcon, GitPullRequestIcon } from "@/icons/*";\n\nexport function TabsDemo() {\n  return (\n    <Tabs defaultValue="commit" classNames={{ panel: "min-w-56 p-4" }}>\n      <Tabs.List{{props}}>\n        <Tabs.Tab value="branch" leftSection={<GitBranchIcon size={14} />}>Branch</Tabs.Tab>\n        <Tabs.Tab value="commit" leftSection={<GitCommitIcon size={14} />}>Commit\n        </Tabs.Tab>\n        <Tabs.Tab value="pullrequest" leftSection={<GitPullRequestIcon size={14} />}>Pull Request</Tabs.Tab>\n      </Tabs.List>\n\n      <Tabs.Panel value="branch">Branch tab content</Tabs.Panel>\n      <Tabs.Panel value="commit">Commit tab content</Tabs.Panel>\n      <Tabs.Panel value="pullrequest">Pull Request tab content</Tabs.Panel>\n    </Tabs>\n  );\n}',
  custom1:
    '"use client";\nimport React from "react";\nimport { Tabs, type TabsProps, type TabsListProps } from "@/ui/tabs";\nimport { GitBranchIcon, GitCommitIcon, GitPullRequestIcon } from "@/icons/*";\nimport { FloatingIndicator } from "@/ui/floating-indicator";\n\nconst data = [\n  {\n    label: "Branch",\n    description: "Branches are a core feature of version control systems, allowing you to isolate and manage changes in your codebase. A branch represents a separate line of development where you can experiment with new features, fix bugs, or make changes without impacting the main codebase. Once your work is complete, you can merge the branch back into the main development stream.",\n    icon: <GitBranchIcon size={14} />\n  },\n  {\n    label: "Commit",\n    description: "Commits are snapshots of your project at a specific point in time. They serve as a way to document changes in your code, providing a history of development that can be referenced or reverted to if needed. Each commit includes a message describing the changes, making it easier to track the evolution of your codebase over time.",\n    icon: <GitCommitIcon size={14} />\n  },\n  {\n    label: "Pull Request",\n    description: "Pull requests facilitate collaboration in version control workflows, enabling developers to propose changes, review code, and discuss potential improvements before merging into the main branch. They promote code quality, encourage team collaboration, and provide a platform to ensure that every change meets the required standards before integration.",\n    icon: <GitPullRequestIcon size={14} />\n  }\n];\n\nconst validatedValue = (value: string) => value.trim().toLowerCase();\nconst DEFAULT_VALUE: string = validatedValue(data[0]?.label);\n\nexport function TabsDemo() {\n  const [parentRef, setParentRef] = React.useState<HTMLDivElement | null>(null);\n  const [controlsRefs, setControlsRefs] = React.useState<Record<string, HTMLButtonElement | null>>({});\n  const [active, setActive] = React.useState<string>(DEFAULT_VALUE);\n  const [hover, setHover] = React.useState<string | null>(null);\n\n  const setControlRef = (key: string) => (node: HTMLButtonElement) => {\n    controlsRefs[key] = node;\n    setControlsRefs(controlsRefs);\n  };\n\n  const propsTab = (key: string) => ({\n    ref: setControlRef(key),\n    onClick: () => setActive(key),\n    onMouseEnter: () => setHover(key),\n    onMouseLeave: () => setHover(null),\n  });\n\n  return (\n    <Tabs defaultValue={DEFAULT_VALUE} classNames={{ root: "size-full", panel: "min-w-56 p-4" }}>\n      <Tabs.List ref={setParentRef}>\n        {data.map((i, _i) => (\n          <Tabs.Tab key={_i} value={validatedValue(i.label)} leftSection={i.icon} {...propsTab(validatedValue(i.label))}>\n            {i.label}\n          </Tabs.Tab>\n        ))}\n\n        <FloatingIndicator\n          target={controlsRefs[hover ?? active]}\n          parent={parentRef}\n          transitionDuration={350}\n          className="bg-muted/60 border-muted-foreground/60 rounded-md rounded-b-none border-b-transparent -z-1 shadow-md border-2"\n        />\n      </Tabs.List>\n\n      {data.map((i, _i) => (\n        <Tabs.Panel key={_i} value={validatedValue(i.label)} className="overflow-auto max-h-full max-w-full">\n          {i.description}\n        </Tabs.Panel>\n      ))}\n    </Tabs>\n  );\n}'
};

function Demo() {
  return (
    <Tabs defaultValue="branch" color="#f08c00" classNames={{ root: "size-full", panel: "min-w-56 p-4" }}>
      <Tabs.List className="flex-nowrap">
        <Tabs.Tab value="branch" leftSection={<GitBranchIcon size={14} />}>
          Branch
        </Tabs.Tab>
        <Tabs.Tab value="commit" leftSection={<GitCommitIcon size={14} />}>
          Commit
        </Tabs.Tab>
        <Tabs.Tab value="pullrequest" leftSection={<GitPullRequestIcon size={14} />}>
          Pull Request
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="branch">Branch tab content</Tabs.Panel>
      <Tabs.Panel value="commit">Commit tab content</Tabs.Panel>
      <Tabs.Panel value="pullrequest">Pull Request tab content</Tabs.Panel>
    </Tabs>
  );
}

function ConfiguratorDemo(props: TabsProps) {
  return (
    <ClientOnly>
      <Tabs
        {...props}
        defaultValue="commit"
        classNames={{
          root: "data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-col data-[inverted]:data-[orientation=horizontal]:flex-col-reverse size-full",
          panel: "min-w-56 p-4"
        }}
      >
        <Tabs.List className="flex-nowrap">
          <Tabs.Tab value="branch" leftSection={<GitBranchIcon size={14} />}>
            Branch
          </Tabs.Tab>
          <Tabs.Tab value="commit" leftSection={<GitCommitIcon size={14} />}>
            Commit
          </Tabs.Tab>
          <Tabs.Tab value="pullrequest" leftSection={<GitPullRequestIcon size={14} />}>
            Pull Request
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="branch">Branch tab content</Tabs.Panel>
        <Tabs.Panel value="commit">Commit tab content</Tabs.Panel>
        <Tabs.Panel value="pullrequest">Pull Request tab content</Tabs.Panel>
      </Tabs>
    </ClientOnly>
  );
}

function PositionDemo(props: TabsListProps) {
  return (
    <ClientOnly>
      <Tabs defaultValue="commit" classNames={{ root: "size-full", panel: "min-w-56 p-4" }}>
        <Tabs.List {...props}>
          <Tabs.Tab value="branch" leftSection={<GitBranchIcon size={14} />}>
            Branch
          </Tabs.Tab>
          <Tabs.Tab value="commit" leftSection={<GitCommitIcon size={14} />}>
            Commit
          </Tabs.Tab>
          <Tabs.Tab value="pullrequest" leftSection={<GitPullRequestIcon size={14} />}>
            Pull Request
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="branch">Branch tab content</Tabs.Panel>
        <Tabs.Panel value="commit">Commit tab content</Tabs.Panel>
        <Tabs.Panel value="pullrequest">Pull Request tab content</Tabs.Panel>
      </Tabs>
    </ClientOnly>
  );
}

const data = [
  {
    label: "Branch",
    description:
      "Branches are a core feature of version control systems, allowing you to isolate and manage changes in your codebase. A branch represents a separate line of development where you can experiment with new features, fix bugs, or make changes without impacting the main codebase. Once your work is complete, you can merge the branch back into the main development stream.",
    icon: <GitBranchIcon size={14} />
  },
  {
    label: "Commit",
    description:
      "Commits are snapshots of your project at a specific point in time. They serve as a way to document changes in your code, providing a history of development that can be referenced or reverted to if needed. Each commit includes a message describing the changes, making it easier to track the evolution of your codebase over time.",
    icon: <GitCommitIcon size={14} />
  },
  {
    label: "Pull Request",
    description:
      "Pull requests facilitate collaboration in version control workflows, enabling developers to propose changes, review code, and discuss potential improvements before merging into the main branch. They promote code quality, encourage team collaboration, and provide a platform to ensure that every change meets the required standards before integration.",
    icon: <GitPullRequestIcon size={14} />
  }
];

const validatedValue = (value: string) => value.trim().toLowerCase();
const DEFAULT_VALUE: string = validatedValue(data[0]?.label);

function Custom1Demo() {
  const [parentRef, setParentRef] = React.useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = React.useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = React.useState<string>(DEFAULT_VALUE);
  const [hover, setHover] = React.useState<string | null>(null);

  const setControlRef = (key: string) => (node: HTMLButtonElement) => {
    controlsRefs[key] = node;
    setControlsRefs(controlsRefs);
  };

  const propsTab = (key: string) => ({
    ref: setControlRef(key),
    onClick: () => setActive(key),
    onMouseEnter: () => setHover(key),
    onMouseLeave: () => setHover(null)
  });

  return (
    <ClientOnly>
      <Tabs defaultValue={DEFAULT_VALUE} classNames={{ root: "size-full", panel: "min-w-56 p-4" }}>
        <Tabs.List ref={setParentRef} className="flex-nowrap">
          {data.map((i, _i) => (
            <Tabs.Tab key={_i} value={validatedValue(i.label)} leftSection={i.icon} {...propsTab(validatedValue(i.label))}>
              {i.label}
            </Tabs.Tab>
          ))}

          <FloatingIndicator target={controlsRefs[hover ?? active]} parent={parentRef} transitionDuration={350} className="-z-1 rounded-md rounded-b-none border-2 border-muted-foreground/60 border-b-transparent bg-muted/60 shadow-md" />
        </Tabs.List>

        {data.map((i, _i) => (
          <Tabs.Panel key={_i} value={validatedValue(i.label)} className="max-h-full max-w-full overflow-auto">
            {i.description}
          </Tabs.Panel>
        ))}
      </Tabs>
    </ClientOnly>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "h-40 w-full centered overflow-x-auto" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "min-h-72 w-full centered overflow-auto" },
  controls: [
    { prop: "variant", type: "select", initialValue: "default", libraryValue: "default", data: ["default", "outline", "pills"] },
    { prop: "orientation", type: "select", initialValue: "horizontal", libraryValue: "horizontal", data: ["horizontal", "vertical"] },
    { prop: "placement", type: "select", initialValue: "left", libraryValue: "left", data: ["left", "right"] },
    { prop: "round", type: "number", initialValue: 6, libraryValue: 6, min: 4, max: 32 },
    { prop: "color", type: "color", initialValue: "hsl(var(--color))", libraryValue: "hsl(var(--color))" },
    { prop: "inverted", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const position: DataTrees = {
  type: "configurator",
  component: PositionDemo,
  code: codes.position,
  centered: true,
  classNames: { demoInner: "min-h-72 w-full centered" },
  controls: [
    { prop: "justify", type: "select", initialValue: "left", libraryValue: "left", data: ["flex-start", "center", "flex-end", "space-between"] },
    { prop: "grow", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const custom1: DataTrees = {
  type: "code",
  component: Custom1Demo,
  code: codes.custom1,
  classNames: { demoInner: "h-40 w-full centered overflow-x-auto" }
};

export const TabsDemos = {
  usage,
  configurator,
  position,
  custom1
};
