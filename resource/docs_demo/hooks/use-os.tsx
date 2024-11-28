"use client";
import { useOS } from "@/modules/hooks-rest";

export function Demo() {
  const os = useOS();
  if (!os) return <p>Detecting OS...</p>;
  return <div className="font-mono">Your OS: {os}</div>;
}
