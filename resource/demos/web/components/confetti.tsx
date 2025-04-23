"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Confetti, type ConfettiProps } from "@/ui/confetti";
import { Button } from "@/ui/button";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { createPortal } from "react-dom";\nimport { Confetti } from "@/ui/confetti";\nimport { Button } from "@/ui/button";\n\nexport function ConfettiDemo() {\n  const [start, setStart] = useState(false);\n\n  const windowIsDefine = typeof window !== "undefined" && typeof document !== "undefined";\n\n  const confetti = start ? <Confetti lifespan={5000} className="fixed" /> : null;\n\n  return (\n    <>\n      <Button\n        disabled={start}\n        onClick={() => {\n          if (!start) setStart(true);\n          setTimeout(() => setStart(false), 5100);\n        }}\n      >\n        Confetti\n      </Button>\n\n      {windowIsDefine && createPortal(confetti, document.body)}\n    </>\n  );\n}',
  configurator:
    '"use client"\nimport { useState } from "react";\nimport { Confetti } from "@/ui/confetti";\nimport { Button } from "@/ui/button";\n\nconst colors = [\n  "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate",\n  "coral", "cornflowerblue", "cornsilk", "crimson", "currentColor", "currentcolor", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen",\n  "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray",\n  "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia",\n  "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender"\n];\n\nexport function ConfettiDemo() {\n  const [start, setStart] = useState(false);\n\n  const confetti = start ? <Confetti{{props}} colors={colors} /> : null;\n\n  return (\n    <>\n      <Button\n        disabled={start}\n        onClick={() => {\n          if (!start) setStart(true);\n          setTimeout(() => setStart(false), 5100);\n        }}\n      >\n        Confetti\n      </Button>\n\n      {confetti}\n    </>\n  );\n}'
};

function ConfettiDemo() {
  const [start, setStart] = useState(false);

  const windowIsDefine = typeof window !== "undefined" && typeof document !== "undefined";

  const confetti = start ? <Confetti lifespan={5000} className="fixed" /> : null;

  return (
    <>
      <Button
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          setTimeout(() => setStart(false), 5100);
        }}
      >
        Confetti
      </Button>

      {windowIsDefine && createPortal(confetti, document.body)}
    </>
  );
}

const colors = [
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "currentColor",
  "currentcolor",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender"
];

function ConfiguratorDemo(props: ConfettiProps) {
  const [start, setStart] = useState(false);

  const confetti = start ? <Confetti {...props} colors={colors} /> : null;

  return (
    <>
      <Button
        disabled={start}
        onClick={() => {
          if (!start) setStart(true);
          setTimeout(() => setStart(false), 5100);
        }}
      >
        Confetti
      </Button>
      {confetti}
    </>
  );
}

const usage: DataTrees = {
  type: "code",
  component: ConfettiDemo,
  code: codes.usage,
  centered: true
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  controls: [
    { prop: "className", type: "select", initialValue: "absolute", libraryValue: null, data: ["absolute", "fixed"] },
    { prop: "lifespan", type: "number", initialValue: 3500, libraryValue: 3500, min: 3500, max: 25000 }
  ]
};

export const ConfettiDemos = {
  usage,
  configurator
};
