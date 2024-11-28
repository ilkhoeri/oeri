"use client";

import { useEffect, useState } from "react";
import { TerminalOutlineIcon } from "@/modules/icons";
import { CopyButton } from "@/source/ui/toggle";
import { appRoutes } from "@/source/routes";

import style from "@/source/styles/.module.css";

export function InstallCommand() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allCommands = appRoutes["frameworks"].flatMap(framework =>
    framework.data.map(item => item.cmd)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % allCommands.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [allCommands.length]);

  const currentCmd = allCommands[currentIndex];

  return (
    <div className="mt-8 grid sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-xl border border-muted bg-muted/40 backdrop-blur">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="mb-4 flex flex-col font-mono last:mb-0">
            <hgroup className="flex min-h-[48px] items-center justify-between overflow-hidden rounded-t-md border-b-[0.5px] border-b-muted bg-[#eaecee] px-3 dark:bg-[#202425]">
              <p className="flex h-10 select-none items-center gap-2 truncate font-mono font-medium text-muted-foreground">
                <TerminalOutlineIcon className="mt-0.5 size-[18px] text-constructive" />
                Terminal
              </p>

              <CopyButton
                value={`npx ${currentCmd}`}
                className="relative right-auto top-auto ml-auto border-[0.5px] bg-background text-muted-foreground"
              />
            </hgroup>

            <pre className="relative flex flex-col overflow-x-auto whitespace-nowrap rounded-b-md border border-transparent bg-background py-8 pl-4 pr-2 leading-[19px] text-color webkit-scrollbar">
              <code className="relative box-border flex w-max flex-row items-center overflow-hidden whitespace-pre text-nowrap border-none bg-transparent leading-normal text-color">
                <p className="text-muted-foreground">-&nbsp;</p>
                <p className="text-[#e34ba9]">npx&nbsp;</p>
                <p data-cmd={currentCmd} className={style.cmd} />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
