import { ScrollArea, type ScrollAreaProps } from "@/ui/scroll-area";
import { Typography } from "@/ui/typography";
import { FileIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { ScrollArea } from "@/ui/scroll-area";\nimport { Typography } from "@/ui/typography";\nimport { FileIcon } from "@/icons/*";\n\nconst TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);\nexport function ScrollAreaDemo() {\n  return (\n    <ScrollArea\n      /* use color="" to changes thumb color only */\n      color={{ thumb: "hsl(var(--muted-foreground))", track: "hsl(var(--muted))" }}\n      className="rounded-md border p-4 data-[orientation=horizontal]:h-max data-[orientation=vertical]:h-72 data-[orientation=vertical]:w-48"\n    >\n      <Typography\n        prose="h6"\n        className="inline-flex min-w-max max-w-max items-center rounded-sm border border-constructive bg-constructive/30 px-1.5 py-1 leading-none text-constructive-emphasis group-data-[orientation=horizontal]/sa:mr-4 group-data-[orientation=vertical]/sa:mb-4"\n      >\n        Scrollbar area\n      </Typography>\n      {TAGS.map(tag => (\n        <p\n          key={tag}\n          className="flex min-w-max items-center gap-3 border-muted text-sm text-muted-foreground group-data-[orientation=vertical]/sa:mt-2 group-data-[orientation=horizontal]/sa:border-l group-data-[orientation=vertical]/sa:border-b group-data-[orientation=horizontal]/sa:px-4 group-data-[orientation=vertical]/sa:py-1"\n        >\n          <FileIcon /> {tag}\n        </p>\n      ))}\n    </ScrollArea>\n  );\n}',
  configurator:
    'import { ScrollArea } from "@/ui/scroll-area";\nimport { Typography } from "@/ui/typography";\nimport { FileIcon } from "@/icons/*";\n\n\nconst TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);\nexport function ScrollAreaDemo() {\n  return (\n    <ScrollArea\n      {{props}}\n      className="rounded-md border p-4 data-[orientation=horizontal]:h-max data-[orientation=vertical]:h-72 data-[orientation=vertical]:w-full"\n    >\n      <Typography\n        prose="h6"\n        className="inline-flex min-w-max max-w-max items-center rounded-sm border border-constructive bg-constructive/30 px-1.5 py-1 leading-none text-constructive-emphasis group-data-[orientation=horizontal]/sa:mr-4 group-data-[orientation=vertical]/sa:mb-4"\n      >\n        Scrollbar area\n      </Typography>\n      {TAGS.map(tag => (\n        <p\n          key={tag}\n          className="flex min-w-max items-center gap-3 border-muted text-sm text-muted-foreground group-data-[orientation=vertical]/sa:mt-2 group-data-[orientation=horizontal]/sa:border-l group-data-[orientation=vertical]/sa:border-b group-data-[orientation=horizontal]/sa:px-4 group-data-[orientation=vertical]/sa:py-1"\n        >\n          <FileIcon /> {tag}\n        </p>\n      ))}\n    </ScrollArea>\n  );\n}'
};

function Demo() {
  return (
    <ScrollArea
      /* use `color=""` to changes thumb color only */
      color={{ thumb: "hsl(var(--muted-foreground))", track: "hsl(var(--muted))" }}
      className="rounded-md border p-4 data-[orientation=horizontal]:h-max data-[orientation=vertical]:h-72 data-[orientation=vertical]:w-48"
    >
      <Typography
        prose="h6"
        className="inline-flex min-w-max max-w-max items-center rounded-sm border border-constructive bg-constructive/30 px-1.5 py-1 leading-none text-constructive-emphasis group-data-[orientation=horizontal]/sa:mr-4 group-data-[orientation=vertical]/sa:mb-4"
      >
        Scrollbar area
      </Typography>
      {TAGS.map(tag => (
        <p
          key={tag}
          className="flex min-w-max items-center gap-3 border-muted text-sm text-muted-foreground group-data-[orientation=vertical]/sa:mt-2 group-data-[orientation=horizontal]/sa:border-l group-data-[orientation=vertical]/sa:border-b group-data-[orientation=horizontal]/sa:px-4 group-data-[orientation=vertical]/sa:py-1"
        >
          <FileIcon /> {tag}
        </p>
      ))}
    </ScrollArea>
  );
}

const TAGS = Array.from({ length: 58 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

function ConfiguratorDemo(props: ScrollAreaProps) {
  return (
    <ScrollArea
      {...props}
      className="rounded-md border p-4 data-[orientation=horizontal]:h-max data-[orientation=vertical]:h-72 data-[orientation=vertical]:w-full"
    >
      <Typography
        prose="h6"
        className="inline-flex min-w-max max-w-max items-center rounded-sm border border-constructive bg-constructive/30 px-1.5 py-1 leading-none text-constructive-emphasis group-data-[orientation=horizontal]/sa:mr-4 group-data-[orientation=vertical]/sa:mb-4"
      >
        Scrollbar area
      </Typography>
      {TAGS.map(tag => (
        <p
          key={tag}
          className="flex min-w-max items-center gap-3 border-muted text-sm text-muted-foreground group-data-[orientation=vertical]/sa:mt-2 group-data-[orientation=horizontal]/sa:border-l group-data-[orientation=vertical]/sa:border-b group-data-[orientation=horizontal]/sa:px-4 group-data-[orientation=vertical]/sa:py-1"
        >
          <FileIcon /> {tag}
        </p>
      ))}
    </ScrollArea>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "w-full centered" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "w-full centered" },
  controls: [
    { prop: "orientation", type: "select", initialValue: "vertical", libraryValue: "vertical", data: ["vertical", "horizontal"] },
    { prop: "type", type: "select", initialValue: "auto", libraryValue: "auto", data: ["auto", "always", "scroll", "hover"] },
    { prop: "size", type: "number", initialValue: 10, libraryValue: 10, min: 6, max: 42 },
    { prop: "color", type: "color", initialValue: "hsl(var(--muted))", libraryValue: "hsl(var(--muted))" }
  ]
};

export const ScrollAreaDemos = {
  usage,
  configurator
};
