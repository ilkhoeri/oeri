import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { PolymorphicSlot } from "@/ui/polymorphic-slot";
import { buttonStyle } from "@/ui/button";

const codes = {
  usage:
    'import { PolymorphicSlot } from "@/ui/polymorphic-slot";\nimport { buttonStyle } from "@/ui/button";\n\nexport function PolymorphicDemo() {\n  return (\n    <PolymorphicSlot className={buttonStyle({ variant: "outline", color: "grape" }, "w-4 h-4")}>\n      <button type="button" className="w-max h-9 rounded-lg">\n        My Button\n      </button>\n    </PolymorphicSlot>\n  );\n}',
  configurator: ""
};

function Demo() {
  return (
    <PolymorphicSlot className={buttonStyle({ variant: "outline", color: "grape" }, "w-4 h-4")}>
      <button type="button" className="w-max h-9 rounded-lg">
        My Button
      </button>
    </PolymorphicSlot>
  );
}

function ConfiguratorDemo() {
  return <div></div>;
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
    { prop: "value", type: "string", initialValue: "", libraryValue: null },
    { prop: "timeout", type: "number", initialValue: 1000, libraryValue: 1000, min: 1000, max: 2500 }
  ]
};

export const PolymorphicSlotDemos = {
  usage,
  configurator
};
