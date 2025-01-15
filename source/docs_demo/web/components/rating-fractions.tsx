import { Rating } from "@/ui/rating";
import { Stack } from "@/ui/stack";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  return (
    <Stack gap={32} align="center" className="m-auto size-full max-w-96">
      <__docs_demo.comment title="// Fractions: 2" className="-mb-6 mt-0 w-full pt-0" />
      <Rating fractions={2} defaultValue={1.5} />
      <__docs_demo.comment title="// Fractions: 3" className="-mb-6 mt-4 w-full border-t pt-4" />
      <Rating fractions={3} defaultValue={2.33333333} />
      <__docs_demo.comment title="// Fractions: 4" className="-mb-6 mt-4 w-full border-t pt-4" />
      <Rating fractions={4} defaultValue={3.75} />
    </Stack>
  );
}
