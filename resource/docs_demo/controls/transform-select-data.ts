import { transform } from "@/utility/text-parser";

export interface SelectDataItem {
  label: string;
  value: string;
}
export type SelectData = (string | SelectDataItem)[];

export function transformSelectData(data: SelectData): SelectDataItem[] {
  return data.map(item => {
    if (typeof item === "string") {
      return { label: transform("capitalize-first", item), value: item };
    }

    return { value: item.value, label: transform("capitalize-first", item.label) };
  });
}
