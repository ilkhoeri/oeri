import { PageHome } from "./components-home";
import Element from "@/source/ui/element";
import { cn } from "str-merge";

import style from "@/source/styles/.module.css";

// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
// export const runtime = "nodejs";

export default function Home() {
  return (
    <Element
      el="main"
      className={cn(style.main_home, "[--hex:#f2f2f2] dark:[--hex:#171717]")}>
      <PageHome />
    </Element>
  );
}
