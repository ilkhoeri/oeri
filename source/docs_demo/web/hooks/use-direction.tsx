"use client"
import { useApp as useAppContext } from "@/config/app-context";
import { TextDirectionIcon } from "@/icons/*";
import { Button } from "@/ui/button";

export function Demo() {
  const { toggleDirection, dir } = useAppContext();
  return (
    <Button size="icon" variant="primitive" onClick={toggleDirection} className="m-auto">
      <TextDirectionIcon dir={dir} size="md" />
    </Button>
  );
}