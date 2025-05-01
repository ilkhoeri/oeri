import { CodeDemo, CodeDemoProps } from "./demo-component";
import { ConfiguratorDemo, ConfiguratorDemoProps } from "./demo-config";
import { StylesApiDemo, StylesApiDemoProps } from "./shiki/styles-api-demo";

interface DemoComponent {
  component: React.FC<any>;
}

/** Setelah selesai update, jalankan:
 *
 * `bun run generated:docsdemo` */
export type DataTrees = ({ type: "code" } & DemoComponent & CodeDemoProps) | ({ type: "configurator" } & DemoComponent & ConfiguratorDemoProps) | ({ type: "styles-api" } & DemoComponent & StylesApiDemoProps);

interface DemoProps {
  data: DataTrees;
}

export function DemoSlot({ data }: DemoProps) {
  switch (data.type) {
    case "code":
      return (
        <CodeDemo {...data}>
          <data.component />
        </CodeDemo>
      );
    case "configurator":
      return (
        <ConfiguratorDemo {...data}>
          <data.component />
        </ConfiguratorDemo>
      );
    case "styles-api":
      return (
        <StylesApiDemo {...data}>
          <data.component />
        </StylesApiDemo>
      );
    default:
      return null;
  }
}
