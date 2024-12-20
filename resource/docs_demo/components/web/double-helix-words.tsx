import { DoubleHelixWords } from "@/modules/components/web";
import { SetProps, SetPropsRange, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { numb: speed, ...pro } = useSetProps({ Numb: 400 });
  const { numb: distance, ...prop } = useSetProps({ Numb: 80 });
  const { str: placeholders, numb: gap, ...props } = useSetProps({ Str: "Input Your Words", Numb: 8 });
  return (
    <div data-ignore>
    <div className="relative flex size-full items-center text-xl">
      <DoubleHelixWords placeholders={placeholders} speed={speed} gap={gap} distance={distance} />
    </div>
    <SetProps.Wrapper>
      <SetPropsText str={placeholders} {...props} />
      <SetPropsRange label="speed" value={speed} setNumb={pro.setNumb} min="200" max="1200" />
      <SetPropsRange label="gap" value={gap} setNumb={props.setNumb} min="0" max="100" />
      <SetPropsRange label="distance" value={distance} setNumb={prop.setNumb} min="0" max="100" />
    </SetProps.Wrapper>
    </div> // ignore
  );
}
