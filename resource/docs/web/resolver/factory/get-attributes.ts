// Function to convert type to JSON-like string
export function typeToJson<T extends object>(example: T): string {
  const typeRepresentation = JSON.stringify(
    Object.keys(example).reduce(
      (acc, key) => {
        acc[key] = typeof (example as any)[key];
        return acc;
      },
      {} as Record<string, string>
    ),
    null,
    2
  );

  return typeRepresentation;
}

export type DataAttributes = Record<string, any>;
/**
 ```tsx
 // usage
  <div
    {...createDataAttr({
      "data-with-table-border": withTableBorder,
      "data-with-child": withChild,
      "data-hover": highlightOnHover
    })}
  />
 ```
 */
type Attributes = { [key: string]: boolean | string | undefined };
export function createDataAttr(attributes: Attributes): DataAttributes {
  return Object.fromEntries(
    Object.entries(attributes)
      .filter(([, value]) => value) // Only take keys with truthy values
      .map(([key, value]) => [key, value ? "true" : undefined]) // Change the value to "true" if it is truthy
  );
}
