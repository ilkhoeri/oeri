"use client";

import React from "react";
import { commandActions, ExtendsFactory } from "./command-store";
import { useCommandContext } from "./command-store";
import {
  factory,
  useProps,
  CompoundStylesApiProps,
  ElementProps
} from "../factory";

export interface CommandSearchProps
  extends CompoundStylesApiProps<CommandSearchFactory>,
    ElementProps<"input", "size"> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  size?: number;
  clearQueryOnClose?: boolean;
}

export type CommandSearchFactory = ExtendsFactory<
  HTMLInputElement,
  CommandSearchProps
>;

const defaultProps: Partial<CommandSearchProps> = {
  size: 32,
  clearQueryOnClose: true
};

export const CommandSearch = factory<CommandSearchFactory>(
  function CommandSearch(props, ref) {
    // prettier-ignore
    const { id, name, size, clearQueryOnClose, value, style, styles, onChange, unstyled, onKeyDown, className, classNames, leftSection, rightSection, type = "text", autoFocus = true, onCompositionEnd, onCompositionStart, spellCheck = "false", autoComplete = "off", placeholder = "Search...", ...others } = useProps("CommandSearch", defaultProps, props);
    const [composition, setComposition] = React.useState(false);
    const ctx = useCommandContext();
    if (process.env.NODE_ENV !== "production") {
      console.log("CommandSearch Unused", [size, unstyled]);
    }

    const input = {
      ref,
      type,
      name,
      autoFocus,
      spellCheck,
      placeholder,
      autoComplete,
      value: value ?? ctx.query,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        ctx.setQuery(e.currentTarget.value);
        onChange?.(e);
      },
      onCompositionStart: (e: React.CompositionEvent<HTMLInputElement>) => {
        onCompositionStart?.(e);
        setComposition(true);
      },
      onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => {
        onCompositionEnd?.(e);
        setComposition(false);
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e);
        if (composition) return;

        if (e.nativeEvent.code === "ArrowDown") {
          e.preventDefault();
          commandActions.selectNextAction(ctx.store);
        }
        if (e.nativeEvent.code === "ArrowUp") {
          e.preventDefault();
          commandActions.selectPreviousAction(ctx.store);
        }
        if (
          e.nativeEvent.code === "Enter" ||
          e.nativeEvent.code === "NumpadEnter"
        ) {
          e.preventDefault();
          commandActions.triggerSelectedAction(ctx.store);
        }
      },
      ...ctx.getStyles("search", { id, className, classNames, style, styles }),
      ...others
    };

    const onClose = () => {
      commandActions.close(ctx.store!);
      if (clearQueryOnClose) ctx.setQuery("");
      commandActions.clearCommandState(
        { clearQuery: clearQueryOnClose },
        ctx.store!
      );
    };

    return (
      <div {...ctx.getStyles("searchWrap", { classNames, styles })}>
        <LeftSection {...{ leftSection }} />
        <input {...input} />
        <RightSection
          {...{ ...ctx.getStyles("closeCommand"), onClose, rightSection }}
        />
      </div>
    );
  }
);

const LeftSection = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<"label"> & { leftSection: React.ReactNode }
>(function LeftSection({ leftSection, ...props }, ref) {
  return (
    leftSection ?? (
      <label {...{ ref, ...props }}>
        <svg
          fill="currentColor"
          stroke="none"
          strokeWidth="0"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 size-4 shrink-0 opacity-50"
        >
          <path
            data-command="search"
            d="M41.95,39.34l-6.81-6.81c2.28-2.85,3.65-6.45,3.65-10.38,0-9.18-7.47-16.65-16.65-16.65S5.5,12.97,5.5,22.15s7.47,16.65,16.65,16.65c3.92,0,7.53-1.37,10.38-3.65l6.81,6.81c.36,.36,.83,.54,1.31,.54s.95-.18,1.31-.54c.72-.72,.72-1.89,0-2.62ZM9.2,22.15c0-7.14,5.81-12.95,12.95-12.95s12.95,5.81,12.95,12.95c0,3.55-1.44,6.78-3.77,9.12-.01,0-.02,.01-.03,.02s-.01,.02-.02,.03c-2.34,2.33-5.57,3.77-9.12,3.77-7.14,0-12.95-5.81-12.95-12.95Z"
          />
        </svg>
      </label>
    )
  );
});
LeftSection.displayName = "CommandAction/LeftSection";

const RightSection = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    rightSection: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
  }
>(function RightSection(
  { rightSection, type = "button", tabIndex = -1, onClick, onClose, ...props },
  ref
) {
  return (
    rightSection ?? (
      <button
        {...{
          ref,
          type,
          tabIndex,
          onClick: e => {
            onClick?.(e);
            onClose?.(e);
          },
          ...props
        }}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    )
  );
});
RightSection.displayName = "CommandAction/RightSection";
