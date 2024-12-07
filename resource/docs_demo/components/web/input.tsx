import React from "react";
import { Input } from "@/modules/components/web";
// prettier-ignore
import { SetProps, SetPropsSelect, useSetProps } from "../../__set_props";

export function Demo() {
  // prettier-ignore
  const { str: type, ...prop } = useSetProps({ Numb: 2, Str: "text" });
  const [value, setValue] = React.useState("")

  return (
    <div data-ignore="" className="">
    <Input type={type} placeholder={type} value={value} onChange={e => setValue(e.target.value)} />
      {/* prettier-ignore */}
      <SetProps.Wrapper>
      <SetPropsSelect label="Type" values={["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]} str={type} setStr={prop.setStr}/>
    </SetProps.Wrapper>
    </div> // ignore
  );
}
