"use client";
import { Command, CommandActionData, CommandActionGroupData, CommandProps, createCommand } from "@/ui/command";
import { CommandIcon, ComponentsIcon, FolderSearchIcon, HomeIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Stack } from "@/ui/stack";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { command, Command } from "@/ui/command";\nimport { HomeIcon } from "@/icons/*";\nimport { Button } from "@/ui/button";\n\nconst data = ["Home", "About us", "Contacts", "Blog", "Careers", "Terms of service"];\n\nexport function CommandDemo() {\n  const [query, setQuery] = useState("");\n\n  const items = data.filter(item => item.toLowerCase().includes(query.toLowerCase().trim())).map(item => <Command.Action key={item} label={item} />);\n\n  return (\n    <>\n      <Button onClick={command.open}>Open Command</Button>\n\n      <Command.Root query={query} onQueryChange={setQuery}>\n        <Command.Search placeholder="Search..." leftSection={<HomeIcon stroke={1.5} />} />\n        <Command.ActionsList>{items.length > 0 ? items : <Command.Empty>Nothing found...</Command.Empty>}</Command.ActionsList>\n      </Command.Root>\n    </>\n  );\n}',
  configurator:
    'import { Command, type CommandActionGroupData } from "@/ui/command";\nimport { FolderSearchIcon } from "@/icons/*";\n\nconst dataGroup: CommandActionGroupData[] = [\n  {\n    group: "Frontend Frameworks",\n    actions: [\n      { id: "1-1", href: "https://reactjs.org/", label: "React", description: "A JavaScript library for building user interfaces." },\n      { id: "1-2", href: "https://vuejs.org/", label: "Vue.js", description: "A progressive framework for building user interfaces." }\n    ]\n  },\n  {\n    group: "Backend Frameworks",\n    actions: [\n      { id: "2-1", href: "https://expressjs.com/", label: "Express", description: "Fast, unopinionated, minimalist web framework for Node.js." },\n      { id: "2-2", href: "https://nestjs.com/", label: "NestJS", description: "A progressive Node.js framework for building efficient and scalable server-side applications." }\n    ]\n  },\n  {\n    group: "Databases",\n    actions: [\n      { id: "3-1", href: "https://www.mongodb.com/", label: "MongoDB", description: "A document database with the scalability and flexibility that you want with the querying and indexing that you need." },\n      { id: "3-2", href: "https://www.postgresql.org/", label: "PostgreSQL", description: "A powerful, open-source object-relational database system." }\n    ]\n  },\n  {\n    group: "CSS Frameworks",\n    actions: [\n      { id: "4-1", href: "https://tailwindcss.com/", label: "Tailwind CSS", description: "A utility-first CSS framework for rapidly building custom user interfaces." },\n      { id: "4-2", href: "https://getbootstrap.com/", label: "Bootstrap", description: "The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile-first projects on the web." }\n    ]\n  },\n  {\n    group: "Development Tools",\n    actions: [\n      { id: "5-1", href: "https://code.visualstudio.com/", label: "VS Code", description: "A source-code editor developed by Microsoft for Windows, Linux, and macOS." },\n      { id: "5-2", href: "https://git-scm.com/", label: "Git", description: "A free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." }\n    ]\n  }\n];\n\nexport function CommandDemo() {\n  return (\n    <Command\n      {{props}}\n      modal={false}\n      forceOpened\n      actions={dataGroup}\n      searchProps={{ autoFocus: false, leftSection: <FolderSearchIcon stroke={1.5} /> }}\n    />\n  );\n}',
  dataTypesSingle:
    '"use client";\nimport { Command, type CommandActionData } from "@/ui/command";\nimport { CommandIcon, ComponentsIcon, HomeIcon } from "@/icons/*";\n\nconst singleData: CommandActionData[] = [\n  { id: "1", href: "/", label: "Home", description: "Get to home page", leftSection: <HomeIcon size={18} /> },\n  { id: "2", href: "/docs", label: "Docs", description: "Get to docs page", leftSection: <CommandIcon size={18} /> },\n  { id: "3", href: "/docs/web/components", label: "Components", description: "Get to components page", leftSection: <ComponentsIcon size={18} /> }\n];\n\nexport function CommandDataTypesSingleDemo() {\n  return <Command modal={false} forceOpened actions={singleData} nothingFound="Oops..." searchProps={{ autoFocus: false }} />;\n}',
  dataTypesGroup:
    'import { Command, type CommandActionGroupData } from "@/ui/command";\n\nconst dataGroup: CommandActionGroupData[] = [\n  {\n    group: "Frontend Frameworks",\n    actions: [\n      { id: "1-1", href: "https://reactjs.org/", label: "React", description: "A JavaScript library for building user interfaces." },\n      { id: "1-2", href: "https://vuejs.org/", label: "Vue.js", description: "A progressive framework for building user interfaces." }\n    ]\n  },\n  {\n    group: "Backend Frameworks",\n    actions: [\n      { id: "2-1", href: "https://expressjs.com/", label: "Express", description: "Fast, unopinionated, minimalist web framework for Node.js." },\n      { id: "2-2", href: "https://nestjs.com/", label: "NestJS", description: "A progressive Node.js framework for building efficient and scalable server-side applications." }\n    ]\n  },\n  {\n    group: "Databases",\n    actions: [\n      { id: "3-1", href: "https://www.mongodb.com/", label: "MongoDB", description: "A document database with the scalability and flexibility that you want with the querying and indexing that you need." },\n      { id: "3-2", href: "https://www.postgresql.org/", label: "PostgreSQL", description: "A powerful, open-source object-relational database system." }\n    ]\n  },\n  {\n    group: "CSS Frameworks",\n    actions: [\n      { id: "4-1", href: "https://tailwindcss.com/", label: "Tailwind CSS", description: "A utility-first CSS framework for rapidly building custom user interfaces." },\n      { id: "4-2", href: "https://getbootstrap.com/", label: "Bootstrap", description: "The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile-first projects on the web." }\n    ]\n  },\n  {\n    group: "Development Tools",\n    actions: [\n      { id: "5-1", href: "https://code.visualstudio.com/", label: "VS Code", description: "A source-code editor developed by Microsoft for Windows, Linux, and macOS." },\n      { id: "5-2", href: "https://git-scm.com/", label: "Git", description: "A free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." }\n    ]\n  }\n];\n\nexport function CommandDataTypesGroupDemo() {\n  return <Command modal={false} forceOpened actions={dataGroup} nothingFound="Nothing..." searchProps={{ autoFocus: false }} />;\n}',
  multipleCommand:
    '"use client";\nimport { Command, createCommand } from "@/ui/command";\nimport { Button } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\n\nconst [firstStore, firstStoreState] = createCommand();\nconst [secondStore, secondStoreState] = createCommand();\n\nexport function CommandMultipleDemo() {\n  return (\n    <Stack>\n      <Command store={firstStore} actions={[{ id: "command-1", label: "Command 1" }]} />\n      <Command store={secondStore} actions={[{ id: "command-2", label: "Command 2" }]} />\n\n      <Button onClick={firstStoreState.open}>Open Command 1</Button>\n      <Button onClick={secondStoreState.open}>Open Command 2</Button>\n    </Stack>\n  );\n}'
};
const [demoStore, demoState] = createCommand();
const [dataSingleStore, _demoSigleState] = createCommand();
const [dataGroupStore, _demoGroupState] = createCommand();
const [configuratorStore, _demoConfiguratorState] = createCommand();

