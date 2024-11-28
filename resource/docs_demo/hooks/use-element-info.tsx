"use client";
import { useElementInfo } from "@/hooks/use-element-info";
import { SetProps } from "../__set_props";

export function Demo() {
  const info = useElementInfo<HTMLTextAreaElement>();

  return (
    <div className="flex h-[35rem] items-center justify-center">
      <textarea
        ref={info.ref}
        id="box"
        readOnly
        placeholder="resize box"
        className="absolute min-h-9 min-w-28 resize place-content-center rounded-lg border bg-muted/50 placeholder:text-center placeholder:uppercase focus-visible:outline-0 focus-visible:ring-0"
        onMouseEnter={info.onMouseEnter}
        onMouseLeave={info.onMouseLeave}
        style={{ margin: "0", zIndex: "9" }}
        data-custom-attribute="customValue"
      />

      <div
        suppressHydrationWarning
        className="absolute left-4 top-4 mb-auto flex flex-col text-xs [&_*]:font-roboto-mono">
        <SetProps.Code className="mt-2">Element Information :</SetProps.Code>
        <p>Component Name=&lt;{info.elementName}&gt;</p>
        <p>hovered=&quot;{info.hovered ? "true" : "false"}&quot;</p>
        <SetProps.Code className="mt-2">Attributes:</SetProps.Code>
        <ul>
          {Object.entries(info.attributes).map(([key, value]) => (
            <li key={key}>
              {key}=&quot;{value}&quot;
            </li>
          ))}
        </ul>
        <SetProps.Code className="mt-2">Rect Information:</SetProps.Code>
        <ul>
          {Object.entries(info.rect).map(([key, value]) => (
            <li key={key}>
              {key}=&quot;{value}&quot;
            </li>
          ))}
        </ul>
        <SetProps.Code className="mt-2">Window Size:</SetProps.Code>
        <p>
          Width=&quot;{info.windowSize.width}&quot;, Height=&quot;
          {info.windowSize.height}&quot;
        </p>
        <SetProps.Code className="mt-2">Scroll Positions:</SetProps.Code>
        <p>Scroll Position (Element)=&quot;{info.scrollPosition}&quot;</p>
        <p>Scroll Position (Body)=&quot;{info.scrollBody}&quot;</p>
      </div>
    </div>
  );
}
