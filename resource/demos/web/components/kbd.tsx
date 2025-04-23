import { Kbd, KbdProps } from "@/ui/kbd";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage: 'import { Kbd } from "@/ui/kbd";\n\nexport function KbdDemo() {\n  return (\n    <Kbd\n      size="sm"\n      variant="primitive"\n      items={["⌘", "Ctrl", "Shift", "M"]}\n      separator={index => (index === 0 ? "/" : "+")}\n    />\n  );\n}',
  configurator:
    'import { Kbd } from "@/ui/kbd";\n\nexport function KbdDemo() {\n  return (\n    <div className="grid grid-flow-row gap-4">\n      <div dir="ltr" className="flex items-center justify-center gap-1">\n        <Kbd{{props}}>⌘</Kbd> + <Kbd{{props}}>Shift</Kbd> + <Kbd{{props}}>M</Kbd>\n      </div>\n\n      <div dir="ltr" className="flex items-center justify-center gap-2">\n        <Kbd{{props}} items={["⌘", "Ctrl", "Shift", "M"]} />\n      </div>\n    </div>\n  );\n}'
};

function Demo() {
  return <Kbd size="sm" variant="primitive" items={["⌘", "Ctrl", "Shift", "M"]} separator={index => (index === 0 ? "/" : "+")} />;
}

function ConfiguratorDemo(props: KbdProps) {
  return (
    <div className="grid grid-flow-row gap-4">
      <div dir="ltr" className="flex items-center justify-center gap-1">
        <Kbd {...props}>⌘</Kbd> + <Kbd {...props}>Shift</Kbd> + <Kbd {...props}>M</Kbd>
      </div>

      <div dir="ltr" className="flex items-center justify-center gap-2">
        <Kbd {...props} items={["⌘", "Ctrl", "Shift", "M"]} />
      </div>
    </div>
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
    { prop: "separator", type: "string", initialValue: "+", libraryValue: "+" },
    { prop: "size", type: "size", initialValue: "sm", libraryValue: "sm" },
    { prop: "variant", type: "select", initialValue: "default", libraryValue: "default", data: ["default", "primitive"] }
  ]
};

export const KbdDemos = {
  usage,
  configurator
};
