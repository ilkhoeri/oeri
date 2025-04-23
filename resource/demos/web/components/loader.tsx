import { Loader, type LoaderProps } from "@/ui/loader";
import { BrandOeriIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage: 'import { Loader } from "@/ui/loader";\n\nexport function LoaderDemo() {\n  return <Loader size={48} />;\n}',
  configurator: 'import { Loader } from "@/ui/loader";\nimport { BrandOeriIcon } from "@/icons/*";\n\nexport function LoaderDemo() {\n  return (\n    <Loader{{props}}>\n      <BrandOeriIcon />\n    </Loader>\n  );\n}'
};

function Demo() {
  return <Loader size={48} />;
}

function ConfiguratorDemo(props: LoaderProps) {
  return (
    <Loader {...props}>
      <BrandOeriIcon />
    </Loader>
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
    { prop: "variant", type: "select", initialValue: "clockwise", libraryValue: "spinner", data: ["spinner", "orbit", "clockwise", "dots", "buffer", "rises"] },
    { prop: "size", type: "number", initialValue: 14, libraryValue: null, min: 12, max: 120 },
    { prop: "color", type: "color", initialValue: "hsl(var(--color))", libraryValue: "hsl(var(--color))" }
  ]
};

export const LoaderDemos = {
  usage,
  configurator
};
