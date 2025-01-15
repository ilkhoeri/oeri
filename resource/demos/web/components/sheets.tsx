"use client";
import { useState } from "react";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Sheets, SheetsItem, SheetsContent, SheetsTrigger, SheetsClosed, type SheetsProps } from "@/ui/sheets";
import { ScrollArea } from "@/ui/scroll-area";
import { ChevronIcon, FileIcon } from "@/icons/*";
// import { Accordion } from "@/source/ondevelopment/components/accordion";

const codes = {
  accordion:
    '// Independent Components\nimport { Sheets, SheetsItem, SheetsContent, SheetsTrigger } from "@/ui/sheets";\nimport { ChevronIcon } from "@/icons/*";\n\nconst data = [\n  { title: "Accessibility", description: "Accessibility items that can be changed." },\n  { title: "Terms and Conditions", description: "You can find out more here" },\n  { title: "Preferences", description: "Change the theme, color, and font style according to your preferences" },\n  { title: "Updates", description: "Find the latest news about us here." }\n];\n\nexport function SheetsAccordionDemo() {\n  return (\n    <Sheets{{props}} className="w-full max-w-96 rounded-lg border px-6">\n      {data.map((i, index) => (\n        <SheetsItem key={index} className="last-of-type:border-b-0">\n          <SheetsTrigger id={String(i.title.toLowerCase().replace(/\\s/g, "-"))}>\n            {i.title}\n            <ChevronIcon chevron="down" data-origin="arrow-collapse" />\n          </SheetsTrigger>\n\n          <SheetsContent className="text-sm" id={String(index)}>\n            <p className="pb-4">{i.description}</p>\n          </SheetsContent>\n        </SheetsItem>\n      ))}\n    </Sheets>\n  );\n}',
  collapsible:
    '// Compound Components must be client side rendering\n"use client";\nimport { Sheets } from "@/ui/sheets";\nimport { ChevronIcon } from "@/icons/*";\n\nexport function SheetsCollapsibleDemo() {\n  return (\n    <Sheets{{props}} variant="collapsible" className="m-auto w-full max-w-80 space-y-2">\n      <Sheets.Trigger className="w-full justify-between bg-background font-mono text-sm text-color">\n        Select your &lt;Sheets /&gt;\n        <span className="rounded-md border p-1 transition-colors group-hover:bg-muted/90 group-data-[state=open]:border-color">\n          <ChevronIcon chevron="up-down" />\n        </span>\n      </Sheets.Trigger>\n\n      <a href="#sheets-collapsible" className="mt-4 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60">\n        @sheets/collapsible\n      </a>\n\n      <Sheets.Content className="space-y-2">\n        {["accordion", "dialog", "drawer", "dropdown"].map(i => (\n          <a key={i} href={`#sheets-${i}`} className="w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60">\n            @sheets/{i}\n          </a>\n        ))}\n      </Sheets.Content>\n    </Sheets>\n  );\n}',
  collapsible2:
    '// Only Root Components\n"use client";\nimport { useState } from "react";\nimport { Sheets } from "@/ui/sheets";\n\nexport function SheetsCollapsibleDemo() {\n  const [isOpen, setIsOpen] = useState<boolean>(false);\n\n  return (\n    <div className="m-auto flex flex-col items-center justify-center gap-2">\n      <button\n        type="button"\n        onClick={() => setIsOpen(o => !o)}\n        className="group relative z-50 h-9 w-24 min-w-24 rounded-md bg-color px-2 text-center font-semibold text-background hover:bg-color/90"\n      >\n        {isOpen ? "Close" : "Read"}\n      </button>\n      <Sheets variant="collapsible" open={isOpen} onOpenChange={setIsOpen} className="w-80 text-justify text-sm">\n        <p>\n          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, eius adipisci voluptas nemo reprehenderit recusandae. Incidunt distinctio\n          voluptates veniam quia soluta voluptate unde nisi autem dignissimos doloremque fuga, corrupti repellat pariatur molestiae illum. Enim iure doloribus\n          culpa soluta mollitia, dolores labore cupiditate fugiat temporibus? Officia est laudantium consectetur ipsam doloribus.\n        </p>\n      </Sheets>\n    </div>\n  );\n}',
  dialog:
    '// Independent Components\n"use client";\nimport React from "react";\nimport { Sheets, SheetsClosed, SheetsContent, SheetsTrigger } from "@/ui/sheets";\n\nexport function SheetsDialogDemo() {\n  return (\n    <Sheets variant="dialog">\n      <SheetsTrigger className="m-auto">\n        <span\n          data-labelopen="Open Dialog"\n          data-labelclosed="Close Dialog"\n          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"\n        />\n      </SheetsTrigger>\n\n      <SheetsContent className="flex flex-col gap-4 overflow-hidden md:h-[316px] md:w-[426px]">\n        <div className="flex flex-col space-y-1.5 text-start">\n          <h2 className="text-lg font-semibold leading-none tracking-tight">\n            Lorem ipsum\n          </h2>\n          <p className="text-sm text-muted-foreground">\n            Tenetur fugiat aspernatur aut quas ex praesentium molestias\n            officiis. repudiandae.\n          </p>\n        </div>\n        <div className="flex size-full flex-col overflow-y-auto text-sm">\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur\n          fugiat aspernatur aut quas ex praesentium molestias officiis fugit\n          accusamus expedita alias repudiandae, exercitationem maiores velit\n          quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor atque\n          nobis esse dignissimos temporibus vel incidunt maxime provident ut\n          dolorem hic explicabo corrupti, praesentium.\n        </div>\n\n        <SheetsClosed />\n      </SheetsContent>\n    </Sheets>\n  );\n}\n',
  drawer:
    '// Independent Components\nimport { Sheets, SheetsClosed, SheetsContent, SheetsTrigger } from "@/ui/sheets";\n\nexport function SheetsDrawerDemo() {\n  return (\n    <Sheets{{props}} variant="drawer">\n      <SheetsTrigger id="drawer">\n        <span\n          data-labelopen="Open Drawer"\n          data-labelclosed="Close Drawer"\n          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"\n        />\n      </SheetsTrigger>\n\n      <SheetsContent className="flex flex-col gap-4">\n        <div className="flex flex-col gap-6 space-y-1.5 text-start">\n          <h2 className="text-lg font-semibold leading-none tracking-tight">\n            Lorem ipsum\n          </h2>\n          <p className="text-sm text-muted-foreground">\n            Tenetur fugiat aspernatur aut quas ex praesentium molestias\n            officiis. repudiandae.\n          </p>\n        </div>\n        <div className="flex size-full flex-col overflow-y-auto text-sm">\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur\n          fugiat aspernatur aut quas ex praesentium molestias officiis fugit\n          accusamus expedita alias repudiandae, exercitationem maiores velit\n          quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor\n          atque nobis esse dignissimos temporibus vel incidunt maxime\n          provident ut dolorem hic explicabo corrupti, praesentium.\n        </div>\n\n        <SheetsClosed />\n      </SheetsContent>\n    </Sheets>\n  );\n}',
  dropdown:
    'import { Sheets, SheetsContent, SheetsTrigger } from "@/ui/sheets";\nimport { ScrollArea } from "@/ui/scroll-area";\nimport { FileIcon } from "@/icons/*";\n\nconst TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);\n\nexport function SheetsDropdownDemo() {\n  return (\n    <Sheets{{props}} variant="dropdown">\n      <SheetsTrigger id="dropdown" className="m-auto">\n        <span\n          data-labelopen="Dropdown"\n          data-labelclosed="Dropdown"\n          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"\n        />\n      </SheetsTrigger>\n\n      <SheetsContent className="z-20 h-[178px] w-44">\n        <ScrollArea className="p-4 h-full">\n          {TAGS.map(tag => (\n            <p\n              key={tag}\n              className="flex min-w-max items-center gap-3 border-muted text-sm text-muted-foreground border-b py-1"\n            >\n              <FileIcon /> {tag}\n            </p>\n          ))}\n        </ScrollArea>\n      </SheetsContent>\n    </Sheets>\n  );\n}'
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
    <div className="mx-auto flex size-max min-h-max flex-col">
      {/* {"// Sheets"} */}
      <Sheets {...props} defaultOpen="accessibility" className="w-full max-w-96 rounded-lg border px-6">
        {data.map((i, index) => (
          <SheetsItem key={index} className="last-of-type:border-b-0">
            <SheetsTrigger id={String(i.title.toLowerCase().replace(/\s/g, "-"))}>
              {i.title}
              <ChevronIcon chevron="down" data-origin="arrow-collapse" />
            </SheetsTrigger>

            <SheetsContent className="text-sm" id={String(index)}>
              <p className="pb-4">{i.description}</p>
            </SheetsContent>
          </SheetsItem>
        ))}
      </Sheets>

      {/* {"// Accordion"}
      <Accordion defaultOpen="accessibility" className="w-full max-w-96 rounded-lg border px-6">
        {data.map((item, index) => (
          <Accordion.Item
            key={index}
            value={String(item.title.toLowerCase().replace(/\s/g, "-"))}
            className="group relative flex h-auto select-none flex-col border-b last-of-type:border-b-transparent"
          >
            <Accordion.Trigger>{item.title}</Accordion.Trigger>
            <Accordion.Content>{item.description}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion> */}
    </div>
  );
}

