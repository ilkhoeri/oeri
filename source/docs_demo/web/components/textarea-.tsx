import { Textarea } from "@/ui/textarea";

export function Demo() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4">
      <label htmlFor="text-area" className="mr-auto mt-4 w-full text-sm text-muted-foreground">Textarea will autosize to fit the content</label>
      <Textarea autosize={false} id="text-area" placeholder="Enter Text here" />
    </div>
  );
}
