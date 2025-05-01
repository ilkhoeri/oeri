import { PageHome } from "./components-home";

import style from "@/source/styles/.module.css";

// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
// export const runtime = "nodejs";

export default function Home() {
  return (
    <section data-controls="home" className={style.main_home}>
      <PageHome />
    </section>
  );
}
