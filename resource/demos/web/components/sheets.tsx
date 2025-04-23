"use client";
import { useState } from "react";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Sheets, SheetsItem, SheetsContent, SheetsTrigger, SheetsClose } from "@/ui/sheets";
import type { SheetsProps, SheetsCollapsibleProps, SheetsDrawerProps, SheetsDropdownProps } from "@/ui/sheets";
import { ScrollArea } from "@/ui/scroll-area";
import { ChevronIcon, DotsIcon, FileIcon } from "@/icons/*";
import { Typography } from "@/ui/typography";
import { Button, buttonStyle } from "@/ui/button";
import { Stack } from "@/ui/stack";
import { Input } from "@/ui/input";
import { Group } from "@/ui/group";

const codes = {
  accordion:
    '// Independent Components\nimport { Sheets, SheetsItem, SheetsContent, SheetsTrigger } from "@/ui/sheets";\nimport { ChevronIcon } from "@/icons/*";\nimport { Typography } from "@/ui/typography";\n\nconst data = [\n  { title: "Accessibility", description: "Accessibility items that can be changed." },\n  { title: "Terms and Conditions", description: "You can find out more here" },\n  { title: "Preferences", description: "Change the theme, color, and font style according to your preferences" },\n  { title: "Updates", description: "Find the latest news about us here." }\n];\n\nexport function SheetsAccordionDemo() {\n  return (\n    <Sheets variant="accordion" defaultOpen="accessibility" className="w-full max-w-96 rounded-lg border px-6">\n      {data.map((i, index) => (\n        <SheetsItem\n          key={index}\n          value={String(i.title.replace(/\\s/g, "-").toLowerCase())}\n          className="group relative flex h-auto select-none flex-col border-b last-of-type:border-b-transparent"\n        >\n          <SheetsTrigger>\n            {i.title}\n            <ChevronIcon chevron="down" data-sheets="chevron" />\n          </SheetsTrigger>\n\n          <SheetsContent className="text-sm">\n            <Typography prose="muted" className="pb-8">\n              {i.description}\n            </Typography>\n          </SheetsContent>\n        </SheetsItem>\n      ))}\n    </Sheets>\n  );\n}',
  collapsible:
    '// Compound Components\n"use client";\nimport { Sheets } from "@/ui/sheets";\nimport { ChevronIcon } from "@/icons/*";\nimport { Typography } from "@/ui/typography";\n\nexport function SheetsCollapsibleDemo() {\n  return (\n    <Sheets{{props}} variant="collapsible" className="m-auto w-full max-w-80 space-y-2">\n      <Sheets.Trigger className="w-full justify-between bg-background font-mono text-sm text-muted-foreground data-[state=open]:text-constructive">\n        Select your &lt;Sheets /&gt;\n        <Typography className="rounded-md border p-1 transition-colors group-hover:bg-muted/90 group-data-[state=open]:border-constructive">\n          <ChevronIcon chevron="up-down" />\n        </Typography>\n      </Sheets.Trigger>\n\n      <Typography\n        el="a"\n        data-ignore-clickoutside\n        href="#sheets-variant-collapsible"\n        className="mt-4 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60"\n      >\n        @sheets/collapsible\n      </Typography>\n\n      <Sheets.Content className="space-y-2">\n        {["accordion", "dialog", "drawer", "dropdown"].map(i => (\n          <Typography\n            el="a"\n            key={i}\n            href={`#sheets-variant-${i}`}\n            className="w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60"\n          >\n            @sheets/{i}\n          </Typography>\n        ))}\n      </Sheets.Content>\n    </Sheets>\n  );\n}',
  collapsible2:
    '// Only Root Component\n"use client";\nimport { useState } from "react";\nimport { Sheets } from "@/ui/sheets";\nimport { Button } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\nimport { Typography } from "@/ui/typography";\n\nexport function SheetsCollapsibleRootDemo() {\n  const [isOpen, setIsOpen] = useState<boolean>(false);\n\n  return (\n    <Stack gap={8}>\n      <Button onClick={() => setIsOpen(o => !o)} className="w-max">{isOpen ? "Close" : "Read"}</Button>\n      <Sheets variant="collapsible" open={isOpen} onOpenChange={setIsOpen} className="w-96 text-justify text-sm max-w-full">\n        <Typography prose="span" className="max-w-full text-wrap">\n          Long ago, during the era of Gol D. Roger, the Pirate King, the seas were filled with tales of adventure, danger, and mystery. His final words\n          before execution ignited the "Great Pirate Era": "My treasure? It\'s yours if you want it. I left everything I gathered in one place." These words \n          inspired countless pirates, including a young boy named Monkey D. Luffy, who dreamed of finding the legendary <em>One Piece</em> and becoming the \n          next Pirate King. With a straw hat gifted by the infamous Shanks and the power of the Gomu Gomu no Mi, a mysterious Devil Fruit, Luffy set out on \n          a journey that would bring together an unforgettable crew and face unimaginable challenges. From battling fierce Warlords to uncovering secrets of \n          the Void Century, their adventure is a testament to loyalty, courage, and the unbreakable bonds of friendship.\n        </Typography>\n        <Button variant="link" onClick={() => setIsOpen(false)}>\n          close\n        </Button>\n      </Sheets>\n    </Stack>\n  );\n}',
  dialog:
    '// Independent Components\nimport { Sheets, SheetsContent, SheetsTrigger, SheetsClose } from "@/ui/sheets";\nimport { Typography } from "@/ui/typography";\nimport { Stack } from "@/ui/stack";\n\nexport function SheetsDialogDemo() {\n  return (\n    <Sheets variant="dialog">\n      <SheetsTrigger>\n        <Typography\n          el="span"\n          data-labelopen="Open Dialog"\n          data-labelclosed="Close Dialog"\n          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"\n        />\n      </SheetsTrigger>\n\n      <SheetsContent className="flex flex-col gap-4 overflow-hidden md:w-[528px] md:h-[438px] max-md:max-h-96">\n        <Stack>\n          <Typography el="h2" prose="large">\n            The Power of Dreams\n          </Typography>\n          <Typography prose="muted">\n            Explore the strength of ambitions and the stories of those who dare to dream beyond the horizon.\n          </Typography>\n        </Stack>\n        <Typography prose="p" className="flex size-full flex-col overflow-y-auto">\n          Every great journey begins with a dream. It is the courage to pursue the unknown, the resilience to face challenges, and the belief in oneself \n          that turns visions into reality. Whether it’s the quest for knowledge, the pursuit of adventure, or the desire to leave a lasting legacy, dreams \n          shape the world we live in. From the innovators who redefined technology to explorers who mapped uncharted territories, their stories remind us \n          that nothing is impossible when driven by purpose. So, what’s your dream, and how far will you go to achieve it?\n        </Typography>\n\n        <SheetsClose />\n      </SheetsContent>\n    </Sheets>\n  );\n}',
  dialogNested:
    '"use client";\nimport { Sheets } from "@/ui/sheets";\nimport { Typography } from "@/ui/typography";\nimport { Button, buttonStyle } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\nimport { Input } from "@/ui/input";\nimport { Group } from "@/ui/group";\n\nexport function SheetsDialogDemoNested() {\n  return (\n    <Sheets variant="dialog" multipleOpen>\n      <Sheets.Trigger id="dialog-demo-1">Edit profile</Sheets.Trigger>\n\n      <Sheets.Content value="dialog-demo-1" className="flex flex-col justify-between md:w-full max-w-md">\n        <Typography el="p" prose="h4">\n          Edit profile\n        </Typography>\n        <Typography prose="muted">Make changes to your profile here. Click continue to the next step.</Typography>\n\n        <Stack>\n          <Input.Wrapper label="Name">\n            <Input placeholder="Edit your name" />\n          </Input.Wrapper>\n          <Input.Wrapper label="Username">\n            <Input placeholder="Edit Username" />\n          </Input.Wrapper>\n        </Stack>\n\n        <Group align="stretch" grow>\n          <Sheets.Close unstyled className={buttonStyle({ variant: "destructive" })}>\n            Cancel\n          </Sheets.Close>\n          <Sheets.Trigger id="dialog-demo-2" unstyled className={buttonStyle({ variant: "default" })}>\n            Continue\n          </Sheets.Trigger>\n        </Group>\n\n        <Sheets.Close />\n      </Sheets.Content>\n\n      <Sheets.Content value="dialog-demo-2" side="bottom" className="flex flex-col justify-between md:w-full max-w-md">\n        <Typography el="p" prose="h1">\n          Dialog 2\n        </Typography>\n\n        <Sheets.Trigger id="dialog-demo-3" className="absolute bottom-4">\n          Open Dialog 3\n        </Sheets.Trigger>\n\n        <Sheets.Close />\n      </Sheets.Content>\n\n      <Sheets.Content value="dialog-demo-3" side="bottom" className="flex flex-col justify-between md:w-full max-w-md">\n        <Typography el="p" prose="h1">\n          Dialog 3\n        </Typography>\n\n        <Sheets.Trigger id="dialog-demo-4" className="absolute bottom-4">\n          Open Dialog 4\n        </Sheets.Trigger>\n\n        <Sheets.Close />\n      </Sheets.Content>\n\n      <Sheets.Content value="dialog-demo-4" className="flex flex-col justify-between md:w-full max-w-md">\n        <Typography el="p" prose="h1">\n          Dialog 4\n        </Typography>\n\n        <Sheets.Close />\n      </Sheets.Content>\n    </Sheets>\n  );\n}',
  drawer:
    '// Independent Components\nimport { Sheets, SheetsContent, SheetsTrigger, SheetsClose } from "@/ui/sheets";\nimport { Typography } from "@/ui/typography";\nimport { Stack } from "@/ui/stack";\n\nexport function SheetsDrawerDemo() {\n  return (\n    <Sheets{{props}} variant="drawer">\n      <SheetsTrigger id="drawer">\n        <Typography\n          el="span"\n          data-labelopen="Open Drawer"\n          data-labelclosed="Close Drawer"\n          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"\n        />\n      </SheetsTrigger>\n\n      <SheetsContent className="flex flex-col gap-4">\n        <Stack>\n          <Typography el="h2" prose="large">\n            Lorem ipsum\n          </Typography>\n          <Typography prose="muted">Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis. repudiandae.</Typography>\n        </Stack>\n        <Typography prose="p" className="flex size-full flex-col overflow-y-auto">\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis fugit accusamus\n          expedita alias repudiandae, exercitationem maiores velit quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor atque nobis esse dignissimos\n          temporibus vel incidunt maxime provident ut dolorem hic explicabo corrupti, praesentium.\n        </Typography>\n\n        <SheetsClose />\n      </SheetsContent>\n    </Sheets>\n  );\n}',
  drawerNested:
    '"use client";\nimport { Sheets } from "@/ui/sheets";\nimport { Typography } from "@/ui/typography";\n\nexport function SheetsDrawerDemoNested() {\n  return (\n    <Sheets variant="drawer" multipleOpen>\n      <Sheets.Trigger id="drawer-demo-1">Open Drawer 1</Sheets.Trigger>\n\n      <Sheets.Content value="drawer-demo-1" side="right">\n        <Typography el="p" prose="h1">\n          Drawer 1\n        </Typography>\n        <Sheets.Trigger id="drawer-demo-2" className="absolute bottom-8">\n          Open Drawer 2\n        </Sheets.Trigger>\n        <Sheets.Close />\n      </Sheets.Content>\n\n      <Sheets.Content value="drawer-demo-2" side="right">\n        <Typography el="p" prose="h1">\n          Drawer 2\n        </Typography>\n        <Sheets.Trigger id="drawer-demo-3" className="absolute bottom-8">\n          Open Drawer 3\n        </Sheets.Trigger>\n        <Sheets.Close />\n      </Sheets.Content>\n\n      <Sheets.Content value="drawer-demo-3" side="left">\n        <Typography el="p" prose="h1">\n          Drawer 3\n        </Typography>\n        <Sheets.Trigger id="drawer-demo-4" className="absolute bottom-8">\n          Open Drawer 4\n        </Sheets.Trigger>\n        <Sheets.Close />\n      </Sheets.Content>\n\n      <Sheets.Content value="drawer-demo-4" side="top">\n        <Typography el="p" prose="h2">\n          Drawer 4\n        </Typography>\n        <Sheets.Close />\n      </Sheets.Content>\n    </Sheets>\n  );\n}',
  dropdown:
    '"use client";\nimport { Sheets } from "@/ui/sheets";\nimport { ScrollArea } from "@/ui/scroll-area";\n\nconst TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);\n\nexport function SheetsDropdownDemo() {\n  return (\n    <Sheets{{props}} variant="dropdown">\n      <Sheets.Trigger id="dropdown" className="m-auto">\n        <span\n          data-labelopen="Dropdown"\n          data-labelclosed="Dropdown"\n          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"\n        />\n      </Sheets.Trigger>\n\n      <Sheets.Content className="h-[178px] w-44">\n        <ScrollArea className="h-full p-4">\n          {TAGS.map(tag => (\n            <p key={tag} className="flex min-w-max items-center gap-3 border-b border-muted py-1 text-sm text-muted-foreground">\n              <FileIcon /> {tag}\n            </p>\n          ))}\n        </ScrollArea>\n      </Sheets.Content>\n    </Sheets>\n  );\n}',
  dropdownNested:
    '"use client";\nimport { Sheets } from "@/ui/sheets";\nimport { ScrollArea } from "@/ui/scroll-area";\nimport { Button, buttonStyle } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\n\nexport function SheetsDropdownDemoNested() {\n  return (\n    <Sheets variant="dropdown" sideOffset={2}>\n      <Sheets.Trigger id="dropdown-nested-root" unstyled className={buttonStyle({ variant: "outline", size: "icon" })}>\n        <DotsIcon />\n        <span className="sr-only">Options</span>\n      </Sheets.Trigger>\n\n      <Sheets.Content value="dropdown-nested-root" className="rounded-lg p-2 [&_button]:justify-start">\n        <ScrollArea>\n          <Stack gap={4}>\n            <Button variant="outline">Menu 1</Button>\n            <Button variant="outline">Menu 3</Button>\n            <Button variant="outline">Menu 4</Button>\n\n            <DropdownMoreOptions />\n          </Stack>\n        </ScrollArea>\n      </Sheets.Content>\n    </Sheets>\n  );\n}\n\nfunction DropdownMoreOptions() {\n  return (\n    <Sheets variant="dropdown" side="left" align="start" sideOffset={10} clickOutsideToClose>\n      <Sheets.Trigger id="dropdown-nested-child-1" unstyled className={buttonStyle({ variant: "outline" })}>\n        More...\n      </Sheets.Trigger>\n\n      <Sheets.Content className="rounded-lg p-2 [&_button]:justify-start">\n        <ScrollArea>\n          <Stack gap={4}>\n            <Button variant="outline">Sub Menu 1</Button>\n            <Button variant="outline">Sub Menu 3</Button>\n            <Button variant="outline">Sub Menu 4</Button>\n            <Button variant="outline">Sub Menu 5</Button>\n          </Stack>\n        </ScrollArea>\n      </Sheets.Content>\n    </Sheets>\n  );\n}'
};

