import { Code } from "@/ui/code";
import { Stack } from "@/ui/stack";
import { __docs_demo } from "../../__docs_demo";

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
}`

export function Demo() {
  return (
    <Stack className="flex max-w-full flex-col items-center justify-center">
      <__docs_demo.comment title="/* <Code block code='React.createElement()'/> */" className="mr-auto mt-0" />
      <Code block code="React.createElement()"/>
      <hr data-ignore />
      <__docs_demo.comment title="/* <Code quote>{code}</Code> */" className="-mb-6 mr-auto mt-0" />
      <Code quote>{code}</Code>
      <hr data-ignore />
      <__docs_demo.comment title="/* <Code samp={data} /> */" className="mr-auto mt-0" />
      <Code samp={data} />
    </Stack>
  );
}
