"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import Link, { LinkProps } from "next/link";
import { useRender } from "@/hooks/use-trigger";
import { useDidUpdate } from "@/hooks/use-did-update";
import { useWindowEvent } from "@/hooks/use-window-event";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { useHotkeys, type HotkeyItem } from "@/hooks/use-hotkeys";
import { cn, cvx, type cvxProps } from "cretex";

const classes = cvx({
  variants: {
    selector: {
      overlay: "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=closed]:fade-out-0",
      content:
        "fixed left-[50%] top-[50%] z-[111] flex h-96 w-80 max-w-full translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-2xl border bg-background p-0 shadow-lg duration-200 [--command-hover-bg:hsl(var(--muted)/0.85)] [--command-hover-clr:hsl(var(--color))] [--command-selected-bg:--command-hover-bg] [--command-selected-clr:--command-hover-clr] data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[50%] md:h-[60svh] md:w-[520px] 2xl:w-[40svw]",
      searchWrap: "flex flex-row items-center border-b px-3 gap-2 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
      search: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      searchLabel: "",
      closeCommand: "size-4 absolute right-3 rtl:right-auto rtl:left-3 top-3 text-muted-foreground bg-transparent hover:text-color rounded-sm disabled:opacity-50",
      empty: "flex items-center justify-center text-center font-medium text-muted-foreground pt-10 text-sm",
      actionsOrder: "flex-1 overflow-y-auto h-full webkit-scrollbar",
      actionSection: "data-[dimmed]:opacity-100 data-[dimmed]:text-muted-foreground data-[position=left]:mr-3 data-[position=right]:ml-3 [&>svg]:block",
      actionsList: "p-1 pb-10 h-max min-h-[inherit] [&_[data-selected=true]]:bg-[--command-selected-bg] [&_[data-selected=true]]:text-[--command-selected-clr]",
      actionsGroup: "flex empty:hidden flex-col overflow-hidden text-muted-foreground mt-2 pb-2 first:mt-0 border-b last:border-b-0 space-y-0.5",
      actionGroupLabel: "flex flex-row items-center px-2 py-1.5 text-xs font-medium text-muted-foreground select-none",
      action:
        "relative flex flex-row items-center justify-start gap-2 p-1.5 w-full min-w-full max-w-full text-left select-none rounded-sm px-2 py-1.5 text-sm text-muted-foreground outline-none hover:bg-[--command-hover-bg] hover:text-[--command-hover-clr] aria-selected:bg-[--command-hover-bg] aria-selected:text-[--command-hover-clr] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>[data-command=action-left-section]+[data-command=action-inner]_span]:pl-0",
      actionLabel: "flex flex-row items-center px-2 text-sm font-medium select-none [&_mark]:rounded-sm",
      actionInner: "",
      highlight: "",
      actionDescription: "flex flex-col items-start justify-center text-xs px-2 text-muted-foreground select-none [&>:nth-child(2)]:block [&>:nth-child(2)]:text-xs [&>:nth-child(2)]:text-muted-foreground empty:hidden",
      actionLeftSection: "",
      actionRightSection: "",
      footer: "border-t"
    },
    forceMount: {
      overlay: "hidden sr-only",
      content: "relative left-auto top-auto inset-auto translate-y-0 translate-x-0 z-[unset]",
      closeCommand: "hidden sr-only"
    }
  }
});

export type CommandStore = StoreValue<CommandState>;
export type StoreSubscriber<Value> = (value: Value) => void;
export type __CommandSelector = NonNullable<cvxProps<typeof classes>["selector"]>;
type SetStateCallback<Value> = (value: Value) => Value;
type CSSProperties = React.CSSProperties & { [key: string]: any };
type StylesNames<T extends string, Exclude extends string = never> = Omit<
  {
    unstyled?: Partial<Record<T, boolean>>;
    className?: string;
    style?: CSSProperties;
    classNames?: Partial<Record<T, string>>;
    styles?: Partial<Record<T, CSSProperties>>;
  },
  Exclude
