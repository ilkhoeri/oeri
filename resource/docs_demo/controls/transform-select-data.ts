import { transform } from "@/modules/web/utilities/text-parser";
import { ConfiguratorSelectControlOptions } from "./configurator-select.control";

export interface SelectDataItem {
  label: string;
  value: string;
}
export type SelectData = (string | SelectDataItem)[] | readonly string[];

export function transformSelectData(data: SelectData): SelectDataItem[] {
  return data.map(item => {
    if (typeof item === "string") {
      return { value: item, label: transform.capitalizeFirst(item) };
    }
    return { value: item.value, label: transform.capitalizeFirst(item.label) };
  });
}

export type ExtractSelectValue<T> = T extends readonly (infer U)[] ? (U extends string ? U : U extends SelectDataItem ? U["value"] : never) : never;

type ExtractConfiguratorSelectControl<D extends SelectData = SelectData> = Omit<ConfiguratorSelectControlOptions<D>, "type"> & { type?: "select" };

export function createSelectControl<const D extends SelectData>(config: ExtractConfiguratorSelectControl<D>): ConfiguratorSelectControlOptions<D>;

export function createSelectControl<const D extends SelectData[]>(configArray: {
  [K in keyof D]: ExtractConfiguratorSelectControl<D[K]>;
}): {
  [K in keyof D]: ConfiguratorSelectControlOptions<D[K]>;
};

export function createSelectControl(arg: any): any {
  if (Array.isArray(arg)) {
    return arg.map(item => ({ ...item, type: "select" }));
  }
  return { ...arg, type: "select" };
}
