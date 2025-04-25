"use client";

import React from "react";
import Link from "next/link";
import { cvx, merge, rem } from "cretex";
import { TypingWords } from "@/ui/typing-words";
import { Transform } from "@/source/ondevelopment";
import { sanitizedWord } from "@/utility/text-parser";
import { useNextTheme } from "@/config/themes";
import { Svg } from "@/ui/svg";
import { BookOpenIcon, BrandGithubFillIcon, ArrowsSquareIcon } from "@/icons/*";

import style from "@/source/styles/.module.css";

const TYPING_DEFAULT = ["a team", "an idea", "a solution", "a spirit"];

const classes = cvx({
  variants: {
    selector: {
      header: "relative flex h-[calc(100dvh-var(--navbar))] w-full max-w-7xl flex-col items-center justify-avenly px-6 [--sz-circle:clamp(3rem,1rem+5dvw,4.5rem)] [--sz-rx:2.25rem] [--sz-ry:7.5rem] [transition:height_185ms_ease]",
      wrapTop: "relative z-9 mx-auto flex size-full animate-[fade-in_0.6s_ease-in_forwards] flex-col items-center justify-center gap-16 text-left",
      h1: "relative grid grid-flow-row whitespace-nowrap font-extrabold leading-[1.35] text-color [--bg:40%_40%/200%_no-repeat_text_linear-gradient(0deg,hsl(var(--color)),rgb(64_64_64))] [--sz:clamp(22px,22px+5vw,5rem)] [--t-sh:-2px_-1px_15px_rgb(255_30_86/1%),2px_1px_15px_rgb(0_150_255/1%)] [font-size:--sz]",
      lineTop: "max-lg:top-[70%] max-lg:right-[25%] max-lg:[rotate:90deg] max-lg:[scale:1_-1] top-[10%] right-[-3rem] absolute w-[435px] h-max",
      aura1: "absolute h-full w-full opacity-[0.65] before:left-[-2%] before:top-[-10%] after:bottom-[5%] after:right-[-5%] max-w-full",
      aura2: "absolute h-full w-full opacity-[0.65] before:bottom-[-10%] before:left-[-2%] after:right-[-5%] after:top-[5%]",
      featuresWrap: "relative mb-20 w-full min-w-full space-y-40",
      links:
        "relative flex h-[clamp(2.25rem,1.25rem+2dvw,2.75rem)] w-[clamp(10.375rem,1.25rem+2dvw,100%)] items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-offset-4 before:ring-offset-background before:transition before:duration-300 before:content-[''] hover:before:scale-105 active:duration-75 active:before:scale-95",
      typingWords: "z-9 ml-[12dvw] h-[--sz] select-none bg-clip-text leading-none [--cursor-color:#6e5494] [--cursor-h:calc(var(--sz))] [background:--bg] [display:flex] [text-shadow:--t-sh]",
      svg: "z-9 size-full overflow-visible stroke-muted-foreground"
    }
  }
});

export function PageHome() {
  return (
    <>
      <section id="header-section" className={merge(classes({ selector: "header" }), style.header_home)}>
        <i aria-hidden="true" className={merge(classes({ selector: "aura1" }), style.aura)} />
        <article className={classes({ selector: "wrapTop" })}>
          <Transform el="h1" hold={0} className={classes({ selector: "h1" })}>
            <span className="z-9 select-none bg-clip-text [background:--bg] [text-shadow:--t-sh]">bring</span>
            <TypingWords el="span" withCursor duration={{ break: 2500 }} placeholders={TYPING_DEFAULT} className={classes({ selector: "typingWords" })} />
            <span className="z-9 ml-[24dvw] select-none bg-clip-text [background:--bg] [text-shadow:--t-sh]">together</span>
          </Transform>

          <Transform el="p" hold={0} transition={{ delay: "300ms, 300ms" }} transform={{ before: "translateY(9rem)", after: "translateY(0)", origin: "bottom center" }} className="relative z-[+1] flex flex-col items-center justify-center text-center text-xs font-normal text-color md:text-sm xl:text-base">
            <span>Construct and develop your web and mobile applications using straightforward dependencies</span>
          </Transform>

          <Transform el="div" hold={0} className="relative mx-auto -mt-4 flex w-full flex-col items-center justify-center gap-8 sm:flex-row" transform={{ before: "translateY(9rem)", after: "translateY(0)", origin: "bottom center" }}>
            {links.map((i, index) => (
              <Link key={index} href={i.url} target={i.target} data-link={sanitizedWord(i.title)} className={merge(classes({ selector: "links" }), [{ "[&_svg]:fill-current before:bg-[#6e5494] before:ring-[#6e5494]": i.title === "Repo" }, { "before:bg-color before:ring-color": i.title === "Docs" }])}>
                <span className="relative z-[+1] flex-row gap-2 text-base font-semibold text-background centered">
                  <i.icon size={20} /> {i.title}
                </span>
              </Link>
            ))}
          </Transform>
        </article>

        <ThemesToggle />

        <Transform el="s" data-linetop="" className={classes({ selector: "lineTop" })} transition={{ delay: "600ms, 600ms" }} transform={{ before: "scale(0)", after: "scale(1)", origin: "right center" }}>
          <Svg viewBox="0 0 436 140" size="unset" className={classes({ selector: "svg" })}>
            <circle cx="426.76" cy="9.5" r="7.5" fill="hsl(var(--background))" />
            <circle cx="9.24" cy="130.5" r="7.5" fill="hsl(var(--background))" />
            <path data-line="" d="m19.66,130.5h92.57c33.14,0,64-26.86,64-60v-1c0-33.14,29.86-60,63-60h180.56" fill="none" strokeDasharray="0 0 5 5" />
          </Svg>
        </Transform>

        <Transform el="s" className={style.line_circle} transition={{ delay: "600ms, 600ms" }} transform={{ before: "scale(0)", after: "scale(1)", origin: "left center" }}>
          <Svg viewBox="0 0 218 179" size="unset" stroke={3} className={classes({ selector: "svg" })}>
            <circle cx="9" cy="9.04" r="7.5" fill="hsl(var(--background))" />
            <path data-line="" d="m198.54,169.04H69c-33.14,0-60-26.86-60-60V16.02" fill="none" strokeDasharray="0 0 6.96 6.96" />
            <path d="m203,177.46c-.26,0-.52-.07-.75-.2-.46-.27-.75-.76-.75-1.3v-13.86c0-.54.29-1.03.75-1.3.23-.13.49-.2.75-.2s.52.07.75.2l12,6.93c.46.27.75.76.75,1.3s-.29,1.03-.75,1.3l-12,6.93c-.23.13-.49.2-.75.2Z" fill="hsl(var(--background))" />
          </Svg>
        </Transform>
      </section>

      <section id="features" className={merge(classes({ selector: "featuresWrap" }))}>
        <i aria-hidden="true" className={merge(classes({ selector: "aura2" }), style.aura)} />
        <div className="relative z-9 mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">
            <svg width="64" height="64" className="size-10 text-color" onContextMenu={e => e.preventDefault()}>
              <use href="/images/icons.svg#stars" />
            </svg>
            <h2 className="mb-2 mt-4 font-bold text-color text-h6">Developer of web and mobile applications based on the React.js library</h2>
            <p className="text-xs text-muted-foreground md:text-sm 2xl:text-base">Crafting and share relevant functionals, styles, and hooks recommendations for react.js applications.</p>
          </div>
          <FeaturesList features={features} />
        </div>
      </section>
    </>
  );
}

