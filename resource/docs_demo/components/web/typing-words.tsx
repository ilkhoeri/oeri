import { TypingWords } from "@/modules/components/web";
import { SetProps, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { ...props } = useSetProps({ Str: "Input Your Words" });
  const placeholders = [props.str]; // ignore
  return (
    <div data-ignore className="w-80 text-left">
    <TypingWords placeholders={placeholders} withCursor />
      <SetProps.Wrapper>
        <SetPropsText {...props} />
      </SetProps.Wrapper>
    </div> // ignore
  );
}
