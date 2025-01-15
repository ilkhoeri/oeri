"use client";
import { CopyButton } from "@/ui/copy-button";
import { Tooltip } from "@/ui/tooltip";
import { __docs_demo } from "../../__docs_demo";
import { CopyCheckIcon, CopyIcon } from "@/icons/*";

const _code = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse veritatis molestias ex architecto maxime, exercitationem sint perferendis nulla aperiam doloremque?"

export function Demo() {
  const { numb: timeout, str: code, ...props } = __docs_demo.useDemo({ Numb: 5000, Str: _code });
  return (
    <>
      <__docs_demo.area>
      <CopyButton value={code.trim()} timeout={timeout}>
        {({ copied, copy }) => (
          <Tooltip content={copied ? "Copied" : "Copy code"} side="left" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
            {copied ? <CopyCheckIcon /> : <CopyIcon />}
          </Tooltip>
        )}
      </CopyButton>
      </__docs_demo.area>
      <__docs_demo.controls>
      <__docs_demo.setRange label="timeout" value={timeout} setNumb={props.setNumb} min="500" max="2500" />
      <__docs_demo.setText str={code} setStr={props.setStr} />
      </__docs_demo.controls>
    </>
  );
}
