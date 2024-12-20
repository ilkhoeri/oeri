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

const SCALE_VAR = "var(--scale, 1)";

function scaleRem(remValue: string) {
  if (remValue === "0rem") {
    return "0rem";
  }

  return `calc(${remValue} * ${SCALE_VAR})`;
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

      if (
        value.startsWith("calc(") ||
        value.startsWith("clamp(") ||
        value.includes("rgba(")
      ) {
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