const data = [
  { title: "Accessibility", description: "Accessibility items that can be changed." },
  { title: "Terms and Conditions", description: "You can find out more here" },
  { title: "Preferences", description: "Change the theme, color, and font style according to your preferences" },
  { title: "Updates", description: "Find the latest news about us here." }
];

// Independent Components
function AccordionDemo(props: SheetsProps) {
  return (
    <Sheets {...props} variant="accordion" defaultOpen="accessibility" className="w-full max-w-96 rounded-lg border px-6">
      {data.map((i, index) => (
        <SheetsItem
          key={index}
          value={String(i.title.replace(/\s/g, "-").toLowerCase())}
          className="group relative flex h-auto select-none flex-col border-b last-of-type:border-b-transparent"
        >
          <SheetsTrigger>
            {i.title}
            <ChevronIcon chevron="down" data-sheets="chevron" />
          </SheetsTrigger>

          <SheetsContent className="text-sm">
            <Typography prose="muted" className="pb-8">
              {i.description}
            </Typography>
          </SheetsContent>
        </SheetsItem>
      ))}
    </Sheets>
  );
}

// Compound Components
function CollapsibleDemo(props: SheetsCollapsibleProps) {
  return (
    <Sheets {...props} variant="collapsible" className="m-auto w-full max-w-80 space-y-2">
      <Sheets.Trigger className="bg-background text-muted-foreground data-[state=open]:text-constructive w-full justify-between font-mono text-sm">
        Select your &lt;Sheets /&gt;
        <Typography className="group-hover:bg-muted/90 group-data-[state=open]:border-constructive rounded-md border p-1 transition-colors">
          <ChevronIcon chevron="up-down" />
        </Typography>
      </Sheets.Trigger>

      <Typography
        el="a"
        data-ignore-clickoutside
        href="#sheets-variant-collapsible"
        className="hover:bg-muted/60 mt-4 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
      >
        @sheets/collapsible
      </Typography>

      <Sheets.Content className="space-y-2">
        {["accordion", "dialog", "drawer", "dropdown"].map(i => (
          <Typography
            el="a"
            key={i}
            href={`#sheets-variant-${i}`}
            className="hover:bg-muted/60 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
          >
            @sheets/{i}
          </Typography>
        ))}
      </Sheets.Content>
    </Sheets>
  );
}

