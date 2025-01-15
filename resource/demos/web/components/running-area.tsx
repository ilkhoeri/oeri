import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { RunningArea, type RunningAreaProps } from "@/ui/running-area";
import { Typography } from "@/ui/typography";

const codes = {
  usage:
    'import { RunningArea } from "@/ui/running-area";\nimport { Typography } from "@/ui/typography";\n\nexport function TypographyDemo() {\n  return (\n    <div className="w-full space-y-12 flex flex-col items-center justify-center">\n      <Typography el="h6" prose="h3">Sponsor</Typography>\n      <RunningArea classNames={{ container: "w-full", content: "space-x-2" }}>\n        {[...Array(5)].map((_, index) => (\n          <span key={index} className="select-none flex items-center justify-center border font-extrabold text-h1 py-4 px-8 rounded-xl w-52">\n            {index + 1}\n          </span>\n        ))}\n      </RunningArea>\n    </div>\n  );\n}',
  configurator:
    'import { RunningArea } from "@/ui/running-area";\n\nexport function TypographyDemo() {\n  return (\n    <RunningArea\n      {{props}}\n      classNames={{\n        container: "h-10 w-full overflow-hidden",\n        content: "min-w-max whitespace-nowrap group-data-[running=x]:space-x-2 group-data-[running=y]:space-y-2"\n      }}\n    >\n      {[...Array(5)].map((_, index) => (\n        <span key={index} className="select-none font-extrabold text-h1">\n          Your Words\n        </span>\n      ))}\n    </RunningArea>\n  );\n}'
};

function Demo() {
  return (
    <div className="w-full space-y-12 flex flex-col items-center justify-center">
      <Typography el="h6" prose="h3">
        Sponsor
      </Typography>
      <RunningArea classNames={{ container: "w-full", content: "space-x-2" }}>
        {[...Array(5)].map((_, index) => (
          <span key={index} className="select-none flex items-center justify-center border font-extrabold text-h1 py-4 px-8 rounded-xl w-52">
            {index + 1}
          </span>
        ))}
      </RunningArea>
    </div>
  );
}

function ConfiguratorDemo(props: RunningAreaProps) {
  return (
    <RunningArea
      {...props}
      classNames={{
        container: "h-10 w-full overflow-hidden",
        content: "min-w-max whitespace-nowrap group-data-[running=x]:space-x-2 group-data-[running=y]:space-y-2"
      }}
    >
      {[...Array(5)].map((_, index) => (
        <span key={index} className="select-none font-extrabold text-h1">
          Your Words
        </span>
      ))}
    </RunningArea>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "w-full centered" },
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    {
      prop: "direction",
      type: "select",
      initialValue: "right-to-left",
      libraryValue: "right-to-left",
      data: ["right-to-left", "left-to-right", "top-to-bottom", "bottom-to-top"]
    },
    { prop: "duration", type: "number", initialValue: 25, libraryValue: 25, min: 10, max: 90 }
  ]
};

export const RunningAreaDemos = {
  usage,
  configurator
};