>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__CommandSelector> & {} & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;
type CtxProps = {
  getStyles(selector: __CommandSelector, options?: Options): InferType<typeof getStyles>;
  query: string;
  setQuery: (query: string) => void;
  store: CommandStore;
  onClose: () => void;
  closeOnActionTrigger: boolean | undefined;
  forceMount: boolean | undefined;
};
export interface StoreValue<Value> {
  getState(): Value;
  setState(value: Value | SetStateCallback<Value>): void;
  updateState(value: Value | SetStateCallback<Value>): void;
  initialize(value: Value): void;
  subscribe(callback: StoreSubscriber<Value>): () => void;
}
export interface CommandState {
  open: boolean;
  selected: number;
  listId: string;
  query: string;
  empty: boolean;
  registeredActions: Set<string>;
}
export interface __CommandProps extends ComponentProps<"div"> {
  store?: CommandStore;
  query?: string;
  onQueryChange?: (query: string) => void;
  clearQueryOnClose?: boolean;
  closeOnEscape?: boolean;
  shortcut?: string | string[] | null;
  tagsToIgnore?: string[];
  triggerOnContentEditable?: boolean;
  disabled?: boolean;
  onCommandOpen?: () => void;
  onCommandClose?: () => void;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
  closeOnActionTrigger?: boolean;
  children?: React.ReactNode;
  closeCommandOnTrigger?: boolean;
}
export interface CommandActionData extends CommandActionProps {
  id: string;
  group?: string;
}
export interface CommandActionGroupData {
  group: string;
  actions: CommandActionData[];
}
export type CommandActions = CommandActionData | CommandActionGroupData;
export type CommandFilterFunction = (query: string, actions: CommandActions[]) => CommandActions[];
export interface CommandProps extends __CommandProps {
  searchProps?: CommandSearchProps;
  actions?: CommandActions[];
  filter?: CommandFilterFunction;
  nothingFound?: React.ReactNode;
  highlightQuery?: boolean;
  limit?: number;
}

type Options = StylesNames<__CommandSelector> & {
  forceMount?: boolean | undefined;
};
function getStyles(selector: __CommandSelector, opt?: Options) {
  const isUnstyled = opt?.unstyled?.[selector];
  const isForceMount = opt?.forceMount ? (selector as cvxProps<typeof classes>["forceMount"]) : undefined;
  return {
    "data-command": cn(selector),
    className: cn(!isUnstyled && [classes({ selector, forceMount: isForceMount })], opt?.classNames?.[selector], opt?.className),
    style: {
      ...opt?.styles?.[selector],
      ...opt?.style
    }
  };
}
const ctx = React.createContext<CtxProps | undefined>(undefined);
const useCommandContext = () => React.useContext(ctx)!;
export const useCommand = (store: CommandStore) => useStore(store);

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(function Command(_props, ref) {
  const { searchProps, actions, limit = Infinity, filter = defaultFilter, highlightQuery = false, nothingFound = "Nothing found...", styles, unstyled, children, classNames, query, onQueryChange, clearQueryOnClose = true, closeCommandOnTrigger, ...props } = _props;

  const [_query, setQuery] = useUncontrolled({
    value: query,
    finalValue: "",
    defaultValue: "",
    onChange: onQueryChange
  });

  const stylesApi = { unstyled, classNames, styles };

  if (!children && !actions) {
    throw new Error("Must define one of `children` or `props.actions`.");
  }

  if (children && actions) {
    throw new Error("Can only set one of `children` or `props.actions`.");
  }

  const filteredActions =
    actions &&
    limitActions(filter!(_query, actions), limit!).map(i => {
      if (actionsGroup(i)) {
        return (
          <CommandActionsGroup key={i.group} label={i.group} {...stylesApi}>
            {/* @ts-ignore */}
            {i.actions.map(({ id, group, ...actionData }) => (
              <CommandAction key={id} {...{ id, "data-group": group, highlightQuery, closeCommandOnTrigger, clearQueryOnClose, ...actionData, ...stylesApi }} />
            ))}
          </CommandActionsGroup>
        );
      }

      return <CommandAction key={i.id} {...{ highlightQuery, closeCommandOnTrigger, clearQueryOnClose, ...stylesApi, ...i }} />;
    });

  const content = (
    <>
      <CommandSearch {...{ clearQueryOnClose, ...stylesApi, ...searchProps }} />
      <CommandActionsList {...stylesApi}>
        {filteredActions}
        {filteredActions?.length === 0 && nothingFound && <CommandEmpty {...stylesApi}>{nothingFound}</CommandEmpty>}
      </CommandActionsList>
    </>
  );

  return <CommandRoot {...{ ref, query: _query, onQueryChange: setQuery, clearQueryOnClose, closeCommandOnTrigger, ...props, ...stylesApi }}>{children || content}</CommandRoot>;
}) as CommandComponent;

