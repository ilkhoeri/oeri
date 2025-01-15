import { Highlight, type HighlightProps } from "@/ui/highlight";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Highlight } from "@/ui/highlight";\n\nconst text = "Pass the main string as children to Highlight component and string part that should be highlighted to highlight prop.";\n\nexport function HighlightDemo() {\n  return <Highlight text={text} highlight="highlight" className="text-justify" />;\n}',
  configurator:
    'import { Highlight } from "@/ui/highlight";\n\nconst text = "Pass the main string as children to Highlight component and string part that should be highlighted to highlight prop.";\n\nexport function HighlightDemo() {\n  return (\n    <div>\n      <Highlight{{props}} text={text} className="text-justify" />\n      <Highlight{{props}} className="text-justify">\n        If the main string does not contain the highlighted part, it is left alone. The highlighted part is only the string of characters that have a matching\n        sequence, whitespace is not included.\n      </Highlight>\n      <Highlight{{props}} className="text-justify" styles={styles}>\n        You can change styles of highlighted part if you do not like default styles.\n      </Highlight>\n    </div>\n  );\n}\n\nconst styles = {\n  highlight: {\n    backgroundImage: "linear-gradient(45deg, #fcc419, #0cb2cb, #5c7cfa)",\n    fontWeight: "700",\n    backgroundClip: "text",\n    WebkitTextFillColor: "transparent"\n  } as React.CSSProperties\n};'
};

function Demo() {
  return <Highlight text={text} highlight="highlight" className="text-justify" />;
}

const text = "Pass the main string as children to Highlight component and string part that should be highlighted to highlight prop.";

function ConfiguratorDemo(props: HighlightProps) {
  return (
    <div>
      <Highlight {...props} text={text} className="text-justify" />
      <Highlight {...props} className="text-justify">
        If the main string does not contain the highlighted part, it is left alone. The highlighted part is only the string of characters that have a matching
        sequence, whitespace is not included.
      </Highlight>
      <Highlight {...props} className="text-justify" styles={styles}>
        You can change styles of highlighted part if you do not like default styles.
      </Highlight>
    </div>
  );
}

const styles = {
  highlight: {
    backgroundImage: "linear-gradient(45deg, #fcc419, #0cb2cb, #5c7cfa)",
    fontWeight: "700",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent"
  } as React.CSSProperties
};

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "highlight", type: "string", initialValue: "highlight", libraryValue: null },
    { prop: "color", type: "color", initialValue: "yellow", libraryValue: "yellow" }
  ]
};

export const HighlightDemos = {
  usage,
  configurator
};
