import { Sheets, SheetsTrigger, SheetsContent } from "@/ui/sheets";
import { ChevronIcon } from "@/icons/*";

export function Demo() {
  return (
    <Sheets
      variant="collapsible"
      clickOutsideToClose
      className="m-auto w-full max-w-80 space-y-2"
    >
      <SheetsTrigger className="w-full justify-between bg-background font-mono text-sm text-color">
        Select your &lt;Sheets /&gt;
        <span className="rounded-md border p-1 transition-colors group-hover:bg-muted/90 group-data-[state=open]:border-color">
          <ChevronIcon chevron="up-down" />
        </span>
      </SheetsTrigger>

      <a
        href="#sheets-collapsible"
        className="mt-4 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60"
      >
        @sheets/collapsible
      </a>

      <SheetsContent className="space-y-2">
        {["accordion", "dialog", "drawer", "dropdown"].map(i => (
          <a
            key={i}
            href={`#sheets-${i}`}
            className="w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60"
          >
            @sheets/{i}
          </a>
        ))}
      </SheetsContent>
    </Sheets>
  );
}
