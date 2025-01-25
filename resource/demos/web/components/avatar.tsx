import { Group } from "@/ui/group";
import { StarIcon } from "@/icons/index";
import { Avatar, AvatarGroupProps } from "@/ui/avatar";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

export const avatars = [
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Andrea",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=y"
];

export const names = ["John Doe", "Jane Mol", "Alex Lump", "Sarah Condor", "Mike Johnson", "Kate Kok", "Tom Smith"];

export const namesCode =
  'const names = [\n  "John Doe",\n  "Jane Mol",\n  "Alex Lump",\n  "Sarah Condor",\n  "Mike Johnson",\n  "Kate Kok",\n  "Tom Smith"\n];';

const codes = {
  usage:
    'import { Group } from "@/ui/group";\nimport { StarIcon } from "@/icons/*";\nimport { Avatar } from "@/ui/avatar";\n\nexport function AvatarsDemo() {\n  return (\n    <Group justify="center">\n      {/* With image and fallback */}\n      <Avatar src="avatar.png" alt="it\'s me" fallback="Brian and friends" />\n\n      {/* Default placeholder */}\n      <Avatar round="12" />\n\n      {/* Fallback Element Only */}\n      <Avatar fallback={<p className="font-sans text-2xl font-extrabold italic">K</p>} />\n\n      {/* Letters with xl radius */}\n      <Avatar color="hsl(var(--constructive)/0.5)" round="12">\n        Mike\n      </Avatar>\n\n      {/* Custom placeholder with fallback */}\n      <Avatar color="blue" round="8" fallback="x">\n        <StarIcon size="1.5rem" />\n      </Avatar>\n    </Group>\n  );\n}',
  configurator: 'import { Avatar } from "@/ui/avatar";\n\nexport function AvatarDemo() {\n  return <Avatar{{props}} />;\n}',
  group:
    'import { Avatar } from "@/ui/avatar";\n\nexport function AvatarGroupDemo() {\n  return (\n    <Avatar.Group{{props}}>\n      <Avatar fallback="4ndrea" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Andrea" />\n      <Avatar fallback="Brian and Frend Paual" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian" />\n      <Avatar fallback="oliver" src="/null.png" />\n      <Avatar fallback="y" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=y" />\n      <Avatar initialLimit="4">+9999</Avatar>\n    </Avatar.Group>\n  );\n}'
};

function AvatarsDemo() {
  return (
    <Group justify="center">
      <Avatar src={avatars[0]} alt="it's me" fallback="Brian and friends" />
      <Avatar round="12" />
      <Avatar fallback={<p className="font-sans text-2xl font-extrabold italic">K</p>} />
      <Avatar color="hsl(var(--constructive)/0.5)" round="12">
        Mike
      </Avatar>
      <Avatar color="blue" round="8" fallback="x">
        <StarIcon size="1.5rem" />
      </Avatar>
    </Group>
  );
}

function AvatarGroupDemo(props: AvatarGroupProps) {
  return (
    <Avatar.Group {...props}>
      <Avatar fallback="4ndrea" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Andrea" />
      <Avatar fallback="Brian and Frend Paual" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian" />
      <Avatar fallback="oliver" src="/null.png" />
      <Avatar fallback="y" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=y" />
      <Avatar initialLimit="4">+9999</Avatar>
    </Avatar.Group>
  );
}

export const usage: DataTrees = {
  type: "code",
  component: AvatarsDemo,
  code: codes.usage
};

export const configurator: DataTrees = {
  type: "configurator",
  component: Avatar,
  code: codes.configurator,
  controls: [
    { prop: "fallback", type: "string", initialValue: null, libraryValue: null },
    { prop: "initialLimit", type: "number", initialValue: 2, libraryValue: 2, min: 1, max: 4 },
    { prop: "size", type: "number", initialValue: 38, libraryValue: 38, min: 28 },
    { prop: "round", type: "number", initialValue: 999, libraryValue: 999 },
    { prop: "color", type: "color", initialValue: "initials", libraryValue: "initials" },
    {
      prop: "src",
      type: "string",
      initialValue: "",
      libraryValue: null,
      data: [{ label: "Ryan", value: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Ryan" }]
    }
  ]
};

export const group: DataTrees = {
  type: "configurator",
  component: AvatarGroupDemo,
  code: codes.group,
  controls: [
    { prop: "initialLimit", type: "number", initialValue: 2, libraryValue: 2, min: 1, max: 4 },
    { prop: "round", type: "number", initialValue: 999, libraryValue: 999 },
    { prop: "size", type: "number", initialValue: 38, libraryValue: 38, min: 28 },
    { prop: "gap", type: "number", initialValue: 17, libraryValue: 17, min: 0 },
    { prop: "color", type: "color", initialValue: "initials", libraryValue: "initials" }
  ]
};

export const AvatarDemos = {
  usage,
  configurator,
  group
};
