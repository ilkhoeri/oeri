import { TypingWords, type TypingWordsProps } from "@/ui/typing-words";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { TypingWords } from "@/ui/typing-words";\n\nconst placeholders = [\n  "Welcome to Our Web App!",\n  "Experience Seamless Integration",\n  "Type, Explore, Innovate",\n  "React. Build. Repeat.",\n  "Documentation Made Simple",\n  "Next.js + TypeScript = 💙",\n  "Discover Powerful UI Components",\n  "Your Development Partner",\n  "Create Stunning Interfaces",\n  "Coding Meets Creativity"\n];\n\nexport function TypingWordsDemo() {\n  return <TypingWords placeholders={placeholders} withCursor className="[--size:clamp(1.125rem,11px+3.5vw,1.875rem)] text-[calc(var(--size))] [--cursor-h:--size] leading-none font-bold" />;\n}',
  configurator: 'import { TypingWords } from "@/ui/typing-words";\n\nexport function TypingWordsDemo() {\n  return <TypingWords{{props}} placeholders={["Seamlessly interactive", "Crafted with precision", "Built for modern web", "Experience the future"]} />;\n}'
};

const placeholders = ["Welcome to Our Web App!", "Experience Seamless Integration", "Type, Explore, Innovate", "React. Build. Repeat.", "Documentation Made Simple", "Next.js + TypeScript = 💙", "Discover Powerful UI Components", "Your Development Partner", "Create Stunning Interfaces", "Coding Meets Creativity"];

function Demo() {
  return <TypingWords placeholders={placeholders} withCursor className="[--size:clamp(1.125rem,11px+3.5vw,1.875rem)] text-[calc(var(--size))] [--cursor-h:--size] leading-none font-bold" />;
}

function ConfiguratorDemo(props: TypingWordsProps) {
  return <TypingWords {...props} placeholders={["Seamlessly interactive", "Crafted with precision", "Built for modern web", "Experience the future"]} />;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-20 w-full centered" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "min-h-28 w-full centered" },
  controls: [{ prop: "withCursor", type: "boolean", initialValue: false, libraryValue: false }]
};

export const TypingWordsDemos = {
  usage,
  configurator
};
