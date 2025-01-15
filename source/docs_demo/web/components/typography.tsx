import { Typography } from "@/ui/typography"
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: prose, ...props } = __docs_demo.useDemo({ Str: "h1" });
  return (
    <__docs_demo>
    <__docs_demo.area>
      {/* @ts-ignore */}
    <Typography prose={prose}>
      The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
    </Typography>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="prose" values={["code", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "p", "small", "large", "lead", "muted"]} str={prose} setStr={props.setStr}/>
    </__docs_demo.controls>
    </__docs_demo>
  );
}