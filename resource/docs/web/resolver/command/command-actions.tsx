"use client";
import React from "react";
import Link, { LinkProps } from "next/link";
import { commandActions, ExtendsFactory } from "./command-store";
import { useCommandContext } from "./command-store";
// prettier-ignore
import { factory, useProps, ElementProps, AnchorTargets, CSSProperties, CompoundStylesApiProps } from "../factory";

export interface CommandActionsGroupProps
  extends CompoundStylesApiProps<CommandActionsGroupFactory>,
    ElementProps<"div"> {
  children?: React.ReactNode;
  label?: React.ReactNode;
}
export type CommandActionsGroupFactory = ExtendsFactory<
  HTMLDivElement,
  CommandActionsGroupProps
>;
const defaultActionsGroup: Partial<CommandActionsGroupProps> = {};

export const CommandActionsGroup = factory<CommandActionsGroupFactory>(
  function CommandActionsGroup(props, ref) {
    const {
      id,
      className,
      classNames,
      style,
      styles,
      label,
      children,
      ...others
    } = useProps("CommandActionsGroup", defaultActionsGroup, props);
    const ctx = useCommandContext();

    return (
      <div
        ref={ref}
        data-label={typeof label === "string" ? label : undefined}
        {...ctx.getStyles("actionsGroup", {
          id,
          className,
          style,
          classNames,
          styles
        })}
        {...others}
      >
        {label && (
          <div {...ctx.getStyles("actionGroupLabel", { classNames, styles })}>
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

export interface CommandActionsListProps
  extends CompoundStylesApiProps<CommandActionsListFactory>,
    ElementProps<"div"> {
  loading?: boolean;
  loader?: React.ReactNode;
}
export type CommandActionsListFactory = ExtendsFactory<
  HTMLDivElement,
  CommandActionsListProps
>;

const defaulActionsList: Partial<CommandActionsListProps> = {};

export const CommandActionsList = factory<CommandActionsListFactory>(
  function CommandActionsList(props, ref) {
    const {
      id,
      className,
      classNames,
      style,
      styles,
      loading,
      loader,
      ...others
    } = useProps("CommandActionsList", defaulActionsList, props);
    const ctx = useCommandContext();
    const genId = `command-${React.useId().replace(/:/g, "")}`;
    const setId = id || genId;

    React.useEffect(() => {
      commandActions.setListId(setId, ctx.store);
      return () => commandActions.setListId("", ctx.store);
    }, [setId, ctx.store]);

    if (loading && loader) {
      return loader;
    }

    return (
      <div
        {...ctx.getStyles("actionsOrder", {
          id: setId,
          className,
          classNames,
          style,
          styles
        })}
      >
        <div
          ref={ref}
          {...ctx.getStyles("actionsList", {
            id,
            className,
            classNames,
            style,
            styles
          })}
          {...others}
        />
      </div>
    );
  }
);

export interface CommandActionProps
  extends Omit<LinkProps, "href">,
    CompoundStylesApiProps<CommandActionFactory>,
    ElementProps<"a"> {
  label?: string;
  href?: string;
  style?: CSSProperties;
  description?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
  dimmedSections?: boolean;
  highlightQuery?: boolean;
  highlightColor?:
    | "dark"
    | "gray"
    | "red"
    | "pink"
    | "grape"
    | "violet"
    | "indigo"
    | "blue"
    | "cyan"
    | "green"
    | "lime"
    | "yellow"
    | "orange"
    | "teal"
    | (string & NonNullable<unknown>);
  closeCommandOnTrigger?: boolean;
  keywords?: string | string[];
}
export interface AnchorProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href" | "target"
    >,
    Omit<LinkProps, "href">,
    AnchorTargets {
  style?: CSSProperties;
}
export type CommandActionFactory = ExtendsFactory<
  HTMLAnchorElement,
  CommandActionProps & AnchorProps
>;

const defaultAction: Partial<CommandActionProps> = {
  // dimmedSections: true,
  highlightQuery: false
};

export const CommandAction = factory<CommandActionFactory>((_props, ref) => {
  const {
    id,
    label,
    style,
    styles,
    onClick,
    children,
    className,
    classNames,
    description,
    onMouseDown,
    leftSection,
    rightSection,
    highlightQuery,
    closeCommandOnTrigger,
    href = "",
    ...others
  } = useProps("CommandAction", defaultAction, _props);

  const ctx = useCommandContext();

  const stylesApi = { classNames, styles };

  const labelNode =
    highlightQuery && typeof label === "string" ? (
      <CommandHighlight
        highlight={ctx.query}
        text={label}
        {...ctx.getStyles("actionLabel", stylesApi)}
      />
    ) : (
      <span {...ctx.getStyles("actionLabel", stylesApi)}>{label}</span>
    );

  const defaultChild = (
    <>
      {leftSection && (
        <span {...ctx.getStyles("actionLeftSection", stylesApi)}>
          {leftSection}
        </span>
      )}

      <div {...ctx.getStyles("actionInner", stylesApi)}>
        {labelNode}
        <span {...ctx.getStyles("actionDescription", stylesApi)}>
          {description}
        </span>
      </div>

      {rightSection && (
        <span {...ctx.getStyles("actionRightSection", stylesApi)}>
          {rightSection}
        </span>
      )}
    </>
  );

  const rest = {
    ...ctx.getStyles("action", { id, className, style, ...stylesApi }),
    onMouseDown: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      onMouseDown?.(e);
    },
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onClick?.(e);
      if (closeCommandOnTrigger ?? ctx.closeOnActionTrigger) {
        commandActions.close(ctx.store);
      }
    },
    ...others
  };

  return (
    <Link ref={ref} href={href} {...rest}>
      {children || defaultChild}
    </Link>
  );
});

export const CommandHighlight = React.forwardRef<
  HTMLParagraphElement,
  {
    text: string;
    highlight?: string;
    style?: React.CSSProperties & {
      [key: string]: any;
    };
  } & Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    "children"
  >
>(function CommandHighlight({ text, highlight = "", ...props }, ref) {
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return [text];
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex);
  };
  const parts = getHighlightedText(text, highlight);
  return (
    <p ref={ref} {...props}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      )}
    </p>
  );
});
CommandHighlight.displayName = "CommandHighlight";
