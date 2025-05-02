"use client";
import React from "react";
import { createPortal } from "react-dom";
import { CommandProvider, ExtendsFactory, useCommandContext } from "./command-store";
import { useDidUpdate } from "@/hooks/use-did-update";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useRender } from "@/hooks/use-trigger";
import { useWindowEvent } from "@/hooks/use-window-event";
// prettier-ignore
import { factory, CSSProperties, useProps, StylesApiProps, useStyles, CompoundStylesApiProps, ElementProps } from "../factory";
// prettier-ignore
import { useCommand, CommandStore, commandStore, commandActions, getHotkeys } from "./command-store";

import classes from "./command-styles";

export interface CommandContentProps extends StylesApiProps<CommandContentFactory> {
  store?: CommandStore;
  query?: string;
  onQueryChange?(query: string): void;
  clearQueryOnClose?: boolean;
  closeOnEscape?: boolean;
  shortcut?: string | string[] | null;
  tagsToIgnore?: string[];
  triggerOnContentEditable?: boolean;
  disabled?: boolean;
  onCommandOpen?(): void;
  onCommandClose?(): void;
  modal?: boolean;
  defaultOpen?: boolean;
  closeOnActionTrigger?: boolean;
  children?: React.ReactNode;
}

export type DetailsCommandContent = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  style?: CSSProperties;
};

export type CommandContentFactory = ExtendsFactory<HTMLDivElement, CommandContentProps & DetailsCommandContent>;

const defaultProps: Partial<CommandContentProps> = {
  store: commandStore,
  closeOnEscape: true,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: "mod + K",
  modal: true
};

export const CommandContent = factory<CommandContentFactory>(function CommandContent(_props, ref) {
  const props = useProps("CommandContent", defaultProps, _props);
  // prettier-ignore
  const { vars, store, modal, style, styles, variant, shortcut, unstyled, children, disabled, className, classNames, defaultOpen, tagsToIgnore, onCommandOpen, onQueryChange, onCommandClose, query: baseQuery, closeOnEscape, clearQueryOnClose, closeOnActionTrigger, triggerOnContentEditable, ...rest } = props;
  if (process.env.NODE_ENV !== "production") {
    console.log("CommandContent Unused", [vars, variant]);
  }

  const { open, query: storeQuery } = useCommand(store!);
  const query = baseQuery || storeQuery;

  const render = useRender(open, { modal });

  const setQuery = (q: string) => {
    onQueryChange?.(q);
    commandActions.setQuery(q, store!);
  };

  // prettier-ignore
  const getStyles = useStyles<CommandContentFactory>({
      name: "command", props, style, styles, unstyled, className, classNames,
      // @ts-ignore
      classes,
      ...rest
    });

  useHotkeys(getHotkeys(shortcut, store!), tagsToIgnore, triggerOnContentEditable);

  useDidUpdate(() => {
    if (open) onCommandOpen?.();
    else onCommandClose?.();
  }, [open]);

  const onClose = () => {
    commandActions.close(store!);
    if (clearQueryOnClose) setQuery("");
    commandActions.clearCommandState({ clearQuery: clearQueryOnClose }, store!);
  };

  useWindowEvent(
    "keydown",
    event => {
      if (event.key === "Escape" && closeOnEscape) {
        const shouldTrigger = (event.target as HTMLElement)?.getAttribute("data-stop-propagation") !== "true";
        if (shouldTrigger) onClose();
      }
    },
    { capture: true }
  );

  const attrOverlay: Record<string, string | undefined> = {
    "aria-modal": `${modal}`,
    "data-modal": !modal ? "false" : undefined,
    "data-state": defaultOpen ? "opened" : open ? "open" : "closed"
  };

  if (typeof document === "undefined" || !(render || defaultOpen) || disabled) return null;

  // prettier-ignore
  const content = (
      <CommandProvider value={{ setQuery, query, store: store!, closeOnActionTrigger, getStyles }}>
        <div {...{...getStyles("overlay", { classNames, styles }), onClick: onClose, ...attrOverlay}} />
        <div {...{ref, ...getStyles("content", { className, classNames, style, styles }), ...attrOverlay, ...rest}}>
          {children}
        </div>
      </CommandProvider>
    );

  return modal ? createPortal(content, document.body) : content;
});

// Footer
export interface CommandFooterProps extends CompoundStylesApiProps<CommandFooterFactory>, ElementProps<"div"> {}
export type CommandFooterFactory = ExtendsFactory<HTMLDivElement, CommandFooterProps>;

const defaultFooter: Partial<CommandFooterProps> = {};

export const CommandFooter = factory<CommandFooterFactory>(function CommandFooter(props, ref) {
  const { id, className, classNames, style, styles, ...others } = useProps("CommandFooter", defaultFooter, props);
  const ctx = useCommandContext();
  return (
    <div
      ref={ref}
      {...ctx.getStyles("footer", {
        id,
        className,
        classNames,
        style,
        styles
      })}
      {...others}
    />
  );
});

// Empty

export interface CommandEmptyProps extends CompoundStylesApiProps<CommandEmptyFactory>, ElementProps<"div"> {}
export type CommandEmptyFactory = ExtendsFactory<HTMLDivElement, CommandEmptyProps>;

const defaultEmpty: Partial<CommandEmptyProps> = {};

export const CommandEmpty = factory<CommandEmptyFactory>(function CommandEmpty(props, ref) {
  const { id, className, classNames, style, styles, ...others } = useProps("CommandEmpty", defaultEmpty, props);

  const ctx = useCommandContext();

  return (
    <div
      ref={ref}
      {...ctx.getStyles("empty", {
        id,
        classNames,
        styles,
        className,
        style
      })}
      {...others}
    />
  );
});
