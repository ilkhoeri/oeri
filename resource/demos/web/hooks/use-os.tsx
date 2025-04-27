"use client";
import { useOS } from "@/hooks/use-os";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useOS } from "@/hooks/use-os";\n\nexport function UseOSDemo() {\n  const model = useOS();\n  return (\n    <table>\n      <tbody>\n        <tr>\n          <td>Browser</td>\n          <td>\n            <p suppressHydrationWarning className=\"ml-4 flex flex-row items-center gap-2\">\n              {model.browser?.icon && <model.browser.icon size={32} />}\n              <span>{String(model.browser?.name)}</span>\n            </p>\n          </td>\n        </tr>\n        <tr>\n          <td colSpan={2}>\n            <hr className=\"my-4 border-t\" />\n          </td>\n        </tr>\n        <tr>\n          <td>Model</td>\n          <td>\n            <p suppressHydrationWarning className=\"ml-4 flex flex-row items-center gap-2\">\n              <model.device.icon size={32} />\n              <span>{String(model.device.name)}</span>\n            </p>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  );\n}'
};

function Demo() {
  const model = useOS();
  return (
    <table>
      <tbody>
        <tr>
          <td>Browser</td>
          <td>
            <p suppressHydrationWarning className="ml-4 flex flex-row items-center gap-2">
              {model.browser?.icon && <model.browser.icon size={32} />}
              <span>{String(model.browser?.name)}</span>
            </p>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <hr className="my-4 border-t" />
          </td>
        </tr>
        <tr>
          <td>Device</td>
          <td>
            <p suppressHydrationWarning className="ml-4 flex flex-row items-center gap-2">
              <model.device.icon size={32} />
              <span>{String(model.device.name)}</span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseOsDemos = {
  usage
};
