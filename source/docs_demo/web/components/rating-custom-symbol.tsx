import { Rating } from "@/ui/rating";
import { Stack } from "@/ui/stack";
import { rem } from "str-merge";
import { SunIcon, MoonStarIcon, MoodCryIcon, MoodSadIcon, MoodSmileIcon, MoodCrazyHappyIcon, MoodHappyIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

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

export function Demo() {
  return (
    <Stack gap={32} align="center" className="m-auto size-full max-w-96">
      <__docs_demo.comment title="// Custom Icon" className="-mb-6 mt-0 w-full pt-0" />
      <Rating emptySymbol={<MoonStarIcon {...getIconStyle()} />} fullSymbol={<SunIcon {...getIconStyle("#ffd000")} />} />

      <__docs_demo.comment title="// Custom State Icon" className="-mb-6 mt-4 w-full border-t pt-4" />
      <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />
    </Stack>
  );
}
