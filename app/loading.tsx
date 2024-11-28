import React from "react";

import { Spinner } from "@/source/assets/loader";

export default function Loading() {
  return (
    <main className="relative flex h-screen min-h-screen w-full items-center justify-center bg-background">
      <Spinner size={24} />
    </main>
  );
}
