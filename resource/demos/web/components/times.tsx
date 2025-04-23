"use client";
import { Times, type TimesProps } from "@/ui/times";
import { Stack } from "@/ui/stack";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage: '"use client";\nimport { Times } from "@/ui/times";\n\nexport function TimesDemo() {\n  return <Times.Posted withInterval diff="long" times={{ createdAt: new Date("2019-11-22T16:30"), updatedAt: new Date("2024-02-22T16:30") }} />;\n}',
  configurator: '"use client";\nimport { Times } from "@/ui/times";\n\nexport function TimesDemo() {\n  return (\n    <Stack>\n      <Times{{props}} />\n      <Times.Posted{{props}} withInterval times={{ createdAt: new Date("2019-11-22T16:30"), updatedAt: new Date("2024-02-22T16:30") }} />\n    </Stack>\n  );\n}'
};

function Demo() {
  return <Times.Posted withInterval diff="long" times={{ createdAt: new Date("2019-11-22T16:30"), updatedAt: new Date("2024-02-22T16:30") }} />;
}

function ConfiguratorDemo(_props: TimesProps) {
  const { time, diff } = _props;
  return (
    <Stack>
      <Times time={time} diff={diff} />
      <Times.Posted diff={diff} withInterval times={{ createdAt: new Date("2019-11-22T16:30"), updatedAt: new Date("2024-02-22T16:30") }} />
    </Stack>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "time", type: "string", inputType: "datetime-local", initialValue: "2019-11-22T16:30", libraryValue: null },
    { prop: "diff", type: "select", initialValue: "short", libraryValue: "short", data: ["days", "short", "long", "growth"] }
  ]
};

export const TimesDemos = {
  usage,
  configurator
};
