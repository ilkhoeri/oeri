"use client";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Group } from "@/ui/group";
import { Label } from "@/ui/label";

export function Demo() {
  return (
    <Card classNames={{ root: "m-auto w-[350px] max-w-full", content: "border-b mb-4 pb-2" }}>
      <Card.Header>
        <Card.Title>Create project</Card.Title>
        <Card.Description>Deploy your new project in one-click.</Card.Description>
      </Card.Header>
      <Card.Content>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              {/*  */}
            </div>
          </div>
        </form>
      </Card.Content>
      <Card.Footer>
        <Group grow justify="center">
          <Button variant="outline" size="default">Cancel</Button>
          <Button size="default">Deploy</Button>
        </Group>
      </Card.Footer>
    </Card>
  );
}
