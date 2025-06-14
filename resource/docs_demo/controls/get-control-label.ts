import { transform } from "@/modules/web/utilities/text-parser";

export function getControlLabel(label: string) {
  return transform.capitalizeFirst(label.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase());
}
