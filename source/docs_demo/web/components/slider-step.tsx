import { Slider, RangeSlider } from '@/ui/slider';
import { Typography } from "@/ui/typography";

const marks = [
  { value: 0, label: "xs" },
  { value: 25, label: "sm" },
  { value: 50, label: "md" },
  { value: 75, label: "lg" },
  { value: 100, label: "xl" }
];

export function Demo() {
  return (
    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center">
      <Typography prose="span">Decimal Values</Typography>
      <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />
      <br data-ignore/>
      <RangeSlider minRange={0.2} min={0} max={1} step={0.0005} defaultValue={[0.1245, 0.5535]} />

      <Typography prose="span" className="mt-6">Decimal step</Typography>
      <Slider defaultValue={0} min={-10} max={10} label={(value) => value.toFixed(1)} step={0.1} />

      <Typography prose="span" className="mt-6">Step matched with marks</Typography>
      <Slider
        defaultValue={50}
        label={(val) => marks.find((mark) => mark.value === val)!.label}
        step={25}
        marks={marks}
      />
    </div>
  );
}