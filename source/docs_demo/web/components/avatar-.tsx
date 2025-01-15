import { Avatar } from "@/ui/avatar";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, str: color, ...props } = __docs_demo.useDemo({ Numb: 38, Str: "#757575" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Avatar size={size} fallback="Madara Uciha" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Ryan"></Avatar>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="size" value={size} setNumb={props.setNumb} min="28" max="64" />
    <__docs_demo.setColor format="hex" swatches={["#fab005", "#f08c00", "#fd7e14"]} str={color} {...props} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