// Only Root Component
function CollapsibleRootDemo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Stack gap={8}>
      <Button onClick={() => setIsOpen(o => !o)} className="w-max">
        {isOpen ? "Close" : "Read"}
      </Button>
      <Sheets variant="collapsible" open={isOpen} onOpenChange={setIsOpen} className="w-96 max-w-full text-justify text-sm">
        <Typography prose="span" className="max-w-full text-wrap">
          Long ago, during the era of Gol D. Roger, the Pirate King, the seas were filled with tales of adventure, danger, and mystery. His final words before
          execution ignited the "Great Pirate Era": "My treasure? It's yours if you want it. I left everything I gathered in one place." These words inspired
          countless pirates, including a young boy named Monkey D. Luffy, who dreamed of finding the legendary <em>One Piece</em> and becoming the next Pirate
          King. With a straw hat gifted by the infamous Shanks and the power of the Gomu Gomu no Mi, a mysterious Devil Fruit, Luffy set out on a journey that
          would bring together an unforgettable crew and face unimaginable challenges. From battling fierce Warlords to uncovering secrets of the Void Century,
          their adventure is a testament to loyalty, courage, and the unbreakable bonds of friendship.
        </Typography>
        <Button variant="link" onClick={() => setIsOpen(false)}>
          close
        </Button>
      </Sheets>
    </Stack>
  );
}