export function ThemesToggle({ size }: { size?: number | string }) {
  const { theme, memoizedTheme } = useNextTheme();
  const isDark = theme === "dark";
  return (
    <Transform className={`${style.switch_wrap} [--ring:white] dark:[--ring:linear-gradient(-45deg,#f8acff,#696eff)]`} transition={{ delay: "300ms, 300ms" }} transform={{ before: "translateX(7rem)", after: "translateX(0)", origin: "right" }} style={{ "--sz-circle": size ? rem(size) : undefined }}>
      <input checked={isDark} onChange={() => memoizedTheme(isDark || theme === "system" ? "light" : "dark")} className={style.switch_input} id="themes-toggle" name="themes-toggle" aria-label="toggle" type="checkbox" hidden />
      <label className={`${style.switch_label} [--shadow:--switch-shadow-light] dark:[--shadow:--switch-shadow-dark] dark:[--switch-ml:--switch-ml-dark]`} htmlFor="themes-toggle" />
      <span className={style.switch_marbles} />
    </Transform>
  );
}

function FeaturesList({ features }: { features: { title?: string; slug?: string; image?: string; notes?: string }[] | null }) {
  if (!features?.length) {
    return null;
  }
  return (
    <div className="relative mb-12 mt-16 grid overflow-hidden rounded-xl border bg-background text-muted-foreground sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      {features.map((i, index) => (
        <div key={index} className="group relative cursor-default transition">
          <div className="relative space-y-4 px-6 py-8">
            <svg width="64" height="64" className="size-10 text-color" onContextMenu={e => e.preventDefault()}>
              <use href={i.image} />
            </svg>

            <div className="space-y-1">
              {i?.title && <h5 className="font-semibold text-color transition text-h6">{i.title}</h5>}
              {i?.notes && <p className="text-xs text-muted-foreground md:text-sm 2xl:text-base">{i.notes}</p>}
            </div>
            {i?.slug && (
              <Link href={i.slug} className="!sr-only !hidden items-center justify-start gap-4 rounded-sm group-hover:text-color">
                <span className="text-sm">Read</span>
                <ArrowsSquareIcon square={false} arrow="right" className="size-6 -translate-x-4 flex-row-reverse text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const links = [
  {
    title: "Docs",
    target: "_self",
    icon: BookOpenIcon,
    url: "/docs"
  },
  {
    title: "Repo",
    target: "_blank",
    icon: BrandGithubFillIcon,
    url: "https://github.com/ilkhoeri/modules"
  }
];

const features = [
  {
    title: "Snappy",
    slug: "#",
    image: "/images/icons.svg#clock-alt-2",
    notes: "The effectiveness of time in building and adjusting the needs during development."
  },
  {
    title: "Scalable",
    slug: "#",
    image: "/images/icons.svg#draw-compass",
    notes: "Consider the effectiveness of code structure to maintain component flexibility."
  },
  {
    title: "Enchant",
    slug: "#",
    image: "/images/icons.svg#forest",
    notes: "The structure of rich components is modeled effectively for rapid comprehension."
  },
  {
    title: "Valuable",
    slug: "#",
    image: "/images/icons.svg#pantone-2",
    notes: "Editable content according to the requirements of the style component structure."
  }
];
