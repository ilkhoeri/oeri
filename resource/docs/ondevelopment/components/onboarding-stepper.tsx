"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { useMeasureScrollbar } from "@/hooks/use-measure-scrollbar";
import { camelToKebab, transform } from "@/modules/utility";
import { cn } from "str-merge";

type RequestCookies =
  | { name: string; value: "true" | "false" | (string & {}) }
  | undefined;

export type TourSteps = {
  selector: string;
  content: string | string[];
  side?: `${DataSide}`;
  align?: `${DataAlign}`;
}[];

export interface OnboardingStepperProps {
  cookies: { key: string; request: RequestCookies };
  tourSteps: TourSteps;
  children?: React.ReactNode;
  sideOffset?: number;
}

type InsetContent = {
  top: string;
  left: string;
};

type RectAnchor = {
  h: number;
  w: number;
  x: number;
  y: number;
};

export enum DataSide {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left"
}

export enum DataAlign {
  start = "start",
  center = "center",
  end = "end"
}

const useIsomorphicEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;

const setCookie = (name: string, value: string, days = 360) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
};

export function OnboardingStepper({
  cookies,
  children,
  tourSteps,
  sideOffset = 0
}: OnboardingStepperProps) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [isTourActive, setIsTourActive] = React.useState(false);
  const [style, setStyle] = React.useState<InsetContent>({
    top: "0px",
    left: "0px"
  });
  const [styleAnchor, setStyleAnchor] = React.useState<RectAnchor>({
    h: 0,
    w: 0,
    x: 0,
    y: 0
  });
  const [side, setSide] = React.useState<`${DataSide}`>(
    tourSteps[0].side || DataSide.bottom
  ); // Default to bottom
  const [align, setAlign] = React.useState<`${DataAlign}`>(
    tourSteps[0].align || DataAlign.center
  ); // Default to center

  const guidesRef = React.useRef<HTMLDivElement>(null);
  const initialValue = cookies.request?.value;
  const currentStep = tourSteps[stepIndex];

  const pathname = usePathname();
  useMeasureScrollbar(isTourActive && initialValue === "false", {
    has: pathname !== "/"
  });

  function round(num: number) {
    return Math.round(num * 100) / 100;
  }

  const position = () => {
    const element = document.getElementById(currentStep.selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      const content = guidesRef.current?.getBoundingClientRect();
      // const content = document.querySelector("[role='dialog']")?.getBoundingClientRect();

      const calculateAlignment = (
        triggerStart: number,
        triggerSize: number,
        contentSize: number
      ): number => {
        switch (align) {
          case DataAlign.start:
            return triggerStart;
          case DataAlign.center:
            return triggerStart + (triggerSize - contentSize) / 2;
          case DataAlign.end:
            return triggerStart + triggerSize - contentSize;
          default:
            return triggerStart;
        }
      };

      let top = 0;
      let left = 0;

      if (content) {
        switch (side) {
          case DataSide.top:
            top = rect.top - content.height - sideOffset;
            left = calculateAlignment(rect.left, rect.width, content.width);
            break;
          case DataSide.right:
            top = calculateAlignment(rect.top, rect.height, content.height);
            left = rect.right + sideOffset;
            break;
          case DataSide.bottom:
            top = rect.bottom + sideOffset;
            left = calculateAlignment(rect.left, rect.width, content.width);
            break;
          case DataSide.left:
            top = calculateAlignment(rect.top, rect.height, content.height);
            left = rect.left - content.width - sideOffset;
            break;
        }

        // Update position based on viewport visibility
        if (top < 0) setSide(DataSide.bottom);
        else if (left < 0) setSide(DataSide.right);
        else if (top + content.height > window.innerHeight)
          setSide(DataSide.top);
        else if (left + content.width > window.innerWidth)
          setSide(DataSide.left);

        // Adjust based on scroll position
        setStyle({
          top: `${round(top + window.scrollY)}px`,
          left: `${round(left + window.scrollX)}px`
        });
        setStyleAnchor({
          w: round(rect.width),
          h: round(rect.height),
          y: round(rect.top + window.scrollY),
          x: round(rect.left + window.scrollX)
        });
      }
    }
  };

  useIsomorphicEffect(() => {
    if (isTourActive && initialValue === "false") position();
  }, [stepIndex, isTourActive, side, align]);

  React.useEffect(() => {
    setIsTourActive(true);
    if (initialValue === undefined) setCookie(cookies.key, "false");
    if (isTourActive && initialValue === "false") setStepIndex(0);
  }, []);

  const nextStep = () => {
    if (stepIndex < tourSteps.length - 1) {
      setStepIndex(stepIndex + 1);
      setSide(tourSteps[stepIndex + 1].side || DataSide.bottom);
      setAlign(tourSteps[stepIndex + 1].align || DataAlign.center);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setSide(tourSteps[stepIndex - 1].side || DataSide.bottom);
      setAlign(tourSteps[stepIndex - 1].align || DataAlign.center);
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setStepIndex(0);
    if (stepIndex === tourSteps.length - 1) setCookie(cookies.key, "true");
  };

  return (
    <>
      {children}

      {isTourActive && initialValue === "false" && (
        <>
          <div
            ref={guidesRef}
            role="dialog"
            className="absolute text-color bg-muted border rounded-2xl max-md:max-w-[50%] max-w-72 z-99 flex flex-col items-center justify-center"
            {...{ style }}>
            <article
              role="article"
              className="relative flex flex-col w-full p-3 md:p-4">
              <h4 className="text-base font-semibold">
                {transform("capitalize", camelToKebab(currentStep.selector))}
              </h4>

              {Array.isArray(currentStep.content) ? (
                <ul role="list">
                  {currentStep.content.map((content, index) => (
                    <li
                      key={index}
                      role="listitem"
                      className="text-sm mt-2 first:pt-2 first:border-t">
                      {content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm mt-2 pt-2 border-t">
                  {currentStep.content}
                </p>
              )}
            </article>

            <div
              role="group"
              className="relative w-full flex flex-row justify-between flex-nowrap items-center px-3 pb-3 gap-4">
              {stepIndex !== 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={stepIndex === 0}
                  className={cn(
                    "text-sm font-geist-mono rounded-md border shadow px-2 py-1 bg-background block truncate disabled:opacity-30 disabled:pointer-events-none "
                  )}>
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={nextStep}
                className={cn(
                  "text-sm font-geist-mono rounded-md border shadow px-2 py-1 bg-background min-w-max ml-auto"
                )}>
                {stepIndex === tourSteps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
            <i
              data-side={side}
              data-align={align}
              className="bg-muted size-4 rotate-45 absolute rounded-sm data-[align=center]:data-[side=right]:-left-2 data-[align=end]:data-[side=bottom]:right-8 data-[side=bottom]:-top-2 "
            />
          </div>

          <div
            role="presentation"
            className="size-full pointer-events-none fixed inset-0 overflow-hidden z-[90] bg-background/50 mix-blend-hard-light"
            {...{ style: {} }}>
            <div
              onClick={nextStep}
              className="cursor-pointer absolute rounded-xl bg-gray-400 opacity-100 pointer-events-auto transition-opacity duration-200"
              {...{
                style: {
                  top: `${styleAnchor.y - sideOffset / 4}px`,
                  left: `${styleAnchor.x - sideOffset / 4}px`,
                  height: `${styleAnchor.h + sideOffset / 2}px`,
                  width: `${styleAnchor.w + sideOffset / 2}px`
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
/**
function useUpdatedPosition(selector: string) {
  const [style, setStyle] = React.useState<{ top: string; left: string }>({
    top: "0",
    left: "0"
  });

  const updatePosition = () => {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      setStyle({
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX + rect.width}px`
      });
    }
  };

  React.useEffect(() => {
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [selector]);

  return style;
}
*/
