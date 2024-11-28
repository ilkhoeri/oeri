"use client";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { MinimizeIcon, MaximizeIcon } from "@/modules/icons";
import { SetProps } from "../__set_props";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { fullscreen, toggle } = useFullscreen();
  const { ref: refImage, toggle: onClickImage } = useFullscreen();

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        role="button"
        id="fullscreen-toggle"
        onClick={toggle}
        title={fullscreen ? "Minimize" : "Maximize"}
        className={globalStyle({ toggle: "item", size: "icon-sm" }, "border")}>
        {fullscreen ? (
          <MinimizeIcon strokeWidth={2.25} />
        ) : (
          <MaximizeIcon strokeWidth={2.25} />
        )}
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={refImage}
        src="/icons/oeri-asset.png"
        alt="oeri logo"
        width={96}
        height={96}
        onClick={onClickImage}
        className="mt-12 size-24 rounded-lg border bg-black"
      />
      <span className="mt-4 text-sm font-medium">
        use with ref, click image to view fullscreen
      </span>
      <SetProps.LabelOnly htmlFor="fullscreen-toggle">
        {fullscreen ? "Click to Minimize" : "Click to Maximize"}
      </SetProps.LabelOnly>
    </div>
  );
}