const data = ["Home", "About us", "Contacts", "Blog", "Careers", "Terms of service"];

function Demo() {
  const [query, setQuery] = useState("");

  const items = data.filter(item => item.toLowerCase().includes(query.toLowerCase().trim())).map(item => <Command.Action key={item} label={item} />);

  return (
    <>
      <Button onClick={demoState.open}>Open Command</Button>

      <Command.Root query={query} onQueryChange={setQuery} store={demoStore}>
        <Command.Search placeholder="Search..." leftSection={<HomeIcon stroke={1.5} />} />
        <Command.ActionsList>{items.length > 0 ? items : <Command.Empty>Nothing found...</Command.Empty>}</Command.ActionsList>
      </Command.Root>
    </>
  );
}

const dataSingle: CommandActionData[] = [
  { id: "1", href: "/", label: "Home", description: "Get to home page", leftSection: <HomeIcon size={18} /> },
  { id: "2", href: "/docs", label: "Docs", description: "Get to docs page", leftSection: <CommandIcon size={18} /> },
  { id: "3", href: "/docs/web/components", label: "Components", description: "Get to components page", leftSection: <ComponentsIcon size={18} /> }
];

const dataGroup: CommandActionGroupData[] = [
  {
    group: "Frontend Frameworks",
    actions: [
      { id: "1-1", href: "https://reactjs.org/", label: "React", description: "A JavaScript library for building user interfaces." },
      { id: "1-2", href: "https://vuejs.org/", label: "Vue.js", description: "A progressive framework for building user interfaces." }
    ]
  },
  {
    group: "Backend Frameworks",
    actions: [
      { id: "2-1", href: "https://expressjs.com/", label: "Express", description: "Fast, unopinionated, minimalist web framework for Node.js." },
      {
        id: "2-2",
        href: "https://nestjs.com/",
        label: "NestJS",
        description: "A progressive Node.js framework for building efficient and scalable server-side applications."
      }
    ]
  },
  {
    group: "Databases",
    actions: [
      {
        id: "3-1",
        href: "https://www.mongodb.com/",
        label: "MongoDB",
        description: "A document database with the scalability and flexibility that you want with the querying and indexing that you need."
      },
      { id: "3-2", href: "https://www.postgresql.org/", label: "PostgreSQL", description: "A powerful, open-source object-relational database system." }
    ]
  },
  {
    group: "CSS Frameworks",
    actions: [
      {
        id: "4-1",
        href: "https://tailwindcss.com/",
        label: "Tailwind CSS",
        description: "A utility-first CSS framework for rapidly building custom user interfaces."
      },
      {
        id: "4-2",
        href: "https://getbootstrap.com/",
        label: "Bootstrap",
        description: "The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile-first projects on the web."
      }
    ]
  },
  {
    group: "Development Tools",
    actions: [
      {
        id: "5-1",
        href: "https://code.visualstudio.com/",
        label: "VS Code",
        description: "A source-code editor developed by Microsoft for Windows, Linux, and macOS."
      },
      {
        id: "5-2",
        href: "https://git-scm.com/",
        label: "Git",
        description: "A free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency."
      }
    ]
  }
];

