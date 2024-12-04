"use client";
import { Timeline, Tooltip } from "@/modules/components/web";
import {
  GitBranchIcon,
  GitCommitIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon
} from "@/modules/icons";
import { cnx } from "str-merge";

export function Demo() {
  return (
    <div data-ignore>
      <Timeline.List
        align="left"
        bulletStyle={{ size: 25 }}
        lineStyle={{ width: 3, variant: "double" }}
        className="max-w-5xl py-12 pl-20 pr-4 md:pl-16"
      >
        {data.map(i => {
          const isActive = ["1", "2", "4"].includes(i.id);
          return (
            <Timeline.Item
              key={i.id}
              active={isActive}
              lineStyle={{ variant: cnx({ dotted: isActive }) }}
              bullet={
                <Tooltip touch withArrow side="top" content={i.title}>
                  {i.icons}
                </Tooltip>
              }
              title={i.title}
              content={
                <>
                  <p className="mt-2 text-xs">{i.description}</p>
                  <time dateTime={String(i.createdAt)} className="mt-2 text-xs">
                    {String(i.createdAt)}
                  </time>
                </>
              }
            />
          );
        })}
      </Timeline.List>
    </div> // ignore
  );
}

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
    description:
      "Track changes and save versions of your project with meaningful messages.",
    icons: <GitCommitIcon size={12} />,
    createdAt: new Date("2024-12-02T14:45:00").toISOString()
  },
  {
    id: "3",
    title: "Pull request",
    description:
      "Request to merge your branch into the main branch after completing a feature.",
    icons: <GitPullRequestIcon size={12} />,
    createdAt: new Date("2024-12-03T09:15:00").toISOString()
  },
  {
    id: "4",
    title: "Code review",
    description:
      "Collaboratively review changes before they are merged to ensure quality.",
    icons: <GitPullRequestDraftIcon size={12} />,
    createdAt: new Date("2024-12-03T11:00:00").toISOString()
  }
];
