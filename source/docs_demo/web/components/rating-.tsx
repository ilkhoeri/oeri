import { Rating } from "@/ui/rating";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, ...pro } = __docs_demo.useDemo({ Numb: 20 });
  const { numb: number, ...prop } = __docs_demo.useDemo({ Numb: 5 });
  const { str: string, boo: boolean, ...props } = __docs_demo.useDemo({ Str: "#f08c00", Boo: false });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Rating color={string} size={size} count={number} defaultValue={3} highlightSelectedOnly={boolean} />
    </__docs_demo.area>
    <__docs_demo.controls className="[--w-controls-xl:auto]">
    <__docs_demo.setRange label="size" value={size} setNumb={pro.setNumb} min="16" max="40" />
    <__docs_demo.setRange label="count" value={number} setNumb={prop.setNumb} min="1" max="10" />
    <__docs_demo.setBoo label="highlightSelectedOnly" booleanish={false} boo={boolean} setBoo={props.setBoo} />
    <__docs_demo.setColor format="hex" swatches={["#ffd000", "#fab005", "#f08c00", "#fd7e14"]} str={string} {...props} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
