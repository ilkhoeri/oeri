import { RangeSlider, Slider } from "@/ui/slider";
import { Typography } from "@/ui/typography";
import { MoonStarIcon, StarIcon, SunIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: thumbSize, ...props } = __docs_demo.useDemo({ Numb: 26 });
  const styles = { thumb: { borderWidth: "2px", padding: "3px" } };
  return (
    <>
    <__docs_demo.area className="[&>*]:max-w-96">
      <Slider thumbSize={thumbSize} defaultValue={20} />

      <Typography prose="span" className="mt-6">Thumb Icon</Typography>
      <Slider
        thumbChildren={<StarIcon size="75%" />}
        color="red"
        label={null}
        defaultValue={40}
        thumbSize={thumbSize}
        styles={styles}
      />
      <RangeSlider
        color="red"
        label={null}
        thumbSize={thumbSize}
        defaultValue={[20, 60]}
        thumbChildren={[<SunIcon size="75%" key="1" />, <MoonStarIcon size="75%" key="2" />]}
        styles={styles}
        className="mt-6"
      />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="thumbSize" value={thumbSize} setNumb={props.setNumb} min="16" max="42" />
    </__docs_demo.controls>
    </>
  );
}
