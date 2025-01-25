"use client";
import { Kbd } from "@/ui/kbd";
import { XIcon } from "@/icons/*";
import { cvx, cvxProps } from "cretex";
import { Button, UnstyledButton } from "@/ui/button";
import { useOpenState } from "@/hooks/use-open-state";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Stack } from "@/ui/stack";
import { Group } from "@/ui/group";

const codes = {
  usage:
    '"use client";\nimport { XIcon } from "@/icons/*";\nimport { cvx, cvxProps } from "cretex";\nimport { Button, UnstyledButton } from "@/ui/button";\nimport { useOpenState } from "@/hooks/use-open-state";\nimport { Stack } from "@/ui/stack";\nimport { Group } from "@/ui/group";\nimport { Kbd } from "@/ui/kbd";\n\nexport function UseOpenStateDemo() {\n  const state = useOpenState({ modal: true, hotKeys: "ctrl+D" });\n\n  return (\n    <>\n      <Button ref={state.triggerRef} onClick={state.toggle} className="m-auto h-auto">\n        <Group align="center" gap="4">\n          Dialog |\n          <Kbd items={["ctrl", "D"]} />\n        </Group>\n      </Button>\n\n      <state.Portal render={state.render}>\n        <div onClick={state.toggle} {...state.attr()} {...classes("overlay")} />\n        <div role="dialog" ref={state.contentRef as React.RefObject<HTMLDivElement>} {...state.attr()} {...classes("content")}>\n          <Stack align="center" className="size-full">\n            Click overlay to close\n            <br />\n            <Group align="center" gap="4">\n              or use <Kbd items={["ctrl", "D"]} />\n            </Group>\n          </Stack>\n          <UnstyledButton onClick={state.toggle} {...classes("close")}>\n            <XIcon />\n            <span className="sr-only">Close Trigger</span>\n          </UnstyledButton>\n        </div>\n      </state.Portal>\n    </>\n  );\n}\n\nfunction classes(selector: NonNullable<cvxProps<typeof dialog>["selector"]>) {\n  return { className: dialog({ selector }) };\n}\nconst dialog = cvx({\n  variants: {\n    selector: {\n      overlay:\n        "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",\n      content:\n        "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",\n      close: "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50"\n    }\n  }\n});',
  usageTooltip:
    '"use client";\nimport { cvx } from "cretex";\nimport { Button } from "@/ui/button";\nimport { useOpenState } from "@/hooks/use-open-state";\n\ntype DataSide = "top" | "right" | "bottom" | "left";\ntype DataAlign = "start" | "center" | "end";\n\nexport function UseOpenStateTooltipDemo({ side }: { side?: DataSide; align?: DataAlign }) {\n  const state = useOpenState({\n    trigger: "hover",\n    sideOffset: 8,\n    side: side as DataSide,\n    observe: {\n      touch: true,\n      align: true,\n      side: true,\n      sideswipe: true,\n      offset: true,\n      contentRect: true\n    }\n  });\n\n  return (\n    <>\n      <Button\n        ref={state.triggerRef}\n        {...state.attr()}\n        onMouseEnter={state.handleOnMouseEnter}\n        onMouseLeave={state.handleOnMouseLeave}\n        onMouseMove={state.handleOnMouseMove}\n        onTouchStart={state.handleOnTouchStart}\n      >\n        Tooltip\n      </Button>\n\n      <state.Portal render={state.render}>\n        <p role="tooltip" ref={state.contentRef} className={tooltip({ side })} {...{ ...state.attr(), style: state.styleVars("content") }}>\n          allows use as a tooltip\n        </p>\n      </state.Portal>\n    </>\n  );\n}\n\nconst tooltip = cvx({\n  assign:\n    "group absolute min-w-max z-20 text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max transition-opacity [transition-duration:200ms] data-[state=open]:animate-in data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-95 top-[--top] left-[--left]",\n  variants: {\n    side: {\n      top: "data-[side=top]:slide-in-from-bottom-0 data-[side=top]:data-[state=closed]:slide-out-to-bottom-0",\n      right: "data-[side=right]:slide-in-from-left-0 data-[side=right]:data-[state=closed]:slide-out-to-left-0",\n      bottom: "data-[side=bottom]:slide-in-from-top-0 data-[side=bottom]:data-[state=closed]:slide-out-to-top-0",\n      left: "data-[side=left]:slide-in-from-right-0 data-[side=left]:data-[state=closed]:slide-out-to-right-0"\n    }\n  }\n});'
};

