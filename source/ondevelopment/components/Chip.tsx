"use client";
import * as React from "react";

export interface ChipProps extends React.ComponentProps<"span"> {
  title?: string;
}
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>((_props, ref) => {
  const { ...props } = _props;
  return <span {...props} ref={ref} />;
});
Chip.displayName = "Chip";
