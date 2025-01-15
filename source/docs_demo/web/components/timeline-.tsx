import React from "react";
import { Timeline } from "@/ui/timeline";
import { GitBranchIcon, GitCommitIcon, GitPullRequestDraftIcon, GitPullRequestIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: bulletSize, str: align, ...pro } = __docs_demo.useDemo({ Numb: 24, Str: "left" });
  const { numb: lineWidth, str: lineVariant, ...prop } = __docs_demo.useDemo({ Numb: 2, Str: "solid" });
  const { numb: bulletRound, str: lineColor, ...props } = __docs_demo.useDemo({ Numb: 8, Str: "hsla(0, 0%, 25%, 1)" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Timeline.List
      // @ts-ignore
      align={align}
      bulletStyle={{ round: bulletRound, size: bulletSize }}
      lineStyle={{ width: lineWidth, clr: lineColor, variant: lineVariant }}
      className="max-w-5xl py-12 pl-16 pr-4 md:pl-16"
    >
      {data.map(i => (
        <Timeline.Item
          key={i.id}
          active={["1", "2", "4"].includes(i.id)}
          notice={["2", "3"].includes(i.id)}
          bullet={i.icons}
          title={i.title}
        >
          <p className="mt-2 text-xs text-muted-foreground">
            {i.description}
          </p>
          <time dateTime={String(i.createdAt)} className="mt-2 text-xs text-muted-foreground">
            {String(i.createdAt)}
          </time>
        </Timeline.Item>
      ))}
    </Timeline.List>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="bulletSize" value={bulletSize} setNumb={pro.setNumb} min="16" max="40" />
    <__docs_demo.setRange label="lineWidth" value={lineWidth} setNumb={prop.setNumb} min="1" max="12" />
    <__docs_demo.setRange label="bulletRound" value={bulletRound} setNumb={props.setNumb} min="4" max="99" />
    <__docs_demo.setColor str={lineColor} {...props} />
    <__docs_demo.setSelect label="Line Variants" values={["none", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"]} str={lineVariant} setStr={prop.setStr}/>
    <__docs_demo.setSelect variant="button" label="Align" values={["left", "right"]} str={align} setStr={pro.setStr} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}

const data = [
  {
    id: "1",
    title: "New branch",
    description: "Create a new branch to start a new feature or fix bugs.",
    icons: (
      <GitBranchIcon
        size={12}
        className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]"
      />
    ),
    createdAt: new Date("2024-12-01T10:30:00")
  },
  {
    id: "2",
    title: "Commits",
    description:
      "Track changes and save versions of your project with meaningful messages.",
    icons: (
      <GitCommitIcon
        size={12}
        className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]"
      />
    ),
    createdAt: new Date("2024-12-02T14:45:00")
  },
  {
    id: "3",
    title: "Pull request",
    description:
      "Request to merge your branch into the main branch after completing a feature.",
    icons: (
      <GitPullRequestIcon
        size={12}
        className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]"
      />
    ),
    createdAt: new Date("2024-12-03T09:15:00")
  },
  {
    id: "4",
    title: "Code review",
    description:
      "Collaboratively review changes before they are merged to ensure quality.",
    icons: (
      <GitPullRequestDraftIcon
        size={12}
        className="size-[--sz] [--sz:calc(var(--tl-bullet-size)/2)]"
      />
    ),
    createdAt: new Date("2024-12-03T11:00:00")
  }
];
