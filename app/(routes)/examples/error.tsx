"use client";

import { useEffect } from "react";
import { Comp } from "@/source/ui/components";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  let errorMessage = null;
  if (process.env.NODE_ENV !== "production") {
    errorMessage = (
      <p className="font-mono text-[13px] text-muted-foreground">
        {String(error)}
      </p>
    );
  }

  return (
    <Comp el="section" className="my-12 gap-4 font-medium [&_*]:font-mono">
      <h2 className="">Something went wrong!</h2>
      {errorMessage}

      <div className="flex flex-row gap-8 text-sm font-medium">
        <button type="button" aria-label="try-again" onClick={() => reset()}>
          Try again
        </button>
        <button
          type="button"
          aria-label="reload"
          onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    </Comp>
  );
}
