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
    <div className="m-auto mb-12 flex size-full flex-col items-center justify-center [&>*]:max-w-96">
      <Typography prose="span">Marks</Typography>
      <Slider defaultValue={40} marks={[{ value: 10 }, { value: 40 }, { value: 95 }]} />
      <Slider defaultValue={40} marks={marks} className="mt-6" />
      <RangeSlider defaultValue={[20, 80]} marks={[{ value: 20, label: "20%" }, { value: 50, label: "50%" }, { value: 80, label: "80%" }]} className="mt-6" />

      <Typography prose="span" className="mt-10">Restrict selection to marks</Typography>
      <Slider restrictToMarks defaultValue={25} marks={Array.from({ length: 5 }).map((_, index) => ({ value: index * 25 }))} />

      <Typography prose="span" className="mt-6">Disabled</Typography>
      <Slider defaultValue={60} disabled />
      <RangeSlider disabled defaultValue={[25, 75]} marks={marks} className="mt-6" />
    </div>
  );
}