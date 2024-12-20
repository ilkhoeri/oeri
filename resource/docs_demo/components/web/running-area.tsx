import { RunningArea } from "@/modules/components/web";
import { SetProps, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { str: children, ...props } = useSetProps({ Str: "Input Your Words" });
  return (
    <div data-ignore="">
    <RunningArea
      classNames={{
        wrap: "w-80 overflow-hidden",
        inner: "min-w-max whitespace-nowrap space-x-2"
      }}>
      {[...Array(4)].map((_, index) => (
        <span key={index} className="select-none font-extrabold text-h1">
          {children}
        </span>
      ))}
    </RunningArea>
    {/* prettier-ignore */}
      <SetProps.Wrapper><SetPropsText str={children} {...props} /></SetProps.Wrapper>
    </div>
  );
}
