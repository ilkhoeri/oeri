"use client";
import * as Icons from "@/icons/*";
import { useState } from "react";
import { useIsomorphicEffect } from "./use-isomorphic-effect";

export function getOS(userAgent: string) {
  // if (typeof window === "undefined") return { name: "...", icon: Icons.AISearchIcon, };

  if (/chrome|chromium|crios/i.test(userAgent)) return { name: "Chrome", icon: Icons.BrandChromeIcon };
  if (/firefox|fxios/i.test(userAgent)) return { name: "Firefox", icon: Icons.BrandFirefoxIcon };
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return { name: "Safari", icon: Icons.BrandSafariIcon };
  if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) return { name: "Opera", icon: Icons.BrandOperaIcon };
  if (/edg/i.test(userAgent)) return { name: "Edge", icon: Icons.BrandEdgeIcon };
  if (/msie|trident/i.test(userAgent)) return { name: "Internet Explorer", icon: Icons.WorldIcon };

  if (/Windows NT 6.2/i.test(userAgent)) return { name: "Windows 8", icon: Icons.BrandWindowsIcon };
  if (/Windows NT 6.1/i.test(userAgent)) return { name: "Windows 7", icon: Icons.BrandWindowsIcon };
  if (/Windows NT 6.0/i.test(userAgent)) return { name: "Windows Vista", icon: Icons.BrandWindowsIcon };
  if (/Windows NT 5.1/i.test(userAgent)) return { name: "Windows XP", icon: Icons.BrandWindowsIcon };
  if (/Windows NT 5.0/i.test(userAgent)) return { name: "Windows 2000", icon: Icons.BrandWindowsIcon };
  if (/(Win32)|(Win64)|(Windows)|(WinCE)/i.test(userAgent)) return { name: "Windows", icon: Icons.BrandWindowsIcon };

  if (/Macintosh|Mac OS/i.test(userAgent)) return { name: "MacBook", icon: Icons.DeviceImacIcon };

  if (/SM-|Samsung/i.test(userAgent)) {
    const model = userAgent.match(/SM-[A-Z0-9]+/)?.[0];
    return { name: model ? `Samsung ${model}` : "Samsung Device", icon: Icons.BrandSamsungIcon };
  }

  if (/HUAWEI/i.test(userAgent)) return { name: userAgent.match(/(HUAWEI)[^;]*/i)?.[0] || "Huawei", icon: Icons.BrandHuaweiIcon };

  if (/Xiaomi|Redmi/i.test(userAgent)) return { name: userAgent.match(/(Xiaomi|Redmi)[^;]*/i)?.[0] || "Xiaomi", icon: Icons.BrandXiaomiIcon };

  if (/OnePlus/i.test(userAgent)) return { name: userAgent.match(/(OnePlus)[^;]*/i)?.[0] || "OnePlus", icon: Icons.BrandAndroidIcon };

  if (/OPPO/i.test(userAgent)) return { name: userAgent.match(/(OPPO)[^;]*/i)?.[0] || "OPPO", icon: Icons.BrandAndroidIcon };

  if (/Vivo/i.test(userAgent)) return { name: userAgent.match(/(Vivo)[^;]*/i)?.[0] || "Vivo", icon: Icons.BrandAndroidIcon };

  if (/iPhone/.test(userAgent)) {
    const model = userAgent.match(/iPhone\s([\d,]+)/)?.[1]?.replace(",", ".");
    return { name: model ? `iPhone ${model}` : "iPhone", icon: Icons.BrandAppleIcon };
  }
  if (/iPad/.test(userAgent)) return { name: "iPad", icon: Icons.DeviceTabletIcon };
  const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
  const iosPlatforms = /(iOS)|(iPhone)|(iPod)/i;
  if (macosPlatforms.test(userAgent)) return { name: "Mac OS", icon: Icons.BrandMacOsIcon };
  if (iosPlatforms.test(userAgent)) return { name: "iOS", icon: Icons.BrandAppleIcon };

  if (/Android/i.test(userAgent)) return { name: "Android", icon: Icons.BrandAndroidIcon };

  if (/Linux/i.test(userAgent)) return { name: "Linux", icon: Icons.BrandLinuxIcon };
  if (/X11/.test(userAgent) && !/Win/.test(userAgent) && !/Mac/.test(userAgent)) return { name: "UNIX", icon: Icons.WorldIcon };

  return { name: "undetermined", icon: Icons.WorldIcon };
}

async function getOSSync(userAgent: string) {
  if ((navigator as any)?.userAgentData) {
    const brands = await (navigator as any).userAgentData.getHighEntropyValues(["platform", "model"]);
    const withModel = getOS(brands.model || brands.platform);
    return withModel;
  }
  return getOS(userAgent);
}

interface UseOsOptions {
  getModel?: boolean;
  getValueInEffect?: boolean | string;
}

export function useOS(opts: UseOsOptions = {}) {
  const { getModel = true, getValueInEffect = false } = opts;
  const nameInEffect = typeof getValueInEffect === "string" ? getValueInEffect : "undetermined";
  const [os, setOS] = useState(getValueInEffect ? { name: nameInEffect, icon: Icons.WorldIcon } : { name: "", icon: Icons.AISearchIcon });

  useIsomorphicEffect(() => {
    const userAgent = window.navigator.userAgent;
    async function updateOS() {
      try {
        if (getModel) setOS(await getOSSync(userAgent));
        else setOS(getOS(userAgent));
      } catch {
        setOS(os => os);
      }
    }
    updateOS();
  }, [getModel]);

  return os;
}
