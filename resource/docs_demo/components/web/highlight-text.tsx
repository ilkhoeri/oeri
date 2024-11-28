import { HighlightText } from "@/modules/components/web";
import { SetProps, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { ...props } = useSetProps({ Str: "adipisicing" });
  const highlight = props.str; // ignore
  return (
    <div data-ignore className="w-80 text-left">
    <HighlightText text={text} highlight={highlight} className="text-justify" />
      <SetProps.Wrapper>
        <SetPropsText {...props} />
      </SetProps.Wrapper>
    </div> // ignore
  );
}

const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt id architecto sunt! Facere deleniti asperiores id, doloribus, itaque velit, quo veritatis reiciendis voluptas error quas quam veniam et? Temporibus, reiciendis.`