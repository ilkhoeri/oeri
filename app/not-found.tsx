import Link from "next/link";
import { BrandOeriIcon } from "@/modules/icons";

export default async function NotFound() {
  return (
    <article className="relative m-0 flex h-dvh w-full max-w-full flex-wrap items-start justify-center overflow-hidden p-4 pt-20 after:absolute after:bottom-0 after:h-[262px] after:w-full after:bg-gradient-to-t after:from-background after:content-['']">
      <h1
        role="presentation"
        className="pointer-events-none absolute left-0 z-[-1] flex h-full w-full min-w-max flex-col flex-nowrap text-left text-[clamp(52px,47px_+_25vw,30rem)] font-[900] leading-[0.727] tracking-[-26px] text-[#ebebeb] dark:text-[#2e2e2e]">
        <span>Not -</span>
        <span>Found</span>
      </h1>

      <div className="min768:pt-[7rem] relative z-10 m-0 flex-col pt-16 text-center leading-normal text-[#909090] centered dark:text-[#c1c2c5]">
        <Link
          href="/"
          tabIndex={-1}
          aria-label="back-home"
          className="sticky top-14 rounded-lg px-4 py-1 hover:text-color focus-visible:border-0 focus-visible:ring-0">
          <BrandOeriIcon size={146} />
        </Link>
        <h1 className="min681:text-[38px] text-[32px] font-[900] text-[inherit]">
          Could not find requested resource
        </h1>
        <p className="m-auto mb-[24px] mt-6 max-w-[540px] text-center text-[18px] leading-normal text-[#909296]">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </p>
      </div>
    </article>
  );
}
