"use client";
import { Textarea } from "@/ui/textarea";
import { Typography } from "@/ui/typography";
import { useElementInfo } from "@/hooks/use-element-info";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Textarea } from "@/ui/textarea";\nimport { Typography } from "@/ui/typography";\nimport { useElementInfo } from "@/hooks/use-element-info";\n\nexport function UseElementInfoDemo() {\n  const info = useElementInfo<HTMLTextAreaElement>();\n\n  return (\n    <div className="m-auto flex h-[35rem] size-full relative items-center justify-center [&_*]:font-geist-mono">\n      <Textarea\n        ref={info.ref}\n        id="box"\n        readOnly\n        unstyled\n        autosize={false}\n        placeholder="resize box"\n        data-custom-attribute="customValue"\n        className="absolute z-9 m-0 min-h-9 min-w-28 resize place-content-center rounded-lg border bg-muted/50 placeholder:text-center placeholder:uppercase focus-visible:outline-0 focus-visible:ring-0"\n        onMouseEnter={info.onMouseEnter}\n        onMouseLeave={info.onMouseLeave}\n      />\n\n      <div suppressHydrationWarning className="absolute left-4 top-4 mb-auto flex flex-col text-xs [&_*]:font-roboto-mono">\n        <Typography prose="muted" className="mt-2">Element Information :</Typography>\n        <p>Component Name=&lt;{info.elementName}&gt;</p>\n        <p>hovered=&quot;{info.hovered ? "true" : "false"}&quot;</p>\n\n        <Typography prose="muted" className="mt-2">Attributes :</Typography>\n        <ul>\n          {Object.entries(info.attributes).map(([key, value]) => (\n            <li key={key}>{key}=&quot;{value}&quot;</li>\n          ))}\n        </ul>\n\n        <Typography prose="muted" className="mt-2">Rect Information :</Typography>\n        <ul>\n          {Object.entries(info.rect).map(([key, value]) => (\n            <li key={key}>{key}=&quot;{value}&quot;</li>\n          ))}\n        </ul>\n\n        <Typography prose="muted" className="mt-2">Window Size :</Typography>\n        <p>\n          Width=&quot;{info.windowSize.width}&quot;, Height=&quot;\n          {info.windowSize.height}&quot;\n        </p>\n\n        <Typography prose="muted" className="mt-2">Scroll Positions :</Typography>\n        <p>Scroll Position (Element)=&quot;{info.scrollPosition}&quot;</p>\n        <p>Scroll Position (Body)=&quot;{info.scrollBody}&quot;</p>\n      </div>\n    </div>\n  );\n}'
};

function Demo() {
  const info = useElementInfo<HTMLTextAreaElement>();

  return (
    <div className="m-auto flex h-[35rem] size-full relative items-center justify-center [&_*]:font-geist-mono">
      <Textarea
        ref={info.ref}
        id="box"
        readOnly
        unstyled
        autosize={false}
        placeholder="resize box"
        data-custom-attribute="customValue"
        className="absolute z-9 m-0 min-h-9 min-w-28 resize place-content-center rounded-lg border bg-muted/50 placeholder:text-center placeholder:uppercase focus-visible:outline-0 focus-visible:ring-0"
        onMouseEnter={info.onMouseEnter}
        onMouseLeave={info.onMouseLeave}
      />

      <div suppressHydrationWarning className="absolute left-4 top-4 mb-auto flex flex-col text-xs [&_*]:font-roboto-mono">
        <Typography prose="muted" className="mt-2">
          Element Information :
        </Typography>
        <p>Component Name=&lt;{info.elementName}&gt;</p>
        <p>hovered=&quot;{info.hovered ? "true" : "false"}&quot;</p>
        <Typography prose="muted" className="mt-2">
          Attributes:
        </Typography>
        <ul>
          {Object.entries(info.attributes).map(([key, value]) => (
            <li key={key}>
              {key}=&quot;{value}&quot;
            </li>
          ))}
        </ul>
        <Typography prose="muted" className="mt-2">
          Rect Information:
        </Typography>
        <ul>
          {Object.entries(info.rect).map(([key, value]) => (
            <li key={key}>
              {key}=&quot;{value}&quot;
            </li>
          ))}
        </ul>
        <Typography prose="muted" className="mt-2">
          Window Size:
        </Typography>
        <p>
          Width=&quot;{info.windowSize.width}&quot;, Height=&quot;
          {info.windowSize.height}&quot;
        </p>
        <Typography prose="muted" className="mt-2">
          Scroll Positions:
        </Typography>
        <p>Scroll Position (Element)=&quot;{info.scrollPosition}&quot;</p>
        <p>Scroll Position (Body)=&quot;{info.scrollBody}&quot;</p>
      </div>
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-[35rem] w-full centered" }
};

export const UseElementInfoDemos = {
  usage
};