// Compound Components
function CollapsibleDemo(props: SheetsProps) {
  return (
    <Sheets {...props} variant="collapsible" className="m-auto w-full max-w-80 space-y-2">
      <Sheets.Trigger className="w-full justify-between bg-background font-mono text-sm text-color">
        Select your &lt;Sheets /&gt;
        <span className="rounded-md border p-1 transition-colors group-hover:bg-muted/90 group-data-[state=open]:border-color">
          <ChevronIcon chevron="up-down" />
        </span>
      </Sheets.Trigger>

      <a href="#sheets-collapsible" className="mt-4 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60">
        @sheets/collapsible
      </a>

      <Sheets.Content className="space-y-2">
        {["accordion", "dialog", "drawer", "dropdown"].map(i => (
          <a key={i} href={`#sheets-${i}`} className="w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60">
            @sheets/{i}
          </a>
        ))}
      </Sheets.Content>
    </Sheets>
  );
}

// Only Root Component
function CollapsibleRootDemo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        className="group relative z-50 h-9 w-24 min-w-24 rounded-md bg-color px-2 text-center font-semibold text-background hover:bg-color/90"
      >
        {isOpen ? "Close" : "Read"}
      </button>
      <Sheets variant="collapsible" open={isOpen} onOpenChange={setIsOpen} className="w-80 text-justify text-sm">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, eius adipisci voluptas nemo reprehenderit recusandae. Incidunt distinctio
          voluptates veniam quia soluta voluptate unde nisi autem dignissimos doloremque fuga, corrupti repellat pariatur molestiae illum. Enim iure doloribus
          culpa soluta mollitia, dolores labore cupiditate fugiat temporibus? Officia est laudantium consectetur ipsam doloribus.
        </p>
      </Sheets>
    </div>
  );
}

