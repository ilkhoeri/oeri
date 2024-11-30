import { AsideLeft } from "@/source/assets/nav-aside-left";

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AsideLeft classNames={{ aside: "md:!hidden md:!sr-only" }} />
      {children}
    </>
  );
}
