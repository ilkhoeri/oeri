import { Highlight } from "@/ui/highlight";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { ...first } = __docs_demo.useDemo({ Str: "styles, of, main" });
  const { str: color, ...second } = __docs_demo.useDemo({ Str: "#fcc419" });
  const highlight = first.str.split(/\s*,\s*/).map(item => item.trim()); // ignore
  const text = "Pass the main string as children to Highlight component and string part that should be highlighted to highlight prop.";

  return (
    <>
    <__docs_demo.area>
    <Highlight text={text} highlight={highlight} color={color} className="text-justify" />
    <Highlight highlight={highlight} color={color} className="text-justify">
      If the main string does not contain the highlighted part, it is left alone. The highlighted part is only the string of characters that have a matching sequence, whitespace is not included.
    </Highlight>
    <Highlight
      highlight={highlight}
      className="text-justify"
      styles={{ highlight: {
        backgroundImage: "linear-gradient(45deg, #fcc419, #0cb2cb, #5c7cfa)",
        fontWeight: "700",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}}
    >
      You can change styles of highlighted part if you do not like default styles.
    </Highlight>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setText str={first.str} setStr={first.setStr} />
    <__docs_demo.setColor str={color} {...second} />
    </__docs_demo.controls>
    </>
  );
}