// Root
export interface CommandRootProps extends __CommandProps {
  title?: string;
}
export const CommandRoot = React.forwardRef<HTMLDivElement, CommandRootProps>((_props, ref) => {
  const {
    styles,
    unstyled,
    children,
    disabled,
    classNames,
    tagsToIgnore,
    onCommandOpen,
    onQueryChange,
    onCommandClose,
    query: baseQuery,
    triggerOnContentEditable,
    store = commandStore,
    closeOnEscape = true,
    clearQueryOnClose = true,
    closeOnActionTrigger = true,
    shortcut = "mod + K",
    container,
    forceMount,
    closeCommandOnTrigger,
    ...props
  } = _props;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const { open, query: storeQuery } = useCommand(store!);

  const _query = baseQuery || storeQuery;
  const setQuery = (q: string) => {
    onQueryChange?.(q);
    commandActions.setQuery(q, store!);
  };

  const render = useRender(open, { modal: !forceMount });

  useHotkeys(getHotkeys(shortcut, store!), tagsToIgnore, triggerOnContentEditable);

  useDidUpdate(() => {
    if (open) onCommandOpen?.();
    else onCommandClose?.();
  }, [open]);

  function onClose() {
    commandActions.close(store!);
    if (clearQueryOnClose) setQuery("");
    commandActions.clearCommandState({ clearQuery: clearQueryOnClose }, store!);
  }

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

  const windowIsDefine = typeof window !== "undefined" && typeof document !== "undefined";
  if (!windowIsDefine || !mounted || !(render || forceMount) || disabled) return null;

  const stylesApi = { unstyled, classNames, styles };

  const attrOverlay: Record<string, string | undefined> = {
    "aria-modal": forceMount ? "false" : undefined,
    "data-modal": forceMount ? "false" : undefined,
    "data-state": forceMount ? "opened" : open ? "open" : "closed"
  };

  const root = (
    <ctx.Provider value={{ getStyles, forceMount, query: _query, setQuery, store: store!, closeOnActionTrigger, onClose }}>
      {(!forceMount || container === document.body) && <Edge {...{ el: "div", selector: "overlay", onClick: onClose, ...stylesApi, ...attrOverlay }} />}
      <Edge {...{ el: "div", selector: "content", ref, ...stylesApi, ...attrOverlay, ...props }}>{children}</Edge>
    </ctx.Provider>
  );

  if (container === null) return root;

  return createPortal(root, container || document.body);
});
CommandRoot.displayName = "Command/CommandRoot";

// Footer
export interface CommandFooterProps extends ComponentProps<"div"> {
  title?: string;
}
export const CommandFooter = React.forwardRef<HTMLDivElement, CommandFooterProps>((_props, ref) => <Edge {...{ el: "div", selector: "footer", ref, ..._props }} />);
CommandFooter.displayName = "Command/CommandFooter";

