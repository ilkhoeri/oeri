"use client";
import { useState } from "react";
import { Textarea } from "@/ui/textarea";

export function Demo() {
  const [error, setError] = useState<Error | null>(null);
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4">
      <label htmlFor="validatejson" className="mr-auto mt-4 w-full text-sm text-muted-foreground">Textarea will autosize to fit the content</label>
      <Textarea
        id="validatejson"
        validateJson
        formatOnBlur
        validationError="Invalid JSON"
        onValidationError={error => setError(error)}
        className="max-w-xl"
        placeholder="Enter JSON here"
      />

      <span className="-mt-1 mb-4 ml-auto text-xs text-destructive">
        {error?.message}
      </span>
    </div>
  );
}
