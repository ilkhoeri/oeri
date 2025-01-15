import { Kbd } from "@/ui/kbd"
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, str: variant, ...props } = __docs_demo.useDemo({ Numb: 25, Str: "default" });
  return (
    <>
    <__docs_demo.area>
    <div dir="ltr" className="flex items-center justify-center gap-1">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
    <hr data-ignore/>
    <div dir="ltr" className="flex items-center justify-center gap-2">
      <Kbd
        // @ts-ignore
        variant={variant}
        // @ts-ignore
        size={__docs_demo.sz(size)}
        items={["⌘", "Ctrl", "Shift", "M"]}
        separator={(index)=> index === 0 ? "/" : "+"}
      />
    </div>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="size" withMarkSize value={size} setNumb={props.setNumb} />
    <__docs_demo.setSelect variant="button" label="Variant" values={["default", "primitive"]} str={variant} setStr={props.setStr}/>
    </__docs_demo.controls>
    </>
  );
}