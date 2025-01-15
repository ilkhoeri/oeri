import { TypingWords } from "@/ui/typing-words";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { ...props } = __docs_demo.useDemo({ Str: "Input Your Words" });
  const placeholders = [props.str]; // ignore
  return (
    <__docs_demo>
    <__docs_demo.area className="items-start">
    <TypingWords placeholders={placeholders} withCursor />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setText str={props.str} setStr={props.setStr} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