// Independent Components
function DialogDemo() {
  return (
    <Sheets variant="dialog">
      <SheetsTrigger>
        <Typography
          el="span"
          data-labelopen="Open Dialog"
          data-labelclosed="Close Dialog"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="flex flex-col gap-4 overflow-hidden max-md:max-h-96 md:h-[438px] md:w-[528px]">
        <Stack>
          <Typography el="h2" prose="large">
            The Power of Dreams
          </Typography>
          <Typography prose="muted">Explore the strength of ambitions and the stories of those who dare to dream beyond the horizon.</Typography>
        </Stack>
        <Typography prose="p" className="flex size-full flex-col overflow-y-auto">
          Every great journey begins with a dream. It is the courage to pursue the unknown, the resilience to face challenges, and the belief in oneself that
          turns visions into reality. Whether it’s the quest for knowledge, the pursuit of adventure, or the desire to leave a lasting legacy, dreams shape the
          world we live in. From the innovators who redefined technology to explorers who mapped uncharted territories, their stories remind us that nothing is
          impossible when driven by purpose. So, what’s your dream, and how far will you go to achieve it?
        </Typography>

        <SheetsClose />
      </SheetsContent>
    </Sheets>
  );
}

function DialogDemoNested() {
  return (
    <Sheets variant="dialog" multipleOpen>
      <Sheets.Trigger id="dialog-demo-1">Edit profile</Sheets.Trigger>

      <Sheets.Content value="dialog-demo-1" className="flex max-w-md flex-col justify-between md:w-full">
        <Typography el="p" prose="h4">
          Edit profile
        </Typography>
        <Typography prose="muted">Make changes to your profile here. Click continue to the next step.</Typography>

        <Stack>
          <Input.Wrapper label="Name">
            <Input placeholder="Edit your name" />
          </Input.Wrapper>
          <Input.Wrapper label="Username">
            <Input placeholder="Edit Username" />
          </Input.Wrapper>
        </Stack>

        <Group align="stretch" grow>
          <Sheets.Close unstyled className={buttonStyle({ variant: "destructive" })}>
            Cancel
          </Sheets.Close>
          <Sheets.Trigger id="dialog-demo-2" unstyled className={buttonStyle({ variant: "default" })}>
            Continue
          </Sheets.Trigger>
        </Group>

        <Sheets.Close />
      </Sheets.Content>

      <Sheets.Content value="dialog-demo-2" className="flex max-w-md flex-col justify-between md:w-full">
        <Typography el="p" prose="h4">
          Dialog 2
        </Typography>

        <Sheets.Trigger id="dialog-demo-3" className="absolute bottom-4">
          Open Dialog 3
        </Sheets.Trigger>

        <Sheets.Close />
      </Sheets.Content>

      <Sheets.Content value="dialog-demo-3" className="flex max-w-md flex-col justify-between md:w-full">
        <Typography el="p" prose="h4">
          Dialog 3
        </Typography>

        <Sheets.Trigger id="dialog-demo-4" className="absolute bottom-4">
          Open Dialog 4
        </Sheets.Trigger>

        <Sheets.Close />
      </Sheets.Content>

      <Sheets.Content value="dialog-demo-4" className="flex max-w-md flex-col justify-between md:w-full">
        <Typography el="p" prose="h4">
          Dialog 4
        </Typography>

        <Sheets.Close />
      </Sheets.Content>
    </Sheets>
  );
}

