"use client";
import { XIcon } from "@/icons/*";
import { cvx, cvxProps } from "str-merge";
import { Button, UnstyledButton } from "@/ui/button";
import { useOpenState } from "@/hooks/use-open-state";
import { Kbd } from "@/ui/kbd";

export function Demo() {
  const state = useOpenState({ modal: true, hotKeys: "ctrl+D" });

  return (
    <>
      <Button ref={state.refs.trigger} className="m-auto">
        Dialog
      </Button>

      <state.Portal render={state.render}>
        <div onClick={state.toggle} {...state.attr} {...classes("overlay")} />
        <div role="dialog" ref={state.refs.content as React.RefObject<HTMLDivElement>} {...state.attr} {...classes("content")}>
          <div className="flex size-full flex-col items-center justify-center text-sm">
            Click overlay to close
            <br />
            <p className="inline-flex items-center gap-2">or use <Kbd items={["ctrl", "D"]} /></p>
          </div>
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
      close:
        "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50"
    }
  }
});
