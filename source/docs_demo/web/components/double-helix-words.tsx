import { DoubleHelixWords } from "@/ui/double-helix-words";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: speed, ...pro } = __docs_demo.useDemo({ Numb: 400 });
  const { numb: distance, ...prop } = __docs_demo.useDemo({ Numb: 80 });
  const { str: placeholders, numb: gap, ...props } = __docs_demo.useDemo({ Str: "Input Your Words", Numb: 8 });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <DoubleHelixWords
      placeholders={placeholders}
      speed={speed}
      gap={gap}
      distance={distance}
      className="relative text-xl"
    />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setText str={placeholders} setStr={props.setStr} />
    <__docs_demo.setRange label="speed" value={speed} setNumb={pro.setNumb} min="200" max="1200" />
    <__docs_demo.setRange label="gap" value={gap} setNumb={props.setNumb} min="6" max="32" />
    <__docs_demo.setRange label="distance" value={distance} setNumb={prop.setNumb} min="12" max="100" />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