function CommandDataTypesSingleDemo() {
  return <Command store={dataSingleStore} modal={false} forceOpened actions={dataSingle} nothingFound="Oops..." searchProps={{ autoFocus: false }} />;
}

function CommandDataTypesGroupDemo() {
  return <Command store={dataGroupStore} modal={false} forceOpened actions={dataGroup} nothingFound="Nothing..." searchProps={{ autoFocus: false }} />;
}

function CommandConfiguratorDemo(props: CommandProps) {
  return <Command {...props} store={configuratorStore} modal={false} forceOpened actions={dataGroup} searchProps={{ autoFocus: false, leftSection: <FolderSearchIcon stroke={1.5} /> }} classNames={{ closeCommand: "not-sr-only flex" }} />;
}
<div className=""></div>;
const [firstStore, firstStoreState] = createCommand();
const [secondStore, secondStoreState] = createCommand();
function CommandMultipleDemo() {
  return (
    <Stack>
      <Command store={firstStore} actions={[{ id: "command-1", label: "Command 1" }]} />
      <Command store={secondStore} actions={[{ id: "command-2", label: "Command 2" }]} />

      <Button onClick={firstStoreState.open}>Open Command 1</Button>
      <Button onClick={secondStoreState.open}>Open Command 2</Button>
    </Stack>
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
  component: CommandConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "nothingFound", type: "string", initialValue: "Nothing found...", libraryValue: "Nothing found..." },
    { prop: "highlightQuery", type: "boolean", initialValue: false, libraryValue: null },
    { prop: "clearQueryOnClose", type: "boolean", initialValue: true, libraryValue: true }
  ]
};

const dataTypesSingle: DataTrees = {
  type: "code",
  component: CommandDataTypesSingleDemo,
  code: codes.dataTypesSingle,
  defaultExpanded: false,
  centered: true
};

const dataTypesGroup: DataTrees = {
  type: "code",
  component: CommandDataTypesGroupDemo,
  code: codes.dataTypesGroup,
  defaultExpanded: false,
  centered: true
};

const multipleCommand: DataTrees = {
  type: "code",
  component: CommandMultipleDemo,
  code: codes.multipleCommand,
  centered: true
};

export const CommandDemos = {
  usage,
  configurator,
  dataTypesSingle,
  dataTypesGroup,
  multipleCommand
};
