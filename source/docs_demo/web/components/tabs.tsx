import React from "react";
import { Tabs } from "@/ui/tabs";
import { GitBranchIcon, GitCommitIcon, GitPullRequestIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: round, str: orientation, ...pro } = __docs_demo.useDemo({ Numb: 6, Str: "horizontal" });
  const { str: variant, ...prop } = __docs_demo.useDemo({ Numb: 2, Str: "default" });
  const { str: color, ...props } = __docs_demo.useDemo({ Numb: 8, Str: "hsla(0, 0%, 25%, 1)" });
  return (
    <__docs_demo>
    <__docs_demo.area>
      {/* @ts-ignore */}
    <Tabs defaultValue="branch" variant={variant} round={round} color={color} orientation={orientation} classNames={{ panel: "min-w-56 p-4" }}>
      <Tabs.List>
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
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="round" value={round} setNumb={pro.setNumb} min="4" max="32" />
    <__docs_demo.setSelect label="Variant" values={["default", "outline", "pills"]} str={variant} setStr={prop.setStr}/>
    <__docs_demo.setSelect variant="button" label="Orientation" values={["horizontal", "vertical"]} str={orientation} setStr={pro.setStr} />
    <__docs_demo.setColor str={color} {...props} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
