import React from "react";
import { Timeline } from "@/modules/components/web";
// prettier-ignore
import { GitBranchIcon, GitCommitIcon, GitPullRequestDraftIcon, GitPullRequestIcon } from "@/modules/icons";
import { SetProps, SetPropsButtonSelect, SetPropsSelect, SetPropsColor, SetPropsRange, useSetProps } from "../../__set_props";

export function Demo() {
  // prettier-ignore
  const { numb: bulletSize, str: align, ...pro } = useSetProps({ Numb: 24, Str: "left" });
  // prettier-ignore
  const { numb: lineWidth, str: lineVariant, ...prop } = useSetProps({ Numb: 2, Str: "solid" });
  // prettier-ignore
  const { numb: bulletRound, str: lineColor, ...props } = useSetProps({ Numb: 8, Str: "currentcolor" });
  return (
    <div data-ignore="" className="pl-[124px] pr-1">
    <Timeline.List
      // @ts-ignore
      align={align}
      bulletStyle={{ round: bulletRound, size: bulletSize }}
      lineStyle={{ width: lineWidth, clr: lineColor, variant: lineVariant }}
      className="max-w-5xl py-12 pl-20 pr-4 md:pl-16"
    >
      {data.map(i => (
        <Timeline.Item
          key={i.id}
          active={["1", "2", "4"].includes(i.id)}
          notice={["2", "3"].includes(i.id)}
          bullet={i.icons}
          title={i.title}
        >
          <p className="mt-2 text-xs text-muted-foreground">{i.description}</p>
          <time dateTime={String(i.createdAt)} className="mt-2 text-xs text-muted-foreground">
            {String(i.createdAt)}
          </time>
        </Timeline.Item>
      ))}
    </Timeline.List>
      {/* prettier-ignore */}
      <SetProps.Wrapper>
      <SetPropsRange label="bulletSize" value={bulletSize} setNumb={pro.setNumb} min="16" max="40" />
      <SetPropsRange label="lineWidth" value={lineWidth} setNumb={prop.setNumb} min="1" max="12" />
      <SetPropsRange label="bulletRound" value={bulletRound} setNumb={props.setNumb} min="4" max="99" />
      <SetPropsColor str={lineColor} {...props} />
      <SetPropsSelect label="Line Variants" values={["none", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"]} str={lineVariant} setStr={prop.setStr}/>
      <SetPropsButtonSelect label="Align" values={["left", "right"]} str={align} setStr={pro.setStr} />
    </SetProps.Wrapper>
    </div> // ignore
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
