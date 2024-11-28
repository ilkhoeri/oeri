"use client";
import { useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const [newTitle, setNewTitle] = useState<string>("describe your title");
  useDocumentTitle(newTitle);

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <input
        type="text"
        name="set-newtitle"
        id="set-newtitle"
        title="set-newtitle"
        aria-label="set-newtitle"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        className={globalStyle({ input: "text" }, "w-64")}
      />
      <p className="mt-12 w-1/2 text-center">
        Changing the title on the &lt;title&gt; Element:
      </p>
    </div>
  );
}
