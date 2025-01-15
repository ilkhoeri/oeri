import { RangeSlider, Slider } from '@/ui/slider';

export function Demo() {
  return (
    <div className="flex size-full max-w-96 flex-col items-center justify-center gap-10">
      <Slider inverted defaultValue={80} />
      <RangeSlider inverted defaultValue={[40, 80]} />
    </div>
  );
}