"use client";
import { useOS } from "@/hooks/use-os";

export function Demo() {
  const os = useOS();
  if (!os) return <p>Detecting OS...</p>;
  return <div className="m-auto font-mono">Your OS: {os}</div>;
}
