"use client";
import React from "react";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { Factory, factory, useProps } from "../factory";
import { CommandSearch, CommandSearchProps } from "./command-search";
import { CommandAction, CommandActionProps, CommandHighlight, CommandActionsList, CommandActionsGroup } from "./command-actions";
import { DetailsCommandContent, CommandContent, CommandContentProps, CommandFooter, CommandEmpty } from "./command-content";
import { commandStore, command, actionsGroup, limitActions, defaultFilter } from "./command-store";
import type { CommandOrigin } from "./command-store";

export interface CommandActionData extends CommandActionProps {
  id: string;
  group?: string;
}
export interface CommandActionGroupData {
  group: string;
  actions: CommandActionData[];
}
type CommandType = CommandFactory & DetailsCommandContent;
export type CommandActions = CommandActionData | CommandActionGroupData;
export type CommandFilterFunction = (query: string, actions: CommandActions[]) => CommandActions[];

export interface CommandProps extends CommandContentProps {
  searchProps?: CommandSearchProps;
  actions: CommandActions[];
  filter?: CommandFilterFunction;
  nothingFound?: React.ReactNode;
  highlightQuery?: boolean;
  limit?: number;
}

const defaultProps: Partial<CommandProps> = {
  limit: Infinity,
  store: commandStore,
  filter: defaultFilter,
  closeOnEscape: true,
  highlightQuery: false,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  nothingFound: "Nothing found...",
  shortcut: "mod + K"
};

export const Command = factory<CommandType>(function Command(_props, ref) {
  const props = useProps("Command", defaultProps, _props);
  // prettier-ignore
  const { searchProps, filter, query, onQueryChange, actions, nothingFound, highlightQuery, limit, ...rest } = props;

  const [_query, setQuery] = useUncontrolled({
    value: query,
    finalValue: "",
    defaultValue: "",
    onChange: onQueryChange
  });

  const filteredActions = limitActions(filter!(_query, actions), limit!).map(i => {
    if (actionsGroup(i)) {
      return (
        <CommandActionsGroup key={i.group} label={i.group}>
          {/* @ts-ignore */}
          {i.actions.map(({ id, group, ...actionData }) => (
            <CommandAction key={id} {...{ id, "data-group": group, highlightQuery, ...actionData }} />
          ))}
        </CommandActionsGroup>
      );
    }

    return <CommandAction key={i.id} {...{ highlightQuery, ...i }} />;
  });

  return (
    <CommandContent {...{ ref, query: _query, onQueryChange: setQuery, ...rest }}>
      <CommandSearch {...searchProps} />
      <CommandActionsList>
        {filteredActions}
        {filteredActions.length === 0 && nothingFound && <CommandEmpty>{nothingFound}</CommandEmpty>}
      </CommandActionsList>
    </CommandContent>
  );
});

export type CommandFactory = Factory<{
  props: CommandProps;
  ref: HTMLDivElement;
  stylesNames: CommandOrigin;
  staticComponents: {
    Content: typeof CommandContent;
    Search: typeof CommandSearch;
    ActionsList: typeof CommandActionsList;
    Action: typeof CommandAction;
    Highlight: typeof CommandHighlight;
    Empty: typeof CommandEmpty;
    Footer: typeof CommandFooter;
    ActionsGroup: typeof CommandActionsGroup;
    open: typeof command.open;
    close: typeof command.close;
    toggle: typeof command.toggle;
  };
}>;

Command.Content = CommandContent;
Command.Search = CommandSearch;
Command.ActionsList = CommandActionsList;
Command.Action = CommandAction;
Command.Highlight = CommandHighlight;
Command.Empty = CommandEmpty;
Command.ActionsGroup = CommandActionsGroup;
Command.Footer = CommandFooter;
Command.open = command.open;
Command.close = command.close;
Command.toggle = command.toggle;