// Independent Components
function DrawerDemo(props: SheetsDrawerProps) {
  return (
    <Sheets {...props} variant="drawer">
      <SheetsTrigger id="drawer">
        <Typography
          el="span"
          data-labelopen="Open Drawer"
          data-labelclosed="Close Drawer"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="flex flex-col gap-4">
        <Stack>
          <Typography el="h2" prose="large">
            Lorem ipsum
          </Typography>
          <Typography prose="muted">Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis. repudiandae.</Typography>
        </Stack>
        <Typography prose="p" className="flex size-full flex-col overflow-y-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis fugit accusamus
          expedita alias repudiandae, exercitationem maiores velit quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor atque nobis esse dignissimos
          temporibus vel incidunt maxime provident ut dolorem hic explicabo corrupti, praesentium.
        </Typography>

        <SheetsClose />
      </SheetsContent>
    </Sheets>
  );
}

function DrawerDemoNested() {
  return (
    <Sheets variant="drawer" multipleOpen>
      <Sheets.Trigger id="drawer-demo-1">Open Drawer 1</Sheets.Trigger>

      <Sheets.Content value="drawer-demo-1" side="right">
        <Typography el="p" prose="h1">
          Drawer 1
        </Typography>
        <Sheets.Trigger id="drawer-demo-2" className="absolute bottom-8">
          Open Drawer 2
        </Sheets.Trigger>
        <Sheets.Close />
      </Sheets.Content>

      <Sheets.Content value="drawer-demo-2" side="right">
        <Typography el="p" prose="h1">
          Drawer 2
        </Typography>
        <Sheets.Trigger id="drawer-demo-3" className="absolute bottom-8">
          Open Drawer 3
        </Sheets.Trigger>
        <Sheets.Close />
      </Sheets.Content>

      <Sheets.Content value="drawer-demo-3" side="left">
        <Typography el="p" prose="h1">
          Drawer 3
        </Typography>
        <Sheets.Trigger id="drawer-demo-4" className="absolute bottom-8">
          Open Drawer 4
        </Sheets.Trigger>
        <Sheets.Close />
      </Sheets.Content>

      <Sheets.Content value="drawer-demo-4" side="top">
        <Typography el="p" prose="h2">
          Drawer 4
        </Typography>
        <Sheets.Close />
      </Sheets.Content>
    </Sheets>
  );
}

const TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

function DropdownDemo(props: SheetsDropdownProps) {
  return (
    <Sheets {...props} variant="dropdown">
      <Sheets.Trigger id="dropdown-demo" className="m-auto">
        <span
          data-labelopen="Dropdown"
          data-labelclosed="Dropdown"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </Sheets.Trigger>

      <Sheets.Content className="h-[178px] w-44">
        <ScrollArea className="h-full p-4">
          {TAGS.map(tag => (
            <p key={tag} className="border-muted text-muted-foreground flex min-w-max items-center gap-3 border-b py-1 text-sm">
              <FileIcon /> {tag}
            </p>
          ))}
        </ScrollArea>
      </Sheets.Content>
    </Sheets>
  );
}

function DropdownDemoNested() {
  return (
    <Sheets variant="dropdown" sideOffset={2}>
      <Sheets.Trigger id="dropdown-nested-root" unstyled className={buttonStyle({ variant: "outline", size: "icon" })}>
        <DotsIcon />
        <span className="sr-only">Options</span>
      </Sheets.Trigger>

      <Sheets.Content value="dropdown-nested-root" className="rounded-lg p-2 [&_button]:justify-start">
        <ScrollArea>
          <Stack gap={4}>
            <Button variant="outline">Menu 1</Button>
            <Button variant="outline">Menu 3</Button>
            <Button variant="outline">Menu 4</Button>

            <MoreOptions />
          </Stack>
        </ScrollArea>
      </Sheets.Content>
    </Sheets>
  );
}

