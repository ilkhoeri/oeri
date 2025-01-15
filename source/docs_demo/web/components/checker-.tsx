"use client";
import { useState } from "react";
import { Checker } from "@/ui/checker";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { boo: disabled, numb: size, str: labelPosition, ...first } = __docs_demo.useDemo({ Numb: 20, Str: "right" });
  const { boo: required, numb: number, str: color, ...second } = __docs_demo.useDemo({ Numb: 5, Str: "#0076f5" });
  const { str: label, ...third } = __docs_demo.useDemo({ Str: "I agree to sell my privacy", Boo: false });
  const { str: description, ...fourth } = __docs_demo.useDemo({});
  const { str: error, ...five } = __docs_demo.useDemo({});
  const { str: type, ...six } = __docs_demo.useDemo({ Str: "switch" });
  const [checked, setChecked] = useState(false);
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Checker
      // @ts-ignore
      type={type}
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      id="agreement"
      color={color}
      onLabel="ON"
      offLabel="OFF"
      disabled={disabled}
      required={required}
      size={size}
      defaultChecked
      // @ts-ignore
      labelPosition={labelPosition}
      label={label}
      description={description}
      error={error}
    />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="type" values={["switch", "checkbox", "radio"]} str={type} {...six} />
    <__docs_demo.setSelect label="labelPosition" values={["left", "right"]} str={labelPosition} {...first} />
    <__docs_demo.setText placeholder="label" str={label} setStr={third.setStr} />
    <__docs_demo.setText placeholder="description" str={description} setStr={fourth.setStr} />
    <__docs_demo.setText placeholder="error" str={error} setStr={five.setStr} />
    <__docs_demo.setRange label="size" value={size} setNumb={first.setNumb} min="16" max="40" />
    <__docs_demo.setBoo label="disabled" boo={disabled} setBoo={first.setBoo} />
    <__docs_demo.setBoo label="required" boo={required} setBoo={second.setBoo} />
    <__docs_demo.setColor format="hex" swatches={["#fab005", "#f08c00", "#fd7e14"]} str={color} {...second} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
