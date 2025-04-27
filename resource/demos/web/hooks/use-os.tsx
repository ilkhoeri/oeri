"use client";
import { useOS } from "@/hooks/use-os";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useOS } from "@/hooks/use-os";\n\nexport function UseOSDemo() {\n  const withOutModel = useOS({ getModel: false, getValueInEffect: \"Detecting\" });\n  const withModel = useOS();\n  return (\n    <table>\n      <tbody>\n        <tr>\n          <td>WithOut Model</td>\n          <td>\n            <p suppressHydrationWarning className=\"ml-4 flex flex-row items-center gap-2\">\n              <withOutModel.icon size={32} />\n              <span>{withOutModel.name}</span>\n            </p>\n          </td>\n        </tr>\n        <tr>\n          <td colSpan={2}>\n            <hr className=\"my-4 border-t\" />\n          </td>\n        </tr>\n        <tr>\n          <td>With Model</td>\n          <td>\n            <p suppressHydrationWarning className=\"ml-4 flex flex-row items-center gap-2\">\n              <withModel.icon size={32} />\n              <span>{withModel.name}</span>\n            </p>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  );\n}'
};

function Demo() {
  const withOutModel = useOS({ getModel: false, getValueInEffect: "Detecting" });
  const withModel = useOS();
  return (
    <table>
      <tbody>
        <tr>
          <td>WithOut Model</td>
          <td>
            <p suppressHydrationWarning className="ml-4 flex flex-row items-center gap-2">
              <withOutModel.icon size={32} />
              <span>{withOutModel.name}</span>
            </p>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <hr className="my-4 border-t" />
          </td>
        </tr>
        <tr>
          <td>With Model</td>
          <td>
            <p suppressHydrationWarning className="ml-4 flex flex-row items-center gap-2">
              <withModel.icon size={32} />
              <span>{withModel.name}</span>
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
