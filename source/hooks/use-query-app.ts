"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export function useQueryApp() {
  const max_639 = useMediaQuery("(max-width: 639px)");
  const min_640 = useMediaQuery("(min-width: 640px)");
  const max_767 = useMediaQuery("(max-width: 767px)");
  const min_md = useMediaQuery("(min-width: 768px)");
  const max_md = useMediaQuery("(max-width: 1023px)");
  const min_lg = useMediaQuery("(min-width: 1024px)");
  const max_lg = useMediaQuery("(max-width: 1279px)");

  return {
    /** @returns (min-width: 640px)
     * @usage
     * ```js
      const { max_639 } = useQueryApp();
      if (max_639) {
        return null;
      }
      className="hidden sm:flex"
     * ```
     */
    max_639,
    /** @returns (min-width: 640px)
     * @usage
     * ```js
      const { min_640 } = useQueryApp();
      if (min_640) {
        return null;
      }
      className="hidden sm:flex"
     * ```
     */
    min_640,
    /** @returns (max-width: 767px)
     * @usage
     * ```js
      const { max_767 } = useQueryApp();
      if (max_767) {
        return null;
      }
      className="hidden md:flex"
     * ```
     */
    max_767,
    /** @returns (min-width: 768px)
     * @usage
     * ```js
      const { min_md } = useQueryApp();
        {min_md && imageSrc && (
          <Image width={350} height={350} alt=" " src={imageSrc} />
        )}
      className="hidden md:flex"
     * ```
     */
    min_md,
    /** @returns (min-width: 1023px)
     * @usage
     * ```js
      const { max_md } = useQueryApp();
        {max_md && imageSrc && (
          <Image width={350} height={350} alt=" " src={imageSrc} />
        )}
      className="hidden md:flex"
     * ```
     */
    max_md,
    /** @returns (min-width: 1024px)
     * @usage
     * ```js
      const { min_640 } = useQueryApp();
        {min_640 && imageSrc && (
          <Image width={350} height={350} alt=" " src={imageSrc} />
        )}
      className="hidden md:flex"
     * ```
     */
    min_lg,
    max_lg
  };
}
