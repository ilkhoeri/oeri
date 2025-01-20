import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Group } from "@/ui/group";
import { Label } from "@/ui/label";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Card } from "@/ui/card";\nimport { Input } from "@/ui/input";\nimport { Button } from "@/ui/button";\nimport { Group } from "@/ui/group";\nimport { Label } from "@/ui/label";\n\nexport function CardDemo() {\n  return (\n    <Card classNames={{ root: "m-auto w-[350px] max-w-full", content: "border-b mb-4 pb-2" }}>\n      <Card.Header>\n        <Card.Title>Create project</Card.Title>\n        <Card.Description>Deploy your new project in one-click.</Card.Description>\n      </Card.Header>\n      <Card.Content>\n        <form>\n          <div className="grid w-full items-center gap-4">\n            <div className="flex flex-col space-y-1.5">\n              <Label htmlFor="name">Name</Label>\n              <Input id="name" placeholder="Name of your project" />\n            </div>\n            <div className="flex flex-col space-y-1.5">{/* content */}</div>\n          </div>\n        </form>\n      </Card.Content>\n      <Card.Footer>\n        <Group grow justify="center">\n          <Button variant="outline" size="default">\n            Cancel\n          </Button>\n          <Button size="default">Deploy</Button>\n        </Group>\n      </Card.Footer>\n    </Card>\n  );\n}'
};

function CardDemo() {
  return (
    <Card classNames={{ root: "m-auto w-[350px] max-w-full", content: "border-b mb-4 pb-2" }}>
      <Card.Header>
        <Card.Title className="!mt-0">Create project</Card.Title>
        <Card.Description>Deploy your new project in one-click.</Card.Description>
      </Card.Header>
      <Card.Content>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">{/*  */}</div>
          </div>
        </form>
      </Card.Content>
      <Card.Footer>
        <Group grow justify="center">
          <Button variant="outline" size="default">
            Cancel
          </Button>
          <Button size="default">Deploy</Button>
        </Group>
      </Card.Footer>
    </Card>
  );
}

const usage: DataTrees = {
  type: "code",
  component: CardDemo,
  code: codes.usage,
  centered: true
};

export const CardDemos = {
  usage
};
