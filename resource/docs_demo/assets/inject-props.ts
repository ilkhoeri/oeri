/**
function isMultiLine(code: string) {
  const placeholderLine = code.split("\n").find(line => line.includes("{{props}}"));
  return placeholderLine && placeholderLine.trim().startsWith("{{props}}");
}

export function injectProps<T>(props: T, code: string) {
  const propStrings: string[] = [];
  const multiline = isMultiLine(code);
  //@ts-ignore
  const replacedChildrenCode = code.replace("{{children}}", props.children || "");
  //@ts-ignore
  for (const [key, value] of Object.entries(props)) {
    if (key !== "children") {
      if (typeof value === "string") {
        propStrings.push(`${key}="${value}"`);
      } else if (typeof value === "number") {
        propStrings.push(`${key}={${value}}`);
      } else if (typeof value === "boolean") {
        if (value) {
          propStrings.push(key);
        } else {
          propStrings.push(`${key}={false}`);
        }
      }
    }
  }

  if (!multiline) {
    const joined = propStrings.join(" ");
    return joined.length > 0 ? replacedChildrenCode.replace("{{props}}", ` ${joined}`) : replacedChildrenCode.replace("{{props}}", "");
  }

  const placeholderRegex = /^(\s*){{props}}(\s*)$/gm;

  const result = replacedChildrenCode.replace(placeholderRegex, (_, before, after) => {
    const propsWithWhitespace = propStrings.map((propString, index) => `${before}${propString}${index !== propStrings.length - 1 ? "\n" : ""}`).join("");
    return `${propsWithWhitespace}${after}`;
  });

  return result.trim().replace("\n\n", "\n");
}
 */
function isMultiLine(code: string) {
  const placeholderLine = code.split("\n").find(line => line.includes("{{props}}"));
  return placeholderLine && placeholderLine.trim().startsWith("{{props}}");
}

export function injectProps<T>(props: T, code: string) {
  const propStrings: string[] = [];
  const multiline = isMultiLine(code);

  //@ts-ignore
  const replacedChildrenCode = code.replace(/{{children}}/g, props?.children ?? "");

  //@ts-ignore
  for (const [key, value] of Object.entries(props)) {
    if (key !== "children") {
      if (typeof value === "string") {
        propStrings.push(`${key}="${value}"`);
      } else if (typeof value === "number") {
        propStrings.push(`${key}={${value}}`);
      } else if (typeof value === "boolean") {
        if (value) {
          propStrings.push(key);
        } else {
          propStrings.push(`${key}={false}`);
        }
      }
    }
  }

  if (!multiline) {
    const joined = propStrings.join(" ");
    return joined.length > 0 ? replacedChildrenCode.replace(/{{props}}/g, ` ${joined}`) : replacedChildrenCode.replace(/{{props}}/g, "");
  }

  const placeholderRegex = /^(\s*){{props}}(\s*)$/gm;

  const result = replacedChildrenCode.replace(placeholderRegex, (_, before, after) => {
    // Jika multiline, sisipkan props dengan indentasi yang benar
    const propsWithWhitespace = propStrings.map((propString, index) => `${before}${propString}${index !== propStrings.length - 1 ? "\n" : ""}`).join("");

    // Gabungkan properti dengan indentasi dan kembali setelah placeholder
    return `${propsWithWhitespace}${after}`;
  });

  // Pastikan ada tidak ada baris kosong ganda setelah penyisipan
  return result.trim().replace(/\n{2}/g, "\n");
  // return result.trim().replace(/\n\n/g, "\n");
}
