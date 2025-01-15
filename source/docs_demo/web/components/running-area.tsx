import { RunningArea } from "@/ui/running-area";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: children, ...props } = __docs_demo.useDemo({ Str: "Input Your Words" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <RunningArea
      classNames={{
        container: "w-80 overflow-hidden",
        content: "min-w-max whitespace-nowrap space-x-2"
      }}
    >
      {[...Array(4)].map((_, index) => (
        <span key={index} className="select-none font-extrabold text-h1">
          {children}
        </span>
      ))}
    </RunningArea>
    </__docs_demo.area>
    <__docs_demo.controls><__docs_demo.setText str={children} setStr={props.setStr} /></__docs_demo.controls>
    </__docs_demo>
  );
}
