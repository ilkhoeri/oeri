/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// Benchmark function
export function benchmark(fn: Function, label: string) {
  console.time(label);
  for (let i = 0; i < 1000000; i++) {
    fn();
  }
  console.timeEnd(label);
  console.log(JSON.stringify(fn()));
}
