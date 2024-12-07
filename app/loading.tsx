import React from "react";
import { LoaderSpinner } from "@/modules/index";

export default function Loading() {
  return (
    <main className="relative flex h-screen min-h-screen w-full items-center justify-center bg-background">
      <LoaderSpinner size={24} />
    </main>
  );
}