// Empty
export interface CommandEmptyProps extends ComponentProps<"div"> {
  title?: string;
}
export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandFooterProps>((_props, ref) => <Edge {...{ el: "div", selector: "empty", ref, ..._props }} />);
CommandEmpty.displayName = "Command/CommandEmpty";

export interface CommandActionsGroupProps extends ComponentProps<"div"> {
  label?: React.ReactNode;
}
export const CommandActionsGroup = React.forwardRef<HTMLDivElement, CommandActionsGroupProps>(function CommandActionsGroup(_props, ref) {
  const { unstyled, classNames, styles, label, children, ...props } = _props;
  const stylesApi = { unstyled, classNames, styles };
  return (
    <Edge {...{ el: "div", selector: "actionsGroup", ref, "data-label": typeof label === "string" ? label : undefined, ...stylesApi, ...props }}>
      {label && <Edge {...{ el: "div", selector: "actionGroupLabel", ...stylesApi }}>{label}</Edge>}
      {children}
    </Edge>
  );
});

export interface CommandActionsListProps extends ComponentProps<"div"> {
  loading?: boolean;
  loader?: React.ReactNode;
}
export const CommandActionsList = React.forwardRef<HTMLDivElement, CommandActionsListProps>((_props, ref) => {
  const { id, unstyled, classNames, styles, loading, loader, ...props } = _props;
  const ctx = useCommandContext();
  const genId = `command-${React.useId().replace(/:/g, "")}`;
  const setId = id || genId;

  React.useEffect(() => {
    commandActions.setListId(setId, ctx.store);
    return () => commandActions.setListId("", ctx.store);
  }, [ctx.store, setId]);

  if (loading && loader) return loader;

  const stylesApi = { unstyled, classNames, styles };
  return (
    <Edge {...{ el: "div", selector: "actionsOrder", "aria-controls": setId, ...stylesApi }}>
      <Edge {...{ el: "div", selector: "actionsList", ref, id: setId, ...stylesApi, ...props }} />
    </Edge>
  );
});
CommandActionsList.displayName = "Command/CommandActionsList";

export interface CommandActionProps extends Omit<LinkProps & ComponentProps<"a">, "href"> {
  label?: string;
  href?: LinkProps["href"];
  description?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
  dimmedSections?: boolean;
  highlightQuery?: boolean;
  highlightColor?: string & NonNullable<unknown>;
  closeCommandOnTrigger?: boolean;
  clearQueryOnClose?: boolean;
  keywords?: string | string[];
}
export const CommandAction = React.forwardRef<HTMLAnchorElement, CommandActionProps>((_props, ref) => {
  // prettier-ignore
  const { label, style, styles, onClick, children, unstyled, className, classNames, description, onMouseDown, leftSection, rightSection, closeCommandOnTrigger, clearQueryOnClose, highlightQuery = false, href = "", tabIndex = -1, ...props } = _props;
  const ctx = useCommandContext();
  const stylesApi = { unstyled, classNames, styles };

  const labelNode = highlightQuery && typeof label === "string" ? <CommandHighlight highlight={ctx.query} text={label} {...ctx.getStyles("actionLabel", stylesApi)} /> : <Edge {...{ el: "span", selector: "actionLabel", ...stylesApi }}>{label}</Edge>;

  const defaultChild = (
    <>
      {leftSection && <Edge {...{ el: "span", selector: "actionLeftSection", ...stylesApi }}>{leftSection}</Edge>}

      <Edge {...{ el: "div", selector: "actionInner", ...stylesApi }}>
        {labelNode}
        <Edge {...{ el: "span", selector: "actionDescription", ...stylesApi }}>{description}</Edge>
      </Edge>

      {rightSection && <Edge {...{ el: "span", selector: "actionRightSection", ...stylesApi }}>{rightSection}</Edge>}
    </>
  );

  const rest = {
    ref,
    href,
    tabIndex,
    ...ctx.getStyles("action", { className, style, ...stylesApi }),
    onMouseDown: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      onMouseDown?.(e);
    },
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onClick?.(e);
      if (closeCommandOnTrigger ?? ctx.closeOnActionTrigger) {
        commandActions.close(ctx.store);
        if (clearQueryOnClose) ctx.setQuery("");
      }
    },
    ...props
  };

  return <Link {...rest}>{children || defaultChild}</Link>;
});
CommandAction.displayName = "Command/CommandAction";

