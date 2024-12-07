"use client";
import { useState } from "react";
import { ColorPicker, Input } from "@/modules/components/web";

export function Demo() {
  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker withPicker format="rgba" value={value} onChange={onChange} swatches={[ "#ffffff", "#000000", "#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14" ]}
      />

      <Input value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
