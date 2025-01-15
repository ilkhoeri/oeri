"use client";
import { useState } from "react";
import { Burger, BurgerProps } from "@/ui/burger";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Burger } from "@/ui/burger";\n\nfunction BurgerDemo() {\n  const [open, setOpen] = useState(false);\n  return <Burger open={open} setOpen={setOpen} />;\n}',
  configurator:
    '"use client";\nimport { useState } from "react";\nimport { Burger } from "@/ui/burger";\n\nfunction BurgerConfiguratorDemo() {\n  const [open, setOpen] = useState(false);\n  return <Burger{{props}} open={open} setOpen={setOpen} className="border" />;\n}'
};

function BurgerDemo() {
  const [open, setOpen] = useState(false);
  return <Burger open={open} setOpen={setOpen} />;
}

function BurgerConfiguratorDemo(props: BurgerProps) {
  const [open, setOpen] = useState(false);
  return <Burger {...props} open={open} setOpen={setOpen} className="border" />;
}

export const usage: DataTrees = {
  type: "code",
  component: BurgerDemo,
  code: codes.usage
};

export const configurator: DataTrees = {
  type: "configurator",
  component: BurgerConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "size", type: "number", initialValue: 32, libraryValue: 32 },
    { prop: "color", type: "color", initialValue: "#757575", libraryValue: "#757575", swatches: ["#fab005", "#f08c00", "#fd7e14"] }
  ]
};

export const BurgerDemos = {
  usage,
  configurator
};
