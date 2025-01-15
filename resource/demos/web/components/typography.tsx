import { Typography, type TypographyProps } from "@/ui/typography";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Typography } from "@/ui/typography";\n\nexport function TypographyDemo() {\n  return (\n    <div>\n      <Typography el="h3" prose="h1">Typography Tailored for Your Needs.</Typography>\n      <Typography el="h4" prose="h1">Scalable, Stylish, and Simple.</Typography>\n    </div>\n  );\n}',
  configurator:
    'import { Typography } from "@/ui/typography";\n\nexport function TypographyDemo() {\n  return <Typography>Typography that precision, simple, descriptive and directly.</Typography>;\n}'
};

function Demo() {
  return (
    <div>
      <Typography el="h3" prose="h1">Typography Tailored for Your Needs.</Typography>
      <Typography el="h4" prose="h1">Scalable, Stylish, and Simple.</Typography>
    </div>
  );
}

function ConfiguratorDemo(props: TypographyProps) {
  return <Typography {...props}>Typography that precision, simple, descriptive and directly.</Typography>;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered px-12" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "min-h-60 w-full centered" },
  controls: [
    {
      prop: "prose",
      type: "select",
      initialValue: "h2",
      libraryValue: null,
      data: ["code", "h1", "h2", "h3", "h4", "h5", "h6", "label", "p", "span", "large", "small", "ol", "ul", "li", "kbd", "em", "lead", "muted", "blockquote"]
    }
  ]
};

export const TypographyDemos = {
  usage,
  configurator
};
