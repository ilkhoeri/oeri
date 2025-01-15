import { ScrollArea } from "@/ui/scroll-area";
import { FileIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export function Demo() {
  const { str: orientation, ...rest } = __docs_demo.useDemo({ Str: "vertical" });
  const { str: type, numb: size, ...first } = __docs_demo.useDemo({ Str: "hover", Numb: 10 });
  const { str: thumbColor, ...second } = __docs_demo.useDemo({ Str: "hsl(var(--muted))" });
  const { str: trackColor, ...third } = __docs_demo.useDemo({ Str: undefined });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <ScrollArea
      // @ts-ignore
      orientation={orientation}
      // @ts-ignore
      type={type}
      size={size}
      /* use `color="grey"` to changes thumb color only */
      color={{ thumb: thumbColor, track: trackColor }}
      className="rounded-md border p-4 data-[orientation=horizontal]:h-max data-[orientation=vertical]:h-[28rem]"
    >
      <h1 className="inline-flex min-w-max max-w-max items-center rounded-sm border border-constructive bg-constructive/30 px-1.5 py-1 text-sm font-medium leading-none text-constructive-emphasis group-data-[orientation=horizontal]/sa:mr-4 group-data-[orientation=vertical]/sa:mb-4">
        Scrollbar area
      </h1>
      {TAGS.map( tag => (
        <p key={tag} className="flex min-w-max items-center gap-3 border-muted text-sm text-muted-foreground group-data-[orientation=vertical]/sa:mt-2 group-data-[orientation=horizontal]/sa:border-l group-data-[orientation=vertical]/sa:border-b group-data-[orientation=horizontal]/sa:px-4 group-data-[orientation=vertical]/sa:py-1">
          <FileIcon /> {tag}
        </p>
      ))}
    </ScrollArea>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="type" values={["auto", "always", "scroll", "hover"]} str={type} {...first} />
    <__docs_demo.setSelect label="orientation" values={["vertical", "horizontal"]} str={orientation} {...rest} />
    <__docs_demo.setColor label="thumb" str={thumbColor} swatches={[]} {...second} />
    <__docs_demo.setColor label="track" str={trackColor} swatches={[]} {...third} />
    <__docs_demo.setRange label="size" min="5" max="18" value={size} setNumb={first.setNumb} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