export interface CommandHighlightProps extends ComponentProps<"p", "children"> {
  text: string;
  highlight?: string;
  children?: string;
}
export const CommandHighlight = React.forwardRef<HTMLParagraphElement, CommandHighlightProps>((_props, ref) => {
  const { text, highlight = "", children, ...props } = _props;
  const parts = getHighlightedSearch(children || text, highlight);

  return <Edge {...{ el: "p", ref, selector: "highlight", ...props }}>{parts.map(({ part, highlighted }, _i) => (highlighted ? <mark key={_i}>{part}</mark> : part))}</Edge>;
});
CommandHighlight.displayName = "CommandHighlight";

export interface CommandSearchProps extends ComponentProps<"input", "size"> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  size?: number;
  clearQueryOnClose?: boolean;
}
export const CommandSearch = React.forwardRef<HTMLInputElement, CommandSearchProps>((_props, ref) => {
  // prettier-ignore
  const { name, clearQueryOnClose, value, style, styles, onChange, unstyled, onKeyDown, className, classNames, leftSection, rightSection, type = "text", autoFocus = true, onCompositionEnd, onCompositionStart, spellCheck = "false", autoComplete = "off", placeholder = "Search...", ...props } = _props;

  const [composition, setComposition] = React.useState(false);
  const ctx = useCommandContext();

  const stylesApi = { unstyled, classNames, styles };

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
      if (e.nativeEvent.code === "Enter" || e.nativeEvent.code === "NumpadEnter") {
        e.preventDefault();
        commandActions.triggerSelectedAction(ctx.store);
      }
    },
    ...ctx.getStyles("search", { className, style, ...stylesApi }),
    ...props
  };

  return (
    <Edge {...{ el: "div", selector: "searchWrap", ...stylesApi }}>
      <LeftSection {...{ leftSection, ...stylesApi }} />
      <input {...input} />
      <RightSection {...{ rightSection, ...stylesApi }} />
    </Edge>
  );
});
CommandSearch.displayName = "Command/CommandSearch";

const LeftSection = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label"> & { leftSection: React.ReactNode }>((_props, ref) => {
  const { leftSection, ...props } = _props;
  return (
    <Edge {...{ el: "label", ref, selector: "searchLabel", ...props }}>
      {leftSection ?? (
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4">
          <path data-command="search" d="m14 14l2.5 2.5m-.067 2.025a1.48 1.48 0 1 1 2.092-2.092l3.042 3.042a1.48 1.48 0 1 1-2.092 2.092zM16 9A7 7 0 1 0 2 9a7 7 0 0 0 14 0" />
        </svg>
      )}
    </Edge>
  );
});
LeftSection.displayName = "Command/CommandAction/LeftSection";

const RightSection = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { rightSection: React.ReactNode }>((_props, ref) => {
  const { rightSection, type = "button", tabIndex = -1, onClick, ...props } = _props;
  const ctx = useCommandContext();
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e);
    ctx.onClose();
  }
  return (
    <Edge {...{ el: "button", ref, selector: "closeCommand", type, tabIndex, onClick: handleClick, ...props }}>
      {rightSection ?? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
          <path fill="none" stroke="currentColor" strokeDasharray="12" strokeDashoffset="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0" />
          </path>
        </svg>
      )}
    </Edge>
  );
});
RightSection.displayName = "Command/CommandAction/RightSection";

