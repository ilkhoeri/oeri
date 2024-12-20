import { useState } from "react";
import { Confetti } from "@/modules/components/web";
// prettier-ignore
import { SetProps, SetPropsRange, SetPropsSelect, useSetProps} from "../../__set_props";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const [start, setStart] = useState(false);
  // prettier-ignore
  const { numb: lifespan, str: position, ...props } = useSetProps({ Numb: 5000, Str: "absolute" });

  return (
    <div>
      <button
        type="button"
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          // prettier-ignore
          setTimeout(() => { // ignore
            setStart(false); // ignore
          }, lifespan + 100); // ignore
        }}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Confetti
      </button>

      {start && <Confetti lifespan={lifespan} className={position} />}
      {/* prettier-ignore */}
      <SetProps.Wrapper>
        <SetPropsRange label="lifespan" value={lifespan} setNumb={props.setNumb} min="5000" max="15000" />
        <SetPropsSelect label="Position" values={["absolute", "fixed"]} str={position} setStr={props.setStr} />
      </SetProps.Wrapper>
    </div>
  );
}
