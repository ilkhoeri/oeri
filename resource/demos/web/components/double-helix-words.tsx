import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { DoubleHelixWords, type DoubleHelixWordsProps } from "@/ui/double-helix-words";

const codes = {
  usage:
    'import { DoubleHelixWords } from "@/ui/double-helix-words";\n\nexport function DoubleHelixWordsDemo() {\n  return (\n    <DoubleHelixWords\n      gap={4}\n      distance={80}\n      placeholders="This world is truly fair"\n      className="tracking-tight relative h-72 text-[clamp(1.125rem,11px+3.5vw,1.875rem)] font-bold leading-4"\n    />\n  );\n}',
  configurator:
    'import { DoubleHelixWords } from "@/ui/double-helix-words";\n\nexport function DoubleHelixWordsDemo() {\n  return <DoubleHelixWords{{props}} className="relative h-80 text-xl" />;\n}'
};

function Demo() {
  return (
    <DoubleHelixWords
      gap={4}
      distance={80}
      placeholders="This world is truly fair"
      className="relative h-72 text-[clamp(1.125rem,11px+3.5vw,1.875rem)] font-bold leading-4 tracking-tight"
    />
  );
}

function ConfiguratorDemo(props: DoubleHelixWordsProps) {
  return <DoubleHelixWords {...props} className="relative h-80 text-xl" />;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "placeholders", type: "string", initialValue: "Input Your Words", libraryValue: null },
    { prop: "speed", type: "number", initialValue: 400, libraryValue: 400, min: 200, max: 1200 },
    { prop: "gap", type: "number", initialValue: 6, libraryValue: 6, min: 4, max: 24 },
    { prop: "distance", type: "number", initialValue: 100, libraryValue: 100, min: 32, max: 160 }
  ]
};

export const DoubleHelixWordsDemos = {
  usage,
  configurator
};