type EdgeType<T extends React.ElementType> = {
  el?: T;
  selector?: __CommandSelector;
  ref?: React.ComponentPropsWithRef<T>["ref"];
} & ComponentProps<T>;
type EdgeElement = <T extends React.ElementType>(_props: EdgeType<T>) => React.ReactElement;
const Edge = React.forwardRef(function Edge<T extends React.ElementType>(_props: Omit<EdgeType<T>, "ref">, ref: React.Ref<ComponentProps<T>>) {
  const { unstyled, className, classNames, el, style, styles, selector, ...props } = _props;
  const ctx = useCommandContext();
  const Components = (el || "div") as React.ElementType;
  return <Components {...{ ...props, ref, ...ctx.getStyles(selector!, { unstyled, className, classNames, style, styles, ...ctx }) }} />;
}) as EdgeElement;

export function createStore<Value extends Record<string, any>>(initialState: Value): StoreValue<Value> {
  let state = initialState;
  let initialized = false;
  const listeners = new Set<StoreSubscriber<Value>>();

  return {
    getState() {
      return state;
    },
    updateState(value) {
      state = typeof value === "function" ? value(state) : value;
    },
    setState(value) {
      this.updateState(value);
      listeners.forEach(listener => listener(state));
    },
    initialize(value) {
      if (!initialized) {
        state = value;
        initialized = true;
      }
    },
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    }
  };
}

export const createCommandStore = () =>
  createStore<CommandState>({
    query: "",
    listId: "",
    open: false,
    empty: false,
    selected: -1,
    registeredActions: new Set()
  });

export type StoreValues<Store extends StoreValue<any>> = ReturnType<Store["getState"]>;
export function useStore<Store extends StoreValue<any>>(store: Store) {
  return React.useSyncExternalStore<StoreValues<Store>>(
    store.subscribe,
    () => store.getState(),
    () => store.getState()
  );
}

export function updateCommandStateAction(update: (state: CommandState) => Partial<CommandState>, store: CommandStore) {
  const state = store.getState();
  store.setState({ ...state, ...update(store.getState()) });
}

export function openCommandAction(store: CommandStore) {
  updateCommandStateAction(() => ({ open: true, selected: -1 }), store);
}

export function closeCommandAction(store: CommandStore) {
  updateCommandStateAction(() => ({ open: false }), store);
}

export function toggleCommandAction(store: CommandStore) {
  updateCommandStateAction(state => ({ open: !state.open }), store);
}

export function setSelectedAction(index: number, store: CommandStore) {
  store.updateState(state => ({ ...state, selected: index }));
}

export function setListId(id: string, store: CommandStore) {
  store.updateState(state => ({ ...state, listId: id }));
}

export function selectAction(index: number, store: CommandStore): number {
  const state = store.getState();
  const actionsList = document.getElementById(state.listId);
  const selected = actionsList?.querySelector<HTMLAnchorElement>("[data-selected]");
  const actions = actionsList?.querySelectorAll<HTMLAnchorElement>(`[data-command="action"]`) ?? [];
  const nextIndex = index === -1 ? actions.length - 1 : index === actions.length ? 0 : index;
  const selectedIndex = clamp(nextIndex, 0, actions.length - 1);
  selected?.removeAttribute("data-selected");
  actions[selectedIndex]?.scrollIntoView({ block: "nearest" });
  actions[selectedIndex]?.setAttribute("data-selected", "true");
  setSelectedAction(selectedIndex, store);
  return selectedIndex;
}

export function selectNextAction(store: CommandStore) {
  return selectAction(store.getState().selected + 1, store);
}

export function selectPreviousAction(store: CommandStore) {
  return selectAction(store.getState().selected - 1, store);
}

export function triggerSelectedAction(store: CommandStore) {
  const state = store.getState();
  const selected = document.querySelector<HTMLAnchorElement>(`#${state.listId} [data-selected]`);
  selected?.click();
}

export function registerAction(id: string, store: CommandStore) {
  const state = store.getState();
  state.registeredActions.add(id);
  return () => {
    state.registeredActions.delete(id);
  };
}

