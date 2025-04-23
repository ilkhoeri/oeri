"use client";
import { Stack } from "@/ui/stack";
import { Avatar } from "@/ui/avatar";
import { useImagePopup } from "@/hooks/use-image-popup";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Stack } from "@/ui/stack";\nimport { Avatar } from "@/ui/avatar";\nimport { useImagePopup } from "@/hooks/use-image-popup";\n\nexport function UseImagePopupDemo() {\n  useImagePopup("[data-has-popup]");\n\n  return (\n    <Stack align="center" gap={28}>\n      {/* eslint-disable-next-line @next/next/no-img-element */}\n      <img data-has-popup src="/icons/oeri-asset.png" alt="" width={96} height={96} className="size-24 cursor-zoom-in rounded-lg border bg-black" />\n\n      <Avatar.Group size={70} gap={28}>\n        <Avatar data-has-popup fallback="4ndrea" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Andrea" />\n        <Avatar data-has-popup fallback="Brian and Frend Paual" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian" />\n        <Avatar data-has-popup fallback="oliver" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=oliver" />\n        <Avatar data-has-popup fallback="y" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=y" />\n        <Avatar data-has-popup initialLimit="4">+999</Avatar>\n      </Avatar.Group>\n    </Stack>\n  );\n}'
};

function Demo() {
  useImagePopup("[data-has-popup]");

  return (
    <Stack align="center" gap={28}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-has-popup src="/icons/oeri-asset.png" alt="" width={96} height={96} className="size-24 cursor-zoom-in rounded-lg border bg-black" />

      <Avatar.Group size={70} gap={28}>
        <Avatar data-has-popup fallback="4ndrea" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Andrea" />
        <Avatar data-has-popup fallback="Brian and Frend Paual" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian" />
        <Avatar data-has-popup fallback="oliver" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=oliver" />
        <Avatar data-has-popup fallback="y" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=y" />
        <Avatar data-has-popup initialLimit="4">
          +999
        </Avatar>
      </Avatar.Group>
    </Stack>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseImagePopupDemos = {
  usage
};
