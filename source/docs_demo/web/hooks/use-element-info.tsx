"use client";
import { useElementInfo } from "@/hooks/use-element-info";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const info = useElementInfo<HTMLTextAreaElement>();

  return (
    <div className="m-auto flex h-[35rem] items-center justify-center">
      <textarea
        ref={info.ref}
        id="box"
        readOnly
        placeholder="resize box"
        className="absolute z-9 m-0 min-h-9 min-w-28 resize place-content-center rounded-lg border bg-muted/50 placeholder:text-center placeholder:uppercase focus-visible:outline-0 focus-visible:ring-0"
        onMouseEnter={info.onMouseEnter}
        onMouseLeave={info.onMouseLeave}
        data-custom-attribute="customValue"
      />

      <div
        suppressHydrationWarning
        className="absolute left-4 top-4 mb-auto flex flex-col text-xs [&_*]:font-roboto-mono">
        <__docs_demo.code className="mt-2">Element Information :</__docs_demo.code>
        <p>Component Name=&lt;{info.elementName}&gt;</p>
        <p>hovered=&quot;{info.hovered ? "true" : "false"}&quot;</p>
        <__docs_demo.code className="mt-2">Attributes:</__docs_demo.code>
        <ul>
          {Object.entries(info.attributes).map(([key, value]) => (
            <li key={key}>
              {key}=&quot;{value}&quot;
            </li>
          ))}
        </ul>
        <__docs_demo.code className="mt-2">Rect Information:</__docs_demo.code>
        <ul>
          {Object.entries(info.rect).map(([key, value]) => (
            <li key={key}>
              {key}=&quot;{value}&quot;
            </li>
          ))}
        </ul>
        <__docs_demo.code className="mt-2">Window Size:</__docs_demo.code>
        <p>
          Width=&quot;{info.windowSize.width}&quot;, Height=&quot;
          {info.windowSize.height}&quot;
        </p>
        <__docs_demo.code className="mt-2">Scroll Positions:</__docs_demo.code>
        <p>Scroll Position (Element)=&quot;{info.scrollPosition}&quot;</p>
        <p>Scroll Position (Body)=&quot;{info.scrollBody}&quot;</p>
      </div>
    </div>
  );
}