export function setQuery(query: string, store: CommandStore) {
  updateCommandStateAction(() => ({ query }), store);
  Promise.resolve().then(() => {
    selectAction(0, store);
    updateCommandStateAction(
      state => ({
        empty: (state.query.trim().length > 0 && state.registeredActions.size === 0) || false
      }),
      store
    );
  });
}

export function clearCommandState({ clearQuery }: { clearQuery: boolean | undefined }, store: CommandStore) {
  store.updateState(state => ({
    ...state,
    selected: -1,
    query: clearQuery ? "" : state.query,
    empty: clearQuery ? false : state.empty
  }));
}

export const commandActions = {
  open: openCommandAction,
  close: closeCommandAction,
  toggle: toggleCommandAction,
  updateState: updateCommandStateAction,
  setSelectedAction,
  setListId,
  selectAction,
  selectNextAction,
  selectPreviousAction,
  triggerSelectedAction,
  registerAction,
  setQuery,
  clearCommandState
};

export function createCommand() {
  const store = createCommandStore();
  const actions = {
    open: () => openCommandAction(store),
    close: () => closeCommandAction(store),
    toggle: () => toggleCommandAction(store)
  };
  return [store, actions] as const;
}

export const [commandStore, command] = createCommand();
export const { open: openCommand, close: closeCommand, toggle: toggleCommand } = command;

function getKeywords(keywords: string | string[] | undefined) {
  if (Array.isArray(keywords)) {
    return keywords
      .map(keyword => keyword.trim())
      .join(",")
      .toLowerCase()
      .trim();
  }
  if (typeof keywords === "string") {
    return keywords.toLowerCase().trim();
  }
  return "";
}

function getFlatActions(data: CommandActions[]) {
  return data.reduce<CommandActionData[]>((acc, item) => {
    if ("actions" in item) {
      return [...acc, ...item.actions.map(action => ({ ...action, group: item.group }))];
    }
    return [...acc, item];
  }, []);
}

function flatActionsToGroups(data: CommandActionData[]) {
  const groups: Record<string, { pushed: boolean; data: CommandActionGroupData }> = {};
  const result: CommandActions[] = [];
  data.forEach(action => {
    if (action.group) {
      if (!groups[action.group]) {
        groups[action.group] = {
          pushed: false,
          data: { group: action.group, actions: [] }
        };
      }
      groups[action.group].data.actions.push(action);
      if (!groups[action.group].pushed) {
        groups[action.group].pushed = true;
        result.push(groups[action.group].data);
      }
    } else {
      result.push(action);
    }
  });
  return result;
}

export const defaultFilter: CommandFilterFunction = (_query, data) => {
  const query = _query.trim().toLowerCase();
  const priorityMatrix: CommandActionData[][] = [[], []];
  const flatActions = getFlatActions(data);
  flatActions.forEach(item => {
    if (item.label?.toLowerCase().includes(query)) {
      priorityMatrix[0].push(item);
    } else if (item.description?.toLowerCase().includes(query) || getKeywords(item.keywords).includes(query)) {
      priorityMatrix[1].push(item);
    }
  });
  return flatActionsToGroups(priorityMatrix.flat());
};

export const fuzzyFilter: CommandFilterFunction = (_query, data) => {
  const query = _query.trim().toLowerCase();
  const priorityMatrix: CommandActionData[][] = [[], [], []];
  const flatActions = getFlatActions(data);

  flatActions.forEach(item => {
    if (item.label?.toLowerCase().includes(query)) {
      priorityMatrix[0].push(item);
    } else if (item.description?.toLowerCase().includes(query) || getKeywords(item.keywords).includes(query)) {
      priorityMatrix[1].push(item);
    }
  });

  if (priorityMatrix[0].length === 0 && priorityMatrix[1].length === 0) {
    const labels = flatActions.map(item => item.label?.toLowerCase() || "");
    const closestLabel = fuzzySearch(query, labels);

    flatActions.forEach(item => {
      if (item.label?.toLowerCase() === closestLabel) {
        priorityMatrix[2].push(item);
      }
    });
  }
  return flatActionsToGroups(priorityMatrix.flat());
};

