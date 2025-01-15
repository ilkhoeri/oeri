"use client";
import { usePWAInstaller } from "@/hooks/use-pwa-installer";
import { Button } from "@/ui/button";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Svg, SvgProps } from "@/ui/svg";

const codes = {
  usage:
    '"use client";\nimport { usePWAInstaller } from "@/hooks/use-pwa-installer";\nimport { Button } from "@/ui/button";\nimport { Svg, SvgProps } from "@/ui/svg";\n\nfunction PWAIcon(props:SvgProps) {\n  return (\n    <Svg {...props} currentFill="fill" viewBox="0 0 1952.00 734.93" enable-background="new 0 0 1952.00 734.93">\n      <path fill="#3D3D3D" d="M 1436.62,603.304L 1493.01,460.705L 1655.83,460.705L 1578.56,244.39L 1675.2,0.000528336L 1952,734.933L 1747.87,734.933L 1700.57,603.304L 1436.62,603.304 Z " />\n      <path fill="#5A0FC8" d="M 1262.47,734.935L 1558.79,0.00156593L 1362.34,0.0025425L 1159.64,474.933L 1015.5,0.00351906L 864.499,0.00351906L 709.731,474.933L 600.585,258.517L 501.812,562.819L 602.096,734.935L 795.427,734.935L 935.284,309.025L 1068.63,734.935L 1262.47,734.935 Z " />\n      <path fill="#3D3D3D" d="M 186.476,482.643L 307.479,482.643C 344.133,482.643 376.772,478.552 405.396,470.37L 436.689,373.962L 524.148,104.516C 517.484,93.9535 509.876,83.9667 501.324,74.5569C 456.419,24.852 390.719,0.000406265 304.222,0.000406265L -3.8147e-006,0.000406265L -3.8147e-006,734.933L 186.476,734.933L 186.476,482.643 Z M 346.642,169.079C 364.182,186.732 372.951,210.355 372.951,239.95C 372.951,269.772 365.238,293.424 349.813,310.906C 332.903,330.331 301.766,340.043 256.404,340.043L 186.476,340.043L 186.476,142.598L 256.918,142.598C 299.195,142.598 329.103,151.425 346.642,169.079 Z " />\n    </Svg>\n  );\n}\n\nexport function UsePWAInstallerDemo() {\n  const { prompt, installer } = usePWAInstaller();\n\n  return (\n    <Button title="install pwa" disabled={!prompt} onClick={installer} className="h-auto w-auto gap-2 outline">\n      Install <PWAIcon style={{ width: "2rem", marginTop: "-.125rem" }} />\n    </Button>\n  );\n}'
};

function PWAIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill" viewBox="0 0 1952.00 734.93" enableBackground="new 0 0 1952.00 734.93">
      <path
        fill="#3D3D3D"
        d="M 1436.62,603.304L 1493.01,460.705L 1655.83,460.705L 1578.56,244.39L 1675.2,0.000528336L 1952,734.933L 1747.87,734.933L 1700.57,603.304L 1436.62,603.304 Z "
      />
      <path
        fill="#5A0FC8"
        d="M 1262.47,734.935L 1558.79,0.00156593L 1362.34,0.0025425L 1159.64,474.933L 1015.5,0.00351906L 864.499,0.00351906L 709.731,474.933L 600.585,258.517L 501.812,562.819L 602.096,734.935L 795.427,734.935L 935.284,309.025L 1068.63,734.935L 1262.47,734.935 Z "
      />
      <path
        fill="#3D3D3D"
        d="M 186.476,482.643L 307.479,482.643C 344.133,482.643 376.772,478.552 405.396,470.37L 436.689,373.962L 524.148,104.516C 517.484,93.9535 509.876,83.9667 501.324,74.5569C 456.419,24.852 390.719,0.000406265 304.222,0.000406265L -3.8147e-006,0.000406265L -3.8147e-006,734.933L 186.476,734.933L 186.476,482.643 Z M 346.642,169.079C 364.182,186.732 372.951,210.355 372.951,239.95C 372.951,269.772 365.238,293.424 349.813,310.906C 332.903,330.331 301.766,340.043 256.404,340.043L 186.476,340.043L 186.476,142.598L 256.918,142.598C 299.195,142.598 329.103,151.425 346.642,169.079 Z "
      />
    </Svg>
  );
}

function Demo() {
  const { prompt, installer } = usePWAInstaller();

  return (
    <Button title="install pwa" disabled={!prompt} onClick={installer} className="h-auto w-auto gap-2 outline">
      Install <PWAIcon style={{ width: "2rem", marginTop: "-.125rem" }} />
    </Button>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UsePwaInstallerDemos = {
  usage
};
