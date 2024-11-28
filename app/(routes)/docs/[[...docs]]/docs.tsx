import React from "react";
import Link from "next/link";
import { appRoutes } from "@/source/routes";
import { InstallCommand } from "@/source/assets/install-command";
import { Svg, TypescriptIcon } from "@/resource/docs/icons";
import { sanitizedToParams } from "@/resource/docs/ondevelopment/utils";
import { Comp, Title } from "@/source/ui/components";

import globalStyle from "@/source/styles/styles";

export function Docs() {
  return (
    <article className="relative mx-auto w-full">
      <Title el="h1" className="mt-0 border-b-0 pb-0">
        Getting Started
      </Title>
      <Comp el="p" className="mt-2 text-color">
        Create your project and compactness the required dependencies.
      </Comp>

      <QuickInstallation />
      <FrameworksCard />
      <TypingNotes />
    </article>
  );
}

function Links({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} target="_blank" className="links">
      {title}
    </Link>
  );
}

function QuickInstallation() {
  return (
    <>
      <Title el="h2" id="installation" className="!leading-none">
        <StromIcon />
        Quick Installation
      </Title>

      <Comp el="p">
        You can use npx CLI to install the React library framework. The npx
        ships with npm.
      </Comp>
      <Comp el="p" color="default">
        This lets you install packages and run commands in one step. You can use
        the following command to start creating a new project.
      </Comp>

      <InstallCommand />
      <div className="relative isolate my-8 flex flex-row items-center rounded-xl bg-background-box py-6 pl-12 pr-4 [unicode-bidi:isolate] before:absolute before:left-6 before:z-[10] before:h-4/5 before:w-1 before:bg-[#202425] before:content-['']">
        <Comp el="p">
          <span className="font-semibold">Note:</span> npx requires npm version
          5.2 or later. If you’ve installed the latest versions of Node and npm,
          you should also have npx. Otherwise, you should upgrade Node and/or
          npm.
        </Comp>
      </div>
      <Comp el="p" className="mdx_customizer">
        Once the installation completes, you can add some tailwindcss class
        utilities like{" "}
        <Acode
          title="tailwind-merge"
          href="https://www.npmjs.com/package/tailwind-merge"
        />{" "}
        and{" "}
        <Acode
          title="tailwindcss-animate"
          href="https://www.npmjs.com/package/tailwindcss-animate"
        />
        , then run <code>http://localhost:3000</code> with your browser to start
        editing the project and using the oeri module utilities.
      </Comp>
    </>
  );
}

function Acode({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      tabIndex={-1}
      rel="noopener noreferrer nofollow">
      <code>{title}</code>
    </a>
  );
}

function FrameworksCard() {
  return (
    <>
      <Title el="h2" id="learn" className="!leading-none">
        <BoxIcon />
        Learn
      </Title>

      <Comp el="p">
        This project is based on the&nbsp;
        <Links title="React.js" href="https://react.dev/learn/" />
        &nbsp;library.
      </Comp>
      <Comp el="p">
        On web projects we recommend using&nbsp;
        <Links title="Next.js" href="https://nextjs.org/" />
        , or&nbsp;
        <Links title="Remix" href="https://remix.run/docs/" />
        , or&nbsp;
        <Links title="Gatsby" href="https://www.gatsbyjs.com/docs/" />
        &nbsp;framework. On native projects we recommend using&nbsp;
        <Links title="Expo" href="https://docs.expo.dev/" />
        &nbsp;framework.
      </Comp>

      {appRoutes["frameworks"].map(i => (
        <div key={i.title} className="mt-8">
          <Title
            el="h3"
            id={sanitizedToParams(i.title)}
            size="h4"
            variant="section">
            {i.title}
          </Title>

          <Comp el="p">{i.description}</Comp>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {i.data.map(i => (
              <Link
                key={i.title}
                href={i.href}
                target="_blank"
                className={globalStyle({ cards: "box" }, "p-6 sm:p-10")}>
                <i.icon className="size-10" />
                <p className="mt-2 font-medium">{i.title}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function TypingNotes() {
  return (
    <>
      <Title el="h2" id="language" className="!leading-none">
        <TypescriptIcon
          size={28}
          fill="#3178c6"
          className="float-left mr-3 size-[28px]"
        />
        TypeScript
      </Title>

      <Comp el="p" className="mb-52">
        This project and the components are written in TypeScript. We recommend
        using TypeScript for your project as well.
      </Comp>
    </>
  );
}

function StromIcon() {
  return (
    <Svg
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="hsl(var(--background))"
      stroke="#F2C012"
      className="float-left mr-3">
      <path d="M12.3953 1.65402L1.11071 11.5713L8.35515 13.5124L5.39339 21.3461L16.678 11.4289L9.43357 9.48772L12.3953 1.65402Z" />
    </Svg>
  );
}
function BoxIcon() {
  return (
    <Svg stroke="#58c4dc" className="float-left mr-3 size-[25px]">
      <path
        fill="#58c4dc"
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      />
      <polyline
        stroke="hsl(var(--background))"
        strokeWidth={3}
        points="3.29 7 12 12 20.71 7"
      />
      <line
        stroke="hsl(var(--background))"
        strokeWidth={3}
        x1="12"
        x2="12"
        y1="22"
        y2="12"
      />
    </Svg>
  );
}
