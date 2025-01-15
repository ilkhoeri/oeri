import React from "react";
import { Times, TimesPosted } from "@/ui/times";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: diff, ...first } = __docs_demo.useDemo({ Str: "growth" });
  const { str: createdAt, ...second } = __docs_demo.useDemo({ Str: "2024-12-22T16:30" });
  const { str: updatedAt, ...third } = __docs_demo.useDemo({ Str: "2024-12-22T16:30" });
  return (
    <div className="m-auto">
    <__docs_demo.area className="gap-8">
    <__docs_demo.comment title={`// <Times />`} className="-mb-6 -mt-4 mr-auto" />
      {/* @ts-ignore */}
      <Times diff={diff} time={new Date(createdAt)} />
    <__docs_demo.comment title={`// <TimesPosted />`} className="-mb-6 -mt-4 mr-auto" />
      {/* @ts-ignore */}
      <TimesPosted withInterval diff={diff} times={{ createdAt: createdAt, updatedAt: updatedAt }} />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="diff" values={["days", "short", "long", "growth"]} str={diff} setStr={first.setStr}/>
    <__docs_demo.setText type="datetime-local" str={createdAt} setStr={second.setStr} />
    <__docs_demo.setText type="datetime-local" str={updatedAt} setStr={third.setStr} />
    </__docs_demo.controls>
    </div>
  );
}
