"use client";
import React from "react";
import { Progress, type ProgressProps } from "@/ui/progress";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport React from "react";\nimport { Progress, type ProgressProps } from "@/ui/progress";\n\nexport function ProgressDemo() {\n  const [progress, setProgress] = React.useState({ details: 0, address: 0, important: 0, animated: true });\n\n  React.useEffect(() => {\n    const timer = setTimeout(() => setProgress(p => ({ ...p, details: 35, address: 28, important: 25 })), 500);\n    return () => clearTimeout(timer);\n  }, []);\n\n  React.useEffect(() => {\n    const timer = setTimeout(() => setProgress(p => ({ ...p, animated: false })), 2850);\n    return () => clearTimeout(timer);\n  }, []);\n\n  return (\n    <Progress size={16} transitionDuration={2000} animated={progress.animated} classNames={{ root: "m-auto max-w-2xl", label: "text-white" }}>\n      <Progress.Section value={progress.details} color="#0c8599">\n        <Progress.Label label="Details" />\n      </Progress.Section>\n      <Progress.Section value={progress.address} color="#c2255c">\n        <Progress.Label label="Address" />\n      </Progress.Section>\n      <Progress.Section value={progress.important} label="Important" color="#e8590c" />\n    </Progress>\n  );\n}',
  configurator: '"use client";\nimport React from "react";\nimport { Progress, type ProgressProps } from "@/ui/progress";\n\nexport function ProgressDemo(props: ProgressProps) {\n  return <Progress{{props}} />;\n}'
};

export function ProgressDemo(props: ProgressProps) {
  const [progress, setProgress] = React.useState({ details: 0, address: 0, important: 0, animated: true });

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(p => ({ ...p, details: 35, address: 28, important: 25 })), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(p => ({ ...p, animated: false })), 2850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress size={16} transitionDuration={2000} animated={progress.animated} classNames={{ root: "m-auto max-w-2xl", label: "text-white" }} {...props}>
      <Progress.Section value={progress.details} color="#6e5494">
        <Progress.Label label="Details" />
      </Progress.Section>
      <Progress.Section value={progress.address} color="#0076f5">
        <Progress.Label label="Address" />
      </Progress.Section>
      <Progress.Section value={progress.important} label="Important" color="#b11c66" />
    </Progress>
  );
}

function ConfiguratorDemo(props: ProgressProps) {
  return <Progress {...props} />;
}

const usage: DataTrees = {
  type: "code",
  component: ProgressDemo,
  code: codes.usage,
  classNames: { demoInner: "[--demo-margin-y:3rem] w-full centered" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "h-52 w-full centered" },
  controls: [
    { prop: "label", type: "string", initialValue: null, libraryValue: null },
    { prop: "size", type: "number", initialValue: 8, libraryValue: 8, min: 8, max: 24 },
    { prop: "value", type: "number", initialValue: 20, libraryValue: undefined, min: 0, max: 100 },
    { prop: "striped", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "animated", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "color", type: "color", initialValue: "#3b82f6", libraryValue: undefined }
  ]
};

export const ProgressDemos = {
  usage,
  configurator
};
