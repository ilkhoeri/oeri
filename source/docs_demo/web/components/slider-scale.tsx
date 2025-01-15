import { RangeSlider, Slider } from '@/ui/slider';

const getScale = (v: number) => 2 ** v;
function valueLabelFormat(value: number) {
  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  let scaledValue = value;
  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }
  return `${scaledValue} ${units[unitIndex]}`;
}

export function Demo() {
  return (
    <div className="flex size-full max-w-96 flex-col items-center justify-center gap-12 py-8">
      <Slider scale={getScale} step={1} min={2} max={30} labelAlwaysOn defaultValue={10} label={valueLabelFormat} />

      <RangeSlider scale={getScale} step={1} min={2} max={30} labelAlwaysOn defaultValue={[10, 20]} label={valueLabelFormat} />
    </div>
  );
}