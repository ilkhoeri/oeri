export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined | (() => ClassValue);
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export function cnx(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  inputs.forEach(input => {
    if (!input) return;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      classes.push(cnx(...input));
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    } else if (typeof input === "function") {
      classes.push(cnx(input()));
    }
  });
  return classes.join(" ");
}

// cvx
type ExcludeType = "defaultVariants" | "";
type ExcludeUndefined<T> = T extends undefined ? never : T;

export type KeysMap = { [key: string]: { [key: string]: string } };
export type Variant<T extends KeysMap> = { [K in keyof T]?: keyof T[K] };
export type KeysVariant<T extends KeysMap> = { assign?: string; variants: T; defaultVariants?: Variant<T> };
export type VariantsType<T extends (...keys: any) => any> = Omit<ExcludeUndefined<Parameters<T>[0]>, ExcludeType>;
export type InferTypes<T> = T extends (...args: any[]) => infer R ? R : never;

export function cvx<T extends KeysMap>(keys: KeysVariant<T>) {
  return (variant: Variant<T> = {}) => {
    const mergedVariant = { ...keys.defaultVariants, ...variant } as { [K in keyof T]?: keyof T[K] };
    const variantsValue = Object.keys(keys.variants)
      .map(key => {
        const variantKey = mergedVariant[key as keyof T] || keys.defaultVariants?.[key as keyof T];
        return variantKey ? keys.variants[key as keyof T][variantKey as keyof T[keyof T]] : undefined;
      })
      .filter(Boolean)
      .join(" ");
    return keys.assign ? [keys.assign, variantsValue].join(" ") : variantsValue;
  };
}

// ocx
// type StyleValue = StyleObject | StyleArray | (() => StyleValue) | undefined | null;
// type StyleObject = Record<string, any>;
// type StyleArray = StyleValue[];

// export function ocx(...inputs: StyleValue[]): Record<string, any> {
//   const styles: Record<string, any> = {};
//   inputs.forEach(input => {
//     if (!input) return;
//     if (typeof input === "function") {
//       Object.assign(styles, ocx(input()));
//     } else if (Array.isArray(input)) {
//       Object.assign(styles, ocx(...input));
//     } else if (typeof input === "object") {
//       Object.assign(styles, input);
//     }
//   });
//   return styles;
// }

/** */
// export type ocxMap = Record<string, any>;
// export type ocxObject<T> = T & ocxMap;
// type ocxValue = ocxMap | Array<ocxValue> | string | number | null | boolean | undefined | (() => ocxValue);
// export type ocxValues<T> = T | ocxValue;

// export function ocx<T extends ocxMap>(...inputs: ocxValues<T>[]): ocxObject<T> {
//   const styles: ocxObject<T> = {} as ocxObject<T>;
//   inputs.forEach(input => {
//     if (!input) return;
//     if (typeof input === "function") {
//       Object.assign(styles, ocx(input()));
//     } else if (Array.isArray(input)) {
//       Object.assign(styles, ocx(...input));
//     } else if (typeof input === "object") {
//       Object.assign(styles, input);
//     }
//   });
//   return styles;
// }
/** */

export type ocxMap = Record<string, any>;
export type ocxKey<T> = T & ocxMap;
export type ocxValue = ocxMap | ocxMap[] | ocxValue[] | string | number | null | boolean | undefined | (() => ocxValue);
export type ocxValues<T> = T | ocxValue | ocxKey<T>;

export function ocx<T extends ocxMap>(...inputs: ocxValues<T>[]): ocxKey<T> {
  return inputs.reduce<ocxKey<T>>((acc, input) => {
    if (!input) return acc;
    if (typeof input === "function") return { ...acc, ...ocx(input()) };
    if (Array.isArray(input)) return { ...acc, ...ocx(...input) };
    if (typeof input === "object") return { ...acc, ...input };
    return acc;
  }, {} as ocxKey<T>);
}

// unit converter
export const rem = createConverter("rem", { shouldScale: true });
export const em = createConverter("em");

export function px(value: unknown) {
  const transformedValue = getTransformedScaledValue(value);
  if (typeof transformedValue === "number") {
    return transformedValue;
  }
  if (typeof transformedValue === "string") {
    if (transformedValue.includes("calc") || transformedValue.includes("var")) {
      return transformedValue;
    }
    if (transformedValue.includes("px")) {
      return Number(transformedValue.replace("px", ""));
    }
    if (transformedValue.includes("rem")) {
      return Number(transformedValue.replace("rem", "")) * 16;
    }
    if (transformedValue.includes("em")) {
      return Number(transformedValue.replace("em", "")) * 16;
    }
    return Number(transformedValue);
  }
  return NaN;
}

function scaleRem(remValue: string) {
  if (remValue === "0rem") {
    return "0rem";
  }
  return remValue;
}

function createConverter(units: string, { shouldScale = false } = {}) {
  function converter(value: unknown): string {
    if (value === 0 || value === "0") {
      return `0${units}`;
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === "string") {
      // Number("") === 0 so exit early
      if (value === "") {
        return value;
      }
      if (value.startsWith("calc(") || value.startsWith("clamp(") || value.includes("rgba(")) {
        return value;
      }
      if (value.includes(",")) {
        return value
          .split(",")
          .map(val => converter(val))
          .join(",");
      }
      if (value.includes(" ")) {
        return value
          .split(" ")
          .map(val => converter(val))
          .join(" ");
      }
      if (value.includes(units)) {
        return shouldScale ? scaleRem(value) : value;
      }
      const replaced = value.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value as string;
  }
  return converter;
}

function getTransformedScaledValue(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }
  return value
    .match(/^calc\((.*?)\)$/)?.[1]
    .split("*")[0]
    .trim();
}
