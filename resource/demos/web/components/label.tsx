import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Input } from "@/ui/input";\nimport { Label } from "@/ui/label";\n\nexport function LabelDemo() {\n  return (\n    <div className="flex items-center space-x-2">\n      <Input id="terms" type="checkbox" />\n      <Label htmlFor="terms">Accept terms and conditions</Label>\n    </div>\n  );\n}',
  configurator: ""
};

function Demo() {
  return (
    <div className="flex items-center space-x-2">
      <Input id="terms-demo-1" type="checkbox" />
      <Label htmlFor="terms-demo-1">Accept terms and conditions</Label>
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

export const LabelDemos = {
  usage
};