function Demo() {
  const state = useOpenState({ modal: true, hotKeys: "ctrl+D" });

  return (
    <>
      <Button ref={state.triggerRef} onClick={state.toggle} className="m-auto h-auto">
        <Group align="center" gap="4">
          Dialog |
          <Kbd items={["ctrl", "D"]} />
        </Group>
      </Button>

      <state.Portal render={state.render}>
        <div onClick={state.toggle} {...state.attr()} {...classes("overlay")} />
        <div role="dialog" ref={state.contentRef as React.RefObject<HTMLDivElement>} {...state.attr()} {...classes("content")}>
          <Stack align="center" className="size-full">
            Click overlay to close
            <br />
            <Group align="center" gap="4">
              or use <Kbd items={["ctrl", "D"]} />
            </Group>
          </Stack>
          <UnstyledButton onClick={state.toggle} {...classes("close")}>
            <XIcon />
            <span className="sr-only">Close Trigger</span>
          </UnstyledButton>
        </div>
      </state.Portal>
    </>
  );
}

function classes(selector: NonNullable<cvxProps<typeof dialog>["selector"]>) {
  return { className: dialog({ selector }) };
}
const dialog = cvx({
  variants: {
    selector: {
      overlay:
        "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      content:
        "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",
      close: "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50"
    }
  }
});

type DataSide = "top" | "right" | "bottom" | "left";
type DataAlign = "start" | "center" | "end";

function TooltipDemo({ side }: { side?: DataSide; align?: DataAlign }) {
  const state = useOpenState({
    sideOffset: 8,
    side: side as DataSide,
    observe: {
      touch: true,
      align: true,
      side: true,
      sideswipe: true,
      alignswipe: true,
      offset: true,
      contentRect: true
    }
  });



  return (
    <>
      <Button
        ref={state.triggerRef}
        {...state.attr()}
        onMouseEnter={state.handleOnMouseEnter}
        onMouseLeave={state.handleOnMouseLeave}
        onMouseMove={state.handleOnMouseMove}
        onTouchStart={state.handleOnTouchStart}
      >
        Tooltip
      </Button>

      <state.Portal render={state.render}>
        <p role="tooltip" ref={state.contentRef} className={tooltip({ side })} {...{ ...state.attr(), style: state.styleVars("content") }}>
          allows use as a tooltip
        </p>
      </state.Portal>
    </>
  );
}

const tooltip = cvx({
  assign:
    "group absolute min-w-max z-20 text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max transition-opacity [transition-duration:200ms] data-[state=open]:animate-in data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-95 top-[--top] left-[--left]",
  variants: {
    side: {
      top: "data-[side=top]:slide-in-from-bottom-0 data-[side=top]:data-[state=closed]:slide-out-to-bottom-0",
      right: "data-[side=right]:slide-in-from-left-0 data-[side=right]:data-[state=closed]:slide-out-to-left-0",
      bottom: "data-[side=bottom]:slide-in-from-top-0 data-[side=bottom]:data-[state=closed]:slide-out-to-top-0",
      left: "data-[side=left]:slide-in-from-right-0 data-[side=left]:data-[state=closed]:slide-out-to-right-0"
    }
  }
});

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

const usageTooltip: DataTrees = {
  type: "configurator",
  component: TooltipDemo,
  code: codes.usageTooltip,
  orientation: "vertical",
  classNames: { demoInner: "min-h-60 w-full centered relative" },
  controls: [{ prop: "side", type: "select", initialValue: "bottom", libraryValue: "bottom", data: ["top", "right", "bottom", "left"] }]
};

export const UseOpenStateDemos = {
  usage,
  usageTooltip
};
