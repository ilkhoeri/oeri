"use client";
import { Command } from "@/ui/command";
import { CommandIcon, ComponentsIcon, HomeIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const props = __docs_demo.useDemo({ Str: "single" });
  const typeData = props.str === "single" ? dataSingle : dataGroup; // ignore
  return (
    <__docs_demo className="mt-8">
    <__docs_demo.area>
    <Command
      modal={false}
      forceOpened
      actions={typeData}
      nothingFound="Oops..."
      searchProps={{ rightSection: false, autoFocus: false }}
    />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect variant="button" label="Type Data" values={["single", "group"]} str={props.str} setStr={props.setStr} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}

const dataSingle = [
  { id: "1", href: "/", label: "Home", description: "Get to home page", leftSection: <HomeIcon size={18} /> },
  { id: "2", href: "/docs", label: "Docs", description: "Get to docs page", leftSection: <CommandIcon size={18} /> },
  { id: "3", href: "/docs/web/components", label: "Components", description: "Get to components page", leftSection: <ComponentsIcon size={18} /> }
];

const dataGroup = [
  {
    group: "Group (1)",
    actions: [
      { id: "1-1", href: "/", label: "Repellat provident", description: "expedita et cum reprehenderit nostrum rerum est autem sunt architecto." },
      { id: "1-2", href: "", label: "Eum et est occaecati", description: "assumenda provident rerum culpa quis hic commodi." }
    ]
  },
  {
    group: "Group (2)",
    actions: [
      { id: "2-1", href: "", label: "Qui est esse", description: "reprehenderit dolor beatae ea dolores neque fugiat blanditiis." },
      { id: "2-2", href: "", label: "Optio reprehenderit", description: "aut fugiat sit autem sed est voluptatem omnis possimus." }
    ]
  },
  {
    group: "Group (3)",
    actions: [
      { id: "3-1", href: "", label: "Nesciunt quas odio", description: "sit autem sed est voluptatem omnis possimus esse voluptatibus." },
      { id: "3-2", href: "", label: "Repellat qui ipsa sit aut", description: "aut ad voluptatem doloribus vel accusantium quis pariatur." }
    ]
  }
];
