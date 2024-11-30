import Link from "next/link";
import { ThemeToggle } from "./theme";

import Element from "@/source/ui/element";
import { NavLinkItem } from "@/source/ui/link-nav";
import { appRoutes } from "@/source/routes";
import { BrandOeriIcon } from "@/modules/icons";
import { cvx } from "str-merge";

import globalStyle from "../styles/styles";

const Styles = cvx({
  variants: {
    as: {
      footer:
        "mx-auto flex flex-col w-full relative text-sm bg-background max-w-screen-3xl",
      section: "px-6 md:px-8 lg:px-10 xl:px-10",
      list: "gap-x-6 grid sm:grid-cols-2 md:grid-flow-col md:grid-cols-4 md:grid-rows-5 lg:grid-cols-5",
      listitem: "content-center !list-none flex items-center",
      link: "line-clamp-1 text-xs md:text-sm 2xl:text-base text-muted-foreground hover:text-color transition ease-in-out duration-150 rounded-md py-1 underline-hover data-[path=active]:font-semibold data-[path=active]:text-constructive [&_mark]:data-[mark=true]:ml-[10px]"
    },
    section: {
      top: "border-t border-t-muted pt-4 w-full grid items-start grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 text-muted-foreground",
      bottom:
        "py-2 gap-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm font-geist-mono"
    }
  }
});

export async function FootNav() {
  // const pages = await getParams();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={Styles({ as: "footer" })}>
      <Element
        el="section"
        className={Styles({ as: "section", section: "top" })}>
        <div className="col-span-1 w-max lg:col-span-2">
          <Link
            href="/"
            className="flex flex-initial items-center rounded-lg font-semibold text-muted-foreground hover:text-color"
            aria-label="HOME">
            <BrandOeriIcon className="mr-2 flex h-[36px] w-[36px] flex-none items-center justify-center rounded-xl border bg-background p-1" />
          </Link>
        </div>

        <Element el="nav" className="col-span-1 lg:col-span-10">
          <ul role="list" className={Styles({ as: "list" })}>
            {appRoutes["footRoutes"].map((i, index) => (
              <li
                key={index}
                role="listitem"
                className={Styles({ as: "listitem" })}>
                <NavLinkItem
                  href={i.href}
                  title={i.title}
                  className={Styles({ as: "link" })}
                />
              </li>
            ))}
          </ul>
        </Element>
      </Element>

      <Element
        el="section"
        className="relative flex w-full flex-row flex-nowrap justify-end gap-px border-b border-b-muted px-4 pb-4 pt-2 text-muted-foreground">
        <ThemeToggle
          unstyled={{ wrapper: true, buttons: true }}
          classNames={{
            wrapper: globalStyle(
              { toggle: "group" },
              "p-[3px] border rounded-full w-max"
            ),
            buttons: globalStyle(
              { toggle: "item", size: "icon-xs" },
              "rounded-full hover:bg-transparent data-[state=active]:bg-muted data-[state=active]:text-color"
            )
          }}
        />
      </Element>

      <Element
        el="section"
        className={Styles({ as: "section", section: "bottom" })}>
        <div className="flex flex-col items-center gap-x-4 sm:flex-row">
          <p>&copy; {currentYear} oeri rights MIT</p>
          <hr className="hidden h-4 w-[1px] border-l border-l-neutral-400 sm:inline-block" />
          <p>Designed in Earth-616</p>
        </div>

        <div className="group flex cursor-default items-center md:ml-auto">
          Built by
          <a
            tabIndex={-1}
            rel="noopener noreferrer nofollow"
            target="_blank"
            href="https://github.com/ilkhoeri"
            aria-label="Vercel.com Link"
            className="mx-2 cursor-pointer gap-2 rounded-lg transition-colors duration-200 hover:text-color">
            <BrandOeriIcon
              size={28}
              aria-label="oeri Logo"
              className="duration-200 ease-linear group-hover:scale-110"
            />{" "}
            oeri
          </a>
        </div>
      </Element>
    </footer>
  );
}
