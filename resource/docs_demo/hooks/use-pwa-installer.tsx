"use client";
import { usePWAInstaller } from "@/hooks/use-pwa-installer";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { /* prompt, */ installer } = usePWAInstaller();

  return (
    <button
      type="button"
      role="button"
      title="install pwa"
      aria-label="install pwa"
      /* hidden={!prompt} // set hidden when PWA already installed... */
      onClick={installer}
      className={globalStyle({ button: "default", size: "sm" })}
    >
      Install PWA
    </button>
  );
}
