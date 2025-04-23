import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Avatar } from "@/ui/avatar";
import { Tooltip, type TooltipProps } from "@/ui/tooltip";
import { Button } from "@/ui/button";

const codes = {
  usage:
    'import { Tooltip } from "@/ui/tooltip";\nimport { Avatar } from "@/ui/avatar";\n\nexport function TooltipDemo() {\n  return (\n    <Tooltip\n      asChild\n      side="top"\n      content={<span>Brian and Brothers</span>}\n      contentProps={{ className: "block" }}\n      >\n      <Avatar fallback="Brian and Brothers" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian" />\n    </Tooltip>\n  );\n}',
  configurator:
    'import { Tooltip } from "@/ui/tooltip";\nimport { Button } from "@/ui/button";\n\nexport function TooltipDemo() {\n  return (\n    <Tooltip\n      {{props}}\n      asChild\n      content="Double check the data you want to send"\n      contentProps={{ className: "inline-flex" }}\n    >\n      <Button variant="outline" color="grape">Continue</Button>\n    </Tooltip>\n  );\n}',
  inline:
    'import { Tooltip } from "@/ui/tooltip";\n\nfunction Inline({ label }: { label: string }) {\n  return (\n    <Tooltip\n      touch\n      asChild\n      side="top"\n      content={`What\'s ${label}?`}\n      className="[@media_not_all_and_(hover:hover)]:select-none"\n      contentProps={{\n        className: "bg-color text-background [&_[data-tooltip]]:text-color font-medium"\n      }}\n    >\n      <mark>{label}</mark>\n    </Tooltip>\n  );\n}\n\nexport function TooltipInlineDemo() {\n  return (\n    <div className="m-auto size-full max-w-lg p-6">\n      <p className="w-full max-w-full text-justify text-sm">\n        In the world of modern <Inline label="technology" />, staying updated is no longer optional—it’s a necessity. Innovations in <Inline label="artificial intelligence" /> have reshaped how we interact with systems, enabling a more personalized and efficient experience. Yet, with rapid advancements come challenges. Developers must navigate the complexities of <Inline label="scalability" />, ensuring applications grow seamlessly without compromising performance. Similarly, the rise of <Inline label="cybersecurity" /> concerns has pushed teams to prioritize safeguarding user data while maintaining accessibility. Every step forward in this digital age is an opportunity to create impactful solutions, but it also demands a commitment to learning, adapting, and overcoming.\n      </p>\n    </div>\n  );\n}'
};

function Demo() {
  return (
    <Tooltip side="top" asChild content={<span>Brian and Brothers</span>} contentProps={{ className: "block" }}>
      <Avatar fallback="Brian and Brothers" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian" />
    </Tooltip>
  );
}

function ConfiguratorDemo(props: TooltipProps) {
  return (
    <Tooltip {...props} asChild content="Double check the data you want to send" contentProps={{ className: "inline-flex" }}>
      <Button variant="outline" color="grape">
        Continue
      </Button>
    </Tooltip>
  );
}

function Inline({ label }: { label: string }) {
  return (
    <Tooltip
      touch
      asChild
      side="top"
      content={`What's ${label}?`}
      className="[@media_not_all_and_(hover:hover)]:select-none"
      contentProps={{
        className: "bg-color text-background [&_[data-tooltip]]:text-color font-medium"
      }}
    >
      <mark>{label}</mark>
    </Tooltip>
  );
}

function InlineDemo() {
  return (
    <div className="m-auto size-full max-w-lg p-6">
      <p className="w-full max-w-full text-justify text-sm">
        In the world of modern <Inline label="technology" />, staying updated is no longer optional—it’s a necessity. Innovations in <Inline label="artificial intelligence" /> have reshaped how we interact with systems, enabling a more personalized and efficient experience. Yet, with rapid advancements come challenges.
        Developers must navigate the complexities of <Inline label="scalability" />, ensuring applications grow seamlessly without compromising performance. Similarly, the rise of <Inline label="cybersecurity" /> concerns has pushed teams to prioritize safeguarding user data while maintaining accessibility. Every step
        forward in this digital age is an opportunity to create impactful solutions, but it also demands a commitment to learning, adapting, and overcoming.
      </p>
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
    { prop: "side", type: "select", initialValue: "bottom", libraryValue: "bottom", data: ["top", "right", "bottom", "left"] },
    { prop: "align", type: "select", initialValue: "center", libraryValue: "center", data: ["start", "center", "end"] },
    { prop: "sideOffset", type: "number", initialValue: 4, libraryValue: 4, min: 0, max: 32 },
    { prop: "touch", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "withArrow", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const inline: DataTrees = {
  type: "code",
  component: InlineDemo,
  code: codes.inline
};

export const TooltipDemos = {
  usage,
  configurator,
  inline
};
