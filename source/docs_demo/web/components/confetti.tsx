"use client";
import { useState } from "react";
import { Confetti } from "@/ui/confetti";
import { Button } from "@/ui/button";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const [start, setStart] = useState(false);
  const { numb: lifespan, str: position, ...props } = __docs_demo.useDemo({ Numb: 5000, Str: "absolute" });

  return (
    <>
      <__docs_demo.area>
      <Button
        type="button"
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          setTimeout(() => { // ignore
            setStart(false); // ignore
          }, lifespan + 100); // ignore
        }}
      >
        Confetti
      </Button>
      </__docs_demo.area>

      {start && <Confetti lifespan={lifespan} className={position} />}
      <__docs_demo.controls>
      <__docs_demo.setRange label="lifespan" value={lifespan} setNumb={props.setNumb} min="5000" max="25000" />
      <__docs_demo.setSelect label="Position" values={["absolute", "fixed"]} str={position} setStr={props.setStr} />
      </__docs_demo.controls>
    </>
  );
}
