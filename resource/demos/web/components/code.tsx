import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Code, CodeProps } from "@/ui/code";
import { Stack } from "@/ui/stack";

const codes = {
  usage:
    'import { Code } from "@/ui/code";\nimport { Stack } from "@/ui/stack";\n\nconst data = [\n  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },\n  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },\n  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },\n  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },\n  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 },\n  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99 }\n];\n\nconst code = `{\n  "filePath": "C:/Data/path/package.json",\n  "error": {\n    "errno": -4048,\n    "code": "EPERM",\n    "syscall": "open",\n    "path": "C:\\\\Data\\\\path\\\\package.json"\n\n  },\n  "_tag": "fs.WriteFileError"\n}`;\n\nexport function CodeDemo() {\n  return (\n    <Stack className="flex max-w-full flex-col items-center justify-center">\n      <Code block code="React.createElement()" />\n      <Code quote>{code}</Code>\n      <Code samp={data} />\n    </Stack>\n  );\n}',
  configurator:
    'import { Code } from "@/ui/code";\n\nconst data = [\n  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },\n  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },\n  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },\n  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },\n  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 },\n  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99 }\n];\n\nconst code = `{\n  "filePath": "C:/Data/path/package.json",\n  "error": {\n    "errno": -4048,\n    "code": "EPERM",\n    "syscall": "open",\n    "path": "C:\\\\Data\\\\path\\\\package.json"\n\n  },\n  "_tag": "fs.WriteFileError"\n}`;\n\nexport function CodeDemo() {\n  return <Code{{props}} samp={data} code={code} />;\n}'
};

const data = [
  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },
  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },
  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },
  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },
  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 },
  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99 }
];

const code = `{
  "filePath": "C:/Data/path/package.json",
  "error": {
    "errno": -4048,
    "code": "EPERM",
    "syscall": "open",
    "path": "C:\\Data\\path\\package.json"

  },
  "_tag": "fs.WriteFileError"
}`;

function Demo() {
  return (
    <Stack className="flex max-w-full flex-col items-center justify-center">
      <Code block code="React.createElement()" />
      <Code quote>{code}</Code>
      <Code samp={data} />
    </Stack>
  );
}

function CodeDemo(props: CodeProps) {
  return <Code {...props} samp={data} code={code} />;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: CodeDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "block", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "quote", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const CodeDemos = {
  usage,
  configurator
};