export function fuzzySearch(query: string, terms: string[]): string {
  function fuzzy(text: string, query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    const sanitizedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "");
    const regex = new RegExp(`\\b${sanitizedQuery.split("").join(".*")}\\b`, "i");
    return regex.test(text) || text.toLowerCase().includes(normalizedQuery);
  }
  const directMatch = terms.find(term => fuzzy(term, query));
  if (directMatch) return directMatch;

  const sortedTerms = terms
    .map(term => ({ term, distance: levenshteinDistance(term, query) }))
    .filter(item => item.distance <= 4)
    .sort((a, b) => a.distance - b.distance);

  return sortedTerms[0]?.term ?? "";
}

export function levenshteinDistance(term: string, query: string): number {
  const matrix = Array.from({ length: query.length + 1 }, () => Array(term.length + 1).fill(0));
  for (let i = 0; i <= query.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= term.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= query.length; i++) {
    for (let j = 1; j <= term.length; j++) {
      if (query[i - 1] === term[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + 1);
      }
    }
  }
  return matrix[query.length][term.length];
}

export function clamp(value: number, min: number | undefined, max: number | undefined) {
  if (min === undefined && max === undefined) {
    return value;
  }
  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }
  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }
  return Math.min(Math.max(value, min!), max!);
}

export function getHotkeys(hotkeys: string | string[] | null | undefined, store: CommandStore): HotkeyItem[] {
  if (!hotkeys) return [];
  const open = () => commandActions.open(store);
  if (Array.isArray(hotkeys)) {
    return hotkeys.map(hotkey => [hotkey, open]);
  }
  return [[hotkeys, open]];
}

export function actionsGroup(item: CommandActionData | CommandActionGroupData): item is CommandActionGroupData {
  const _item = item as CommandActionGroupData;
  return _item.group !== undefined && Array.isArray(_item.actions);
}

export function limitActions(actions: CommandActions[], limit: number) {
  if (!Array.isArray(actions)) return [];

  let count = 0;
  return actions.reduce<CommandActions[]>((acc, item) => {
    if (count >= limit) return acc;

    if (actionsGroup(item)) {
      const groupActions = limitActions(item.actions, limit - count);
      acc.push({
        group: item.group,
        actions: groupActions as CommandActionData[]
      });
      count += groupActions.length;
    } else {
      acc.push(item);
      count += 1;
    }

    return acc;
  }, []);
}

function getHighlightedSearch(value: string, _highlight: string | string[]) {
  if (_highlight == null) return [{ part: value, highlighted: false }];

  const escapeRegex = (value: string) => value.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");

  const highlight = Array.isArray(_highlight) ? _highlight.map(escapeRegex) : escapeRegex(_highlight);

  const shouldHighlight = Array.isArray(highlight) ? highlight.filter(part => part.trim().length > 0).length > 0 : highlight.trim() !== "";

  if (!shouldHighlight) return [{ part: value, highlighted: false }];

  const matcher =
    typeof highlight === "string"
      ? highlight.trim()
      : highlight
          .filter(part => part.trim().length !== 0)
          .map(part => part.trim())
          .sort((a, b) => b.length - a.length)
          .join("|");

  const rgEx = new RegExp(`(${matcher})`, "gi");

  return value
    .split(rgEx)
    .map(part => ({ part: part, highlighted: rgEx.test(part) }))
    .filter(({ part }) => part);
}

// Export as a composite component
type ForwardRef<T extends React.ElementType, Props> = React.ForwardRefExoticComponent<{ ref?: React.ComponentPropsWithRef<T>["ref"] } & Props>;
type CommandComponent = ForwardRef<"div", CommandProps> & {
  Root: typeof CommandRoot;
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
// Attach sub-components
Command.Root = CommandRoot;
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
