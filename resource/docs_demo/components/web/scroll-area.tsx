import { ScrollArea } from "@/modules/components/web";
import { FileIcon } from "@/modules/icons";
import { SetProps, SetPropsButtonSelect, useSetProps } from "../../__set_props";

export function Demo() {
  const { str: overflow, ...rest } = useSetProps({ Str: "y" });
  return (
    <div data-ignore="">
    <section className="relative rounded-md border bg-background">
      <ScrollArea
        overflow={overflow as "x" | "y"} // ignore
        classNames={{
          content:
            "max-h-full gap-4 p-4 flex data-[overflow=y]:flex-col data-[overflow=x]:flex-row data-[overflow=y]:h-80 data-[overflow=y]:w-64 data-[overflow=y]:overflow-y-auto data-[overflow=x]:h-max data-[overflow=x]:w-80 data-[overflow=x]:overflow-x-auto",
          thumb:
            "hover:bg-muted-foreground peer-hover:bg-muted-foreground data-[scroll=active]:bg-color data-[overflow=x]:bottom-1 data-[overflow=y]:right-1"
        }}>
        <h1 className="mb-4 text-xs font-medium leading-none">
          Scrollbar area
        </h1>
        {[...Array(30)].map((_, index) => (
          <p key={index} className="flex min-w-max items-center gap-2 border-b pb-1.5 pt-3 text-sm">
            <FileIcon /> Lorem ipsum...
          </p>
        ))}
      </ScrollArea>
    </section>
      {/* prettier-ignore */}
      <SetProps.Wrapper><SetPropsButtonSelect str={overflow} label="Overflow" values={["x", "y"]} {...rest} /></SetProps.Wrapper>
    </div>
  );
}
