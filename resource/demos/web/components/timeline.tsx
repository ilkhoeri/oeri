"use client";
import { cnx } from "cretex";
import { Tooltip } from "@/ui/tooltip";
import { Timeline, type TimelineProps } from "@/ui/timeline";
import { GitBranchIcon, GitCommitIcon, GitPullRequestDraftIcon, GitPullRequestIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { TimesPosted } from "@/ui/times";
import { ClientOnly } from "@/source/assets/client-only";

const codes = {
  usage:
    'import { cnx } from "cretex";\nimport { TimesPosted } from "@/ui/times";\nimport { Tooltip } from "@/ui/tooltip";\nimport { Timeline } from "@/ui/timeline";\nimport { GitBranchIcon, GitCommitIcon, GitPullRequestDraftIcon, GitPullRequestIcon } from "@/icons/*";\n\nconst data = [\n  {\n    id: "1",\n    title: "New branch",\n    description: "Create a new branch to start a new feature or fix bugs.",\n    icons: <GitBranchIcon size={12} />,\n    createdAt: new Date("2024-12-01T10:30:00").toISOString()\n  },\n  {\n    id: "2",\n    title: "Commits",\n    description: "Track changes and save versions of your project with meaningful messages.",\n    icons: <GitCommitIcon size={12} />,\n    createdAt: new Date("2024-12-02T14:45:00").toISOString()\n  },\n  {\n    id: "3",\n    title: "Pull request",\n    description: "Request to merge your branch into the main branch after completing a feature.",\n    icons: <GitPullRequestIcon size={12} />,\n    createdAt: new Date("2024-12-03T09:15:00").toISOString()\n  },\n  {\n    id: "4",\n    title: "Code review",\n    description: "Collaboratively review changes before they are merged to ensure quality.",\n    icons: <GitPullRequestDraftIcon size={12} />,\n    createdAt: new Date("2024-12-03T11:00:00").toISOString()\n  }\n];\n\nexport function TimelineWithTooltipDemo() {\n  return (\n    <Timeline.List\n      align="left"\n      bulletStyle={{ size: 25 }}\n      lineStyle={{ width: 3, variant: "double", clr: "hsla(45, 90%, 45%, 0.25)" }}\n      className="max-w-5xl py-12 pl-10"\n    >\n      {data.map(i => {\n        const isActive = ["1", "2", "4"].includes(i.id);\n        return (\n          <Timeline.Item\n            key={i.id}\n            title={i.title}\n            active={isActive}\n            activeStyle={{ line: "#fab005" }}\n            lineStyle={{ variant: cnx({ dotted: isActive }) }}\n            bullet={\n              <Tooltip touch withArrow defaultOpen={!isActive} side="top" content={i.title} classNames={{ trigger: "size-full flex items-center justify-center", content: "py-1 px-1.5" }}>\n                {i.icons}\n              </Tooltip>\n            }\n            content={\n              <>\n                <p className="mt-2 text-xs">{i.description}</p>\n                <TimesPosted times={{ createdAt: i.createdAt }} className="mt-2 text-xs" />\n              </>\n            }\n          />\n        );\n      })}\n    </Timeline.List>\n  );\n}',
  configurator:
    'import { Timeline } from "@/ui/timeline";\nimport { GitBranchIcon, GitCommitIcon, GitPullRequestDraftIcon, GitPullRequestIcon } from "@/icons/*";\n\nconst data = [\n  {\n    id: "1",\n    title: "New branch",\n    description: "Create a new branch to start a new feature or fix bugs.",\n    icons: <GitBranchIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,\n    createdAt: new Date("2024-12-01T10:30:00")\n  },\n  {\n    id: "2",\n    title: "Commits",\n    description: "Track changes and save versions of your project with meaningful messages.",\n    icons: <GitCommitIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,\n    createdAt: new Date("2024-12-02T14:45:00")\n  },\n  {\n    id: "3",\n    title: "Pull request",\n    description: "Request to merge your branch into the main branch after completing a feature.",\n    icons: <GitPullRequestIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,\n    createdAt: new Date("2024-12-03T09:15:00")\n  },\n  {\n    id: "4",\n    title: "Code review",\n    description: "Collaboratively review changes before they are merged to ensure quality.",\n    icons: <GitPullRequestDraftIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,\n    createdAt: new Date("2024-12-03T11:00:00")\n  }\n];\n\nexport function TimelineDemo() {\n  return (\n    <Timeline{{props}} bulletStyle={{ round: 8, size: 32 }} lineStyle={{ width: 1 }}>\n      {data.map(i => (\n        <Timeline.Item key={i.id} title={i.title} active={["1", "2", "4"].includes(i.id)} notice={["2", "3"].includes(i.id)} bullet={i.icons} activeStyle={{ line: "hsl(var(--color)/0.6)", ring: "transparent" }}>\n          <p className="mt-2 text-xs text-muted-foreground">{i.description}</p>\n          <time dateTime={String(i.createdAt)} className="mt-2 text-xs text-muted-foreground">\n            {String(i.createdAt)}\n          </time>\n        </Timeline.Item>\n      ))}\n    </Timeline>\n  );\n}'
};

const data = [
  {
    id: "1",
    title: "New branch",
    description: "Create a new branch to start a new feature or fix bugs.",
    icons: <GitBranchIcon size={12} />,
    createdAt: new Date("2024-12-01T10:30:00").toISOString()
  },
  {
    id: "2",
    title: "Commits",
    description: "Track changes and save versions of your project with meaningful messages.",
    icons: <GitCommitIcon size={12} />,
    createdAt: new Date("2024-12-02T14:45:00").toISOString()
  },
  {
    id: "3",
    title: "Pull request",
    description: "Request to merge your branch into the main branch after completing a feature.",
    icons: <GitPullRequestIcon size={12} />,
    createdAt: new Date("2024-12-03T09:15:00").toISOString()
  },
  {
    id: "4",
    title: "Code review",
    description: "Collaboratively review changes before they are merged to ensure quality.",
    icons: <GitPullRequestDraftIcon size={12} />,
    createdAt: new Date("2024-12-03T11:00:00").toISOString()
  }
];

function Demo() {
  return (
    <Timeline.List align="left" bulletStyle={{ size: 25 }} lineStyle={{ width: 3, variant: "double", clr: "hsla(45, 90%, 45%, 0.25)" }} className="max-w-5xl py-12 pl-10">
      {data.map(i => {
        const isActive = ["1", "2", "4"].includes(i.id);
        return (
          <Timeline.Item
            key={i.id}
            title={i.title}
            active={isActive}
            activeStyle={{ line: "#fab005" }}
            lineStyle={{ variant: cnx({ dotted: isActive }) }}
            bullet={
              <ClientOnly>
                <Tooltip touch withArrow defaultOpen={!isActive} side="top" content={i.title} classNames={{ trigger: "size-full flex items-center justify-center", content: "py-1 px-1.5" }}>
                  {i.icons}
                </Tooltip>
              </ClientOnly>
            }
            content={
              <>
                <p className="mt-2 text-xs">{i.description}</p>
                <TimesPosted times={{ createdAt: i.createdAt }} className="mt-2 text-xs" />
              </>
            }
          />
        );
      })}
    </Timeline.List>
  );
}

const data2 = [
  {
    id: "1",
    title: "New branch",
    description: "Create a new branch to start a new feature or fix bugs.",
    icons: <GitBranchIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,
    createdAt: new Date("2024-12-01T10:30:00")
  },
  {
    id: "2",
    title: "Commits",
    description: "Track changes and save versions of your project with meaningful messages.",
    icons: <GitCommitIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,
    createdAt: new Date("2024-12-02T14:45:00")
  },
  {
    id: "3",
    title: "Pull request",
    description: "Request to merge your branch into the main branch after completing a feature.",
    icons: <GitPullRequestIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,
    createdAt: new Date("2024-12-03T09:15:00")
  },
  {
    id: "4",
    title: "Code review",
    description: "Collaboratively review changes before they are merged to ensure quality.",
    icons: <GitPullRequestDraftIcon size={12} className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]" />,
    createdAt: new Date("2024-12-03T11:00:00")
  }
];

function ConfiguratorDemo(props: TimelineProps) {
  return (
    <Timeline {...props} bulletStyle={{ round: 8, size: 32 }} lineStyle={{ width: 1 }}>
      {data2.map(i => (
        <Timeline.Item key={i.id} title={i.title} active={["1", "2", "4"].includes(i.id)} notice={["2", "3"].includes(i.id)} bullet={i.icons} activeStyle={{ line: "hsl(var(--color)/0.6)", ring: "transparent" }}>
          <p className="mt-2 text-xs text-muted-foreground">{i.description}</p>
          <time dateTime={String(i.createdAt)} className="mt-2 text-xs text-muted-foreground">
            {String(i.createdAt)}
          </time>
        </Timeline.Item>
      ))}
    </Timeline>
  );
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
  controls: [{ prop: "align", type: "select", initialValue: "left", libraryValue: "left", data: ["right", "left"] }]
};

export const TimelineDemos = {
  usage,
  configurator
};