// Independent Components
function DialogDemo() {
  return (
    <Sheets variant="dialog">
      <SheetsTrigger className="m-auto">
        <span
          data-labelopen="Open Dialog"
          data-labelclosed="Close Dialog"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="flex flex-col gap-4 overflow-hidden md:h-[316px] md:w-[426px]">
        <div className="flex flex-col space-y-1.5 text-start">
          <h2 className="text-lg font-semibold leading-none tracking-tight">Lorem ipsum</h2>
          <p className="text-sm text-muted-foreground">Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis. repudiandae.</p>
        </div>
        <div className="flex size-full flex-col overflow-y-auto text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis fugit accusamus
          expedita alias repudiandae, exercitationem maiores velit quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor atque nobis esse dignissimos
          temporibus vel incidunt maxime provident ut dolorem hic explicabo corrupti, praesentium.
        </div>

        <SheetsClosed />
      </SheetsContent>
    </Sheets>
  );
}

// Independent Components
function DrawerDemo(props: SheetsProps) {
  return (
    <Sheets {...props} variant="drawer">
      <SheetsTrigger id="drawer">
        <span
          data-labelopen="Open Drawer"
          data-labelclosed="Close Drawer"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 space-y-1.5 text-start">
          <h2 className="text-lg font-semibold leading-none tracking-tight">Lorem ipsum</h2>
          <p className="text-sm text-muted-foreground">Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis. repudiandae.</p>
        </div>
        <div className="flex size-full flex-col overflow-y-auto text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat aspernatur aut quas ex praesentium molestias officiis fugit accusamus
          expedita alias repudiandae, exercitationem maiores velit quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor atque nobis esse dignissimos
          temporibus vel incidunt maxime provident ut dolorem hic explicabo corrupti, praesentium.
        </div>

        <SheetsClosed />
      </SheetsContent>
    </Sheets>
  );
}

const TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

function DropdownDemo(props: SheetsProps) {
  return (
    <Sheets {...props} variant="dropdown">
      <SheetsTrigger id="dropdown" className="m-auto">
        <span
          data-labelopen="Dropdown"
          data-labelclosed="Dropdown"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="z-20 h-[178px] w-44">
        <ScrollArea className="h-full p-4">
          {TAGS.map(tag => (
            <p key={tag} className="flex min-w-max items-center gap-3 border-b border-muted py-1 text-sm text-muted-foreground">
              <FileIcon /> {tag}
            </p>
          ))}
        </ScrollArea>
      </SheetsContent>
    </Sheets>
  );
}

const accordion: DataTrees = {
  type: "configurator",
  component: AccordionDemo,
  code: codes.accordion,
  classNames: { demoInner: "w-full centered" },
  controls: [{ prop: "multipleOpen", type: "boolean", initialValue: false, libraryValue: false }]
};

const collapsible: DataTrees = {
  type: "configurator",
  component: CollapsibleDemo,
  code: codes.collapsible,
  centered: true,
  classNames: { demoInner: "w-full centered" },
  controls: [{ prop: "clickOutsideToClose", type: "boolean", initialValue: false, libraryValue: false }]
};

const collapsible2: DataTrees = {
  type: "code",
  component: CollapsibleRootDemo,
  code: codes.collapsible2,
  centered: true
};

const dialog: DataTrees = {
  type: "code",
  component: DialogDemo,
  code: codes.dialog,
  centered: true
};

const drawer: DataTrees = {
  type: "configurator",
  component: DrawerDemo,
  code: codes.drawer,
  centered: true,
  controls: [{ prop: "side", type: "select", initialValue: "right", libraryValue: "right", data: ["top", "right", "bottom", "left"] }]
};

const dropdown: DataTrees = {
  type: "configurator",
  component: DropdownDemo,
  code: codes.dropdown,
  centered: true,
  controls: [
    { prop: "side", type: "select", initialValue: "right", libraryValue: "right", data: ["top", "right", "bottom", "left"] },
    { prop: "align", type: "select", initialValue: "center", libraryValue: null, data: ["center", "start", "end"] },
    { prop: "sideOffset", type: "number", initialValue: 4, libraryValue: null, min: 0, max: 16 },
    { prop: "clickOutsideToClose", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const SheetsDemos = {
  accordion,
  collapsible,
  collapsible2,
  dialog,
  drawer,
  dropdown
};