function MoreOptions() {
  return (
    <Sheets variant="dropdown" side="left" align="start" sideOffset={10} clickOutsideToClose>
      <Sheets.Trigger id="dropdown-nested-child-1" unstyled className={buttonStyle({ variant: "outline" })}>
        More...
      </Sheets.Trigger>

      <Sheets.Content className="rounded-lg p-2 [&_button]:justify-start">
        <ScrollArea>
          <Stack gap={4}>
            <Button variant="outline">Sub Menu 1</Button>
            <Button variant="outline">Sub Menu 3</Button>
            <Button variant="outline">Sub Menu 4</Button>
            <Button variant="outline">Sub Menu 5</Button>
          </Stack>
        </ScrollArea>
      </Sheets.Content>
    </Sheets>
  );
}

const accordion: DataTrees = {
  type: "code",
  orientation: "vertical",
  component: AccordionDemo,
  code: codes.accordion,
  defaultExpanded: false,
  classNames: { demoInner: "w-full centered" }
};

const collapsible: DataTrees = {
  type: "configurator",
  orientation: "vertical",
  component: CollapsibleDemo,
  code: codes.collapsible,
  centered: true,
  defaultExpanded: false,
  classNames: { demoInner: "w-full centered" },
  controls: [{ prop: "clickOutsideToClose", type: "boolean", initialValue: false, libraryValue: false }]
};

const collapsible2: DataTrees = {
  type: "code",
  component: CollapsibleRootDemo,
  code: codes.collapsible2,
  centered: true,
  defaultExpanded: false
};

const dialog: DataTrees = {
  type: "code",
  component: DialogDemo,
  code: codes.dialog,
  centered: true,
  defaultExpanded: false
};

const dialogNested: DataTrees = {
  type: "code",
  component: DialogDemoNested,
  code: codes.dialogNested,
  centered: true,
  defaultExpanded: false
};

const drawer: DataTrees = {
  type: "configurator",
  orientation: "vertical",
  component: DrawerDemo,
  code: codes.drawer,
  centered: true,
  defaultExpanded: false,
  controls: [{ prop: "side", type: "select", initialValue: "right", libraryValue: "right", data: ["top", "right", "bottom", "left"] }]
};

const drawerNested: DataTrees = {
  type: "code",
  component: DrawerDemoNested,
  code: codes.drawerNested,
  centered: true,
  defaultExpanded: false
};

const dropdown: DataTrees = {
  type: "configurator",
  orientation: "vertical",
  component: DropdownDemo,
  code: codes.dropdown,
  centered: true,
  defaultExpanded: false,
  controls: [
    { prop: "side", type: "select", initialValue: "bottom", libraryValue: "bottom", data: ["top", "right", "bottom", "left"] },
    { prop: "align", type: "select", initialValue: "center", libraryValue: null, data: ["center", "start", "end"] },
    { prop: "sideOffset", type: "number", initialValue: 4, libraryValue: null, min: 0, max: 16 },
    { prop: "clickOutsideToClose", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "withOverlay", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "modal", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const dropdownNested: DataTrees = {
  type: "code",
  component: DropdownDemoNested,
  code: codes.dropdownNested,
  centered: true,
  defaultExpanded: false
};

export const SheetsDemos = {
  accordion,
  collapsible,
  collapsible2,
  dialog,
  dialogNested,
  drawer,
  drawerNested,
  dropdown,
  dropdownNested
};
