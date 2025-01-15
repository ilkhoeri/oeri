"use client";
import React from "react";
import { Input } from "@/ui/input";
import { __docs_demo } from "../../__docs_demo";
import { purify } from "@/source/libs/dom-purify";

export function Demo() {
  const { str: type, ...prop } = __docs_demo.useDemo({ Numb: 2, Str: "text" });
  const [value, setValue] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Input
      type={type}
      value={purify(value)}
      checked={checked}
      placeholder={type}
      onChange={e => setValue(e.target.value)}
      onClick={() => setChecked( c => !c )}
    />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="Type" values={["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]} str={type} setStr={prop.setStr}/>
    </__docs_demo.controls>
    </__docs_demo>
  );
}
