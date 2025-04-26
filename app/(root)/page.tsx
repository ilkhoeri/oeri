import { PageHome } from "./components-home";
import { cn } from "cretex";

import style from "@/source/styles/.module.css";

// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
// export const runtime = "nodejs";

export default function Home() {
  return (
    <section data-controls="home" className={cn(style.main_home, "[--hex:#f2f2f2] dark:[--hex:#171717]")}>
      <PageHome />
    </section>
  );
}
