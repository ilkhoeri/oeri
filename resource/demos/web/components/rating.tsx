import { useState } from "react";
import { Rating, type RatingProps } from "@/ui/rating";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Stack } from "@/ui/stack";
import { rem } from "xuxi";
import { SunIcon, MoonStarIcon, MoodCryIcon, MoodSadIcon, MoodSmileIcon, MoodCrazyHappyIcon, MoodHappyIcon } from "@/icons/*";

const codes = {
  usage: '"use client";\nimport { useState } from "react";\nimport { Rating } from "@/ui/rating";\n\nexport function RatingDemo() {\n  const [rating, setRating] = useState(2);\n  return <Rating value={rating} onChange={setRating} />;\n}',
  configurator: 'import { Rating } from "@/ui/rating";\n\nexport function RatingDemo() {\n  return <Rating{{props}} defaultValue={3} />;\n}',
  customSymbol:
    'import { Rating } from "@/ui/rating";\nimport { Stack } from "@/ui/stack";\nimport { rem } from "xuxi";\nimport { SunIcon, MoonStarIcon, MoodCryIcon, MoodSadIcon, MoodSmileIcon, MoodCrazyHappyIcon, MoodHappyIcon } from "@/icons/*";\n\nfunction getIconStyle(color: string = "#666", size: number = 24) {\n  return {\n    style: {\n      color,\n      width: rem(size),\n      height: rem(size)\n    }\n  };\n}\n\nconst getEmptyIcon = (value: number) => {\n  switch (value) {\n    case 1:\n      return <MoodCryIcon {...getIconStyle()} />;\n    case 2:\n      return <MoodSadIcon {...getIconStyle()} />;\n    case 3:\n      return <MoodSmileIcon {...getIconStyle()} />;\n    case 4:\n      return <MoodHappyIcon {...getIconStyle()} />;\n    case 5:\n      return <MoodCrazyHappyIcon {...getIconStyle()} />;\n    default:\n      return null;\n  }\n};\n\nconst getFullIcon = (value: number) => {\n  switch (value) {\n    case 1:\n      return <MoodCryIcon {...getIconStyle("red")} />;\n    case 2:\n      return <MoodSadIcon {...getIconStyle("orange")} />;\n    case 3:\n      return <MoodSmileIcon {...getIconStyle("yellow")} />;\n    case 4:\n      return <MoodHappyIcon {...getIconStyle("lime")} />;\n    case 5:\n      return <MoodCrazyHappyIcon {...getIconStyle("green")} />;\n    default:\n      return null;\n  }\n};\n\nexport function RatingCustomSymbolDemo() {\n  return (\n    <Stack gap={32} align="center" className="m-auto size-full max-w-96">\n      <Rating emptySymbol={<MoonStarIcon {...getIconStyle()} />} fullSymbol={<SunIcon {...getIconStyle("#ffd000")} />} />\n\n      <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />\n    </Stack>\n  );\n}',
  customFractions:
    'import { Rating } from "@/ui/rating";\nimport { Stack } from "@/ui/stack";\n\nexport function RatingFractionsDemo() {\n  return (\n    <Stack gap={32} align="center" className="m-auto size-full max-w-96">\n      <Rating fractions={2} defaultValue={1.5} />\n      <Rating fractions={3} defaultValue={2.33333333} />\n      <Rating fractions={4} defaultValue={3.75} />\n    </Stack>\n  );\n}'
};

function Comment({ label }: { label: string }) {
  return <kbd className="-mb-6 mr-auto mt-0 w-full pt-0 font-geist-mono text-sm text-muted-foreground/60">{label}</kbd>;
}

function Demo() {
  const [rating, setRating] = useState(2);
  return <Rating value={rating} onChange={setRating} />;
}

function ConfiguratorDemo(props: RatingProps) {
  return <Rating {...props} defaultValue={3} />;
}

function getIconStyle(color: string = "#666", size: number = 24) {
  return {
    style: {
      color,
      width: rem(size),
      height: rem(size)
    }
  };
}

const getEmptyIcon = (value: number) => {
  switch (value) {
    case 1:
      return <MoodCryIcon {...getIconStyle()} />;
    case 2:
      return <MoodSadIcon {...getIconStyle()} />;
    case 3:
      return <MoodSmileIcon {...getIconStyle()} />;
    case 4:
      return <MoodHappyIcon {...getIconStyle()} />;
    case 5:
      return <MoodCrazyHappyIcon {...getIconStyle()} />;
    default:
      return null;
  }
};

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return <MoodCryIcon {...getIconStyle("red")} />;
    case 2:
      return <MoodSadIcon {...getIconStyle("orange")} />;
    case 3:
      return <MoodSmileIcon {...getIconStyle("yellow")} />;
    case 4:
      return <MoodHappyIcon {...getIconStyle("lime")} />;
    case 5:
      return <MoodCrazyHappyIcon {...getIconStyle("green")} />;
    default:
      return null;
  }
};

function RatingCustomSymbolDemo() {
  return (
    <Stack gap={32} align="center" className="m-auto size-full max-w-96">
      <Comment label="Custom Icon" />
      <Rating emptySymbol={<MoonStarIcon {...getIconStyle()} />} fullSymbol={<SunIcon {...getIconStyle("#ffd000")} />} />

      <Comment label="Custom State Icon" />
      <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />
    </Stack>
  );
}

function RatingFractionsDemo() {
  return (
    <Stack gap={32} align="center" className="m-auto size-full max-w-96">
      <Comment label="Fractions: 2" />
      <Rating fractions={2} defaultValue={1.5} />
      <Comment label="Fractions: 3" />
      <Rating fractions={3} defaultValue={2.33333333} />
      <Comment label="Fractions: 4" />
      <Rating fractions={4} defaultValue={3.75} />
    </Stack>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "size", type: "number", initialValue: 20, libraryValue: 20, min: 14, max: 40 },
    { prop: "count", type: "number", initialValue: 5, libraryValue: 5, min: 3, max: 10 },
    { prop: "color", type: "color", initialValue: "#f08c00", libraryValue: "#f08c00" },
    { prop: "highlightSelectedOnly", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "readOnly", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const customSymbol: DataTrees = {
  type: "code",
  component: RatingCustomSymbolDemo,
  code: codes.customSymbol
};

const customFractions: DataTrees = {
  type: "code",
  component: RatingFractionsDemo,
  code: codes.customFractions
};

export const RatingDemos = {
  usage,
  configurator,
  customSymbol,
  customFractions
};
