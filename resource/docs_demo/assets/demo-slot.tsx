import {  CodeDemoProps } from "./demo-component";
import {  ConfiguratorDemoProps } from "./demo-config";
import {  StylesApiDemoProps } from "./shiki/styles-api-demo";

interface DemoComponent {
  component: React.FC<any>;
}

export type DataTrees =
  | ({ type: "code" } & DemoComponent & CodeDemoProps)
  | ({ type: "configurator" } & DemoComponent & ConfiguratorDemoProps)
  | ({ type: "styles-api" } & DemoComponent & StylesApiDemoProps);

interface DemoProps {
  data: DataTrees;
}

export function DemoSlot({ data: _data }: DemoProps) {
  return <></>
  // switch (data.type) {
  //   case "code":
  //     return (
  //       <CodeDemo {...data}>
  //         <data.component />
  //       </CodeDemo>
  //     );
  //   case "configurator":
  //     return (
  //       <ConfiguratorDemo {...data}>
  //         <data.component />
  //       </ConfiguratorDemo>
  //     );
  //   case "styles-api":
  //     return (
  //       <StylesApiDemo {...data}>
  //         <data.component />
  //       </StylesApiDemo>
  //     );
  //   default:
  //     return null;
  // }
}
