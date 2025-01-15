"use client";
import * as React from "react";
import { useId } from "@/hooks/use-id";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { cn, cnx, cvx, rem, type cvxProps } from "str-merge";

const classes = cvx({
  variants: {
    checkerGroup: {
      root: "stylelayer-checkergroup inline-flex flex-col items-start leading-tight",
      label: "relative inline-block font-medium cursor-[inherit] [word-break:break-word] text-[0.875rem] [-webkit-tap-highlight-color:transparent]",
      description: "text-muted-foreground text-xs block m-0 p-0 mt-0.5 leading-tight [word-wrap:break-word] [word-break:break-word] [line-break:anywhere]",
      group: "flex flex-col items-start",
      error: "text-destructive text-xs mt-1 leading-tight [word-wrap:break-word]",
      card: "relative p-4 flex w-full cursor-pointer bg-background hover:bg-muted/40"
    },
    checker: {
      root: "flex relative gap-3 w-max",
      track: "",
      thumb: "",
      trackLabel: "",
      input: "sr-only",
      labelWrapper: "inline-flex items-start flex-col space-y-1.5 select-none",
      label: "cursor-[inherit] relative block text-color text-sm m-0 p-0",
      description: "text-muted-foreground text-xs leading-tight [word-wrap:break-word] [word-break:break-word] [line-break:anywhere]",
      error: "text-destructive text-xs leading-tight [word-wrap:break-word]"
    },
    withAsterisk: {
      true: "after:content-['*'] after:-mt-1 after:text-destructive after:px-1 after:font-semibold"
    }
  }
});

type __KeyVar = keyof cvxProps<typeof classes>;
type __Selector<K extends __KeyVar> = NonNullable<cvxProps<typeof classes>[K]>;
type CSSProperties = React.CSSProperties & { [key: string]: any };
type StylesNames<K extends __KeyVar, Exclude extends string = never> = Omit<
  {
    className?: string;
    style?: CSSProperties;
    classNames?: Partial<Record<__Selector<K>, string>>;
    styles?: Partial<Record<__Selector<K>, CSSProperties>>;
    unstyled?: Partial<Record<__Selector<K>, boolean>>;
  },
  Exclude
>;
type Component<T extends React.ElementType, Exclude extends string = never> = Omit<React.ComponentProps<T>, Exclude> & {
  style?: CSSProperties;
};
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = React.PropsWithoutRef<Component<T, Exclude>>;
export type CheckerType = "switch" | "checkbox" | "radio";
interface __Props {
  size?: (string & {}) | number;
  required?: boolean;
  color?: CSSProperties["color"];
  round?: (string & {}) | number;
  disabled?: boolean;
  labelPosition?: "left" | "right";
  type?: CheckerType;
  indeterminate?: boolean;
  multiple?: boolean;
}
interface CtxProps extends __Props {
  name: string;
  value: string | string[] | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
}

interface __CheckerGroupProps extends __Props {
  readOnly?: boolean;
  checked?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  id?: string;
}

const checkerDefault: CheckerType = "switch";
const ctx = React.createContext<CtxProps | undefined>(undefined);
const useCheckerGroupCtx = () => React.useContext(ctx)!;

export interface CheckerGroupProps
  extends ComponentProps<"div", "children" | "color" | "defaultValue" | "onChange">,
    StylesNames<"checkerGroup">,
    __CheckerGroupProps {
  name?: string;
  children: React.ReactNode;
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  onChange?: (value: string | string[] | null) => void;
  groupProps?: React.PropsWithRef<Component<"div">>;
}
export const CheckerGroup = React.forwardRef<HTMLDivElement, CheckerGroupProps>((_props, ref) => {
  const {
    children, value, defaultValue, onChange, size, labelPosition, readOnly, required, color, round,
    disabled, label, description, className, style, classNames, styles, unstyled, error, checked,
    indeterminate, type = checkerDefault, id: defaulId, name, multiple, groupProps: wp, ...props
  } = _props;

  const id = useId(defaulId);
  const role = cnx(props?.role ?? `${type}group`);
  const _name = useId(name);
  const [_value, setValue] = useUncontrolled({
    value, defaultValue, finalValue: [], onChange
  });
  const stylesApi = { id, styles, label, error, type, required, disabled, unstyled, classNames, description, indeterminate, checked };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
  //   const itemValue = typeof event === "string" ? event : event.currentTarget.value;
  //   if (!readOnly) {
  //     setValue(
  //       typeof event === "string"
  //         ? event
  //         : typeof _value === "string"
  //           ? _value
  //           : _value?.includes(itemValue)
  //             ? _value?.filter(item => item !== itemValue)
  //             : _value === null
  //               ? [..._value!, itemValue]
  //               : [..._value, itemValue]
  //     );
  //   }
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    const itemValue = typeof event === "string" ? event : event.currentTarget.value;
    const multipleValue = Array.isArray(_value) ? (_value.includes(itemValue) ? _value.filter(item => item !== itemValue) : [..._value, itemValue]) : itemValue;
    if (!readOnly) {
      setValue(multipleValue);
    }
  };

  return (
    <ctx.Provider
      value={{ name: _name, value: _value, onChange: handleChange, size, required, color, labelPosition, round, disabled, type, indeterminate, multiple }}
    >
      <div {...{ ref, role, ...checkerGroupStyles("root", { className, style, ...stylesApi }), ...props }}>
        {label && <div {...checkerGroupStyles("label", stylesApi)}>{label}</div>}
        {description && <p {...checkerGroupStyles("description", stylesApi)}>{description}</p>}
        <div
          {...{
            role: wp?.role || "group",
            "aria-labelledby": wp?.["aria-labelledby"] || `${id}-label`,
            "aria-describedby": wp?.["aria-describedby"] || `"${id}-description`,
            ...checkerGroupStyles("group", {
              className: wp?.className,
              style: wp?.style,
              ...stylesApi
            }),
            ...wp
          }}
        >
          {children}
        </div>
        {error && <p {...checkerGroupStyles("error", stylesApi)}>{error}</p>}
      </div>
    </ctx.Provider>
  );
});
CheckerGroup.displayName = "Checker/CheckerGroup";

type PickFromGroup = "error" | "required" | "indeterminate" | "readOnly" | "round" | "labelPosition" | "type";
interface __CheckerCardProps extends ComponentProps<"button", "size" | "color" | "type" | "onChange">,
  Pick<__CheckerGroupProps, PickFromGroup>,
    StylesNames<"checkerGroup"> {
  id?: string;
  dir?: "ltr" | "rtl";
  checked?: boolean;
  withBorder?: boolean;
  round?: (string & {}) | number;
  value?: string;
  name?: string;
  onChange?: (checked: boolean) => void;
}
export const CheckerCard = React.forwardRef<HTMLButtonElement, __CheckerCardProps>((_props, ref) => {
  const {
    dir = "ltr", round = 8, classNames, className, style, styles, unstyled, checked, value,
    onClick, name, onKeyDown, disabled, error, required, indeterminate, readOnly, labelPosition,
    defaultChecked, onChange, type = checkerDefault, ...props
  } = _props;

  const ctx = useCheckerGroupCtx();
  const _name = name || ctx?.name;
  const role = cnx((ctx?.type ?? type) || props?.role);
  const _checked = typeof checked === "boolean" ? checked : value ? (Array.isArray(ctx?.value) ? ctx.value.includes(value) : ctx?.value === value) : false;

  const [_value, setValue] = useUncontrolled({
    value: _checked, defaultValue: defaultChecked, finalValue: false, onChange
  });

  const stylesApi = { round, unstyled, classNames, styles, required, disabled, error, indeterminate, readOnly, checked: _value, labelPosition: ctx?.labelPosition ?? labelPosition };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.nativeEvent.code)) {
      event.preventDefault();
      const siblings = Array.from(document.querySelectorAll<HTMLButtonElement>(`[role="${role}"][name="${_name}"]`));
      const currentIndex = siblings.findIndex(element => element === event.target);
      const nextIndex = currentIndex + 1 >= siblings.length ? 0 : currentIndex + 1;
      const prevIndex = currentIndex - 1 < 0 ? siblings.length - 1 : currentIndex - 1;

      if (event.nativeEvent.code === "ArrowDown") {
        siblings[nextIndex].focus();
        siblings[nextIndex].click();
      }
      if (event.nativeEvent.code === "ArrowUp") {
        siblings[prevIndex].focus();
        siblings[prevIndex].click();
      }
      if (event.nativeEvent.code === "ArrowLeft") {
        siblings[dir === "ltr" ? prevIndex : nextIndex].focus();
        siblings[dir === "ltr" ? prevIndex : nextIndex].click();
      }
      if (event.nativeEvent.code === "ArrowRight") {
        siblings[dir === "ltr" ? nextIndex : prevIndex].focus();
        siblings[dir === "ltr" ? nextIndex : prevIndex].click();
      }
    }
  };

  return (
    <button
      {...{
        ref,
        type: "button",
        role,
        name: _name,
        ...checkerGroupStyles("card", stylesApi),
        onClick: event => {
          onClick?.(event);
          ctx?.onChange(value || "");
          setValue(!_value);
        },
        onKeyDown: handleKeyDown,
        ...props
      }}
    />
  );
});
CheckerCard.displayName = "CheckerCard";

interface __CheckerProps extends __CheckerGroupProps {
  offLabel?: React.ReactNode;
  onLabel?: React.ReactNode;
  icon?: React.ReactNode;
  rootRef?: React.ForwardedRef<HTMLLabelElement>;
  rootProps?: React.PropsWithRef<Component<"label">>;
}

export interface CheckerProps extends ComponentProps<"input", "size" | "children" | "color" | "type">, __CheckerProps, StylesNames<"checker"> {
  id?: string;
}
export const Checker = React.forwardRef<HTMLInputElement, CheckerProps>((_props, ref) => {
  const {
    classNames, className, style, styles, unstyled, color, label, offLabel, onLabel, id, size, round,
    icon, checked, defaultChecked, onChange, labelPosition, description, error, disabled, required,
    rootRef, indeterminate, multiple, type = checkerDefault, rootProps: wp, ...props
  } = _props;

  const uuid = useId(id);
  const ctx = useCheckerGroupCtx();
  const contextProps = ctx
    ? {
        name: props.name ?? ctx.name,
        checked: typeof ctx.value === "string" ? ctx.value === String(props.value) : ctx.value !== null ? ctx.value.includes(String(props.value)) : false,
        onChange: ctx.onChange
      }
    : {};

  const [_checked, handleChange] = useUncontrolled({
    value: contextProps.checked ?? checked, defaultValue: defaultChecked, finalValue: false
  });

  const rest = {
    unstyled,
    classNames,
    styles,
    required,
    type: ctx?.type ?? type,
    size: ctx?.size ?? size,
    color: ctx?.color ?? color,
    round: ctx?.round ?? round,
    disabled: ctx?.disabled ?? disabled,
    indeterminate: ctx?.indeterminate ?? indeterminate,
    labelPosition: ctx?.labelPosition ?? labelPosition,
    error
  };

  return (
    <label
      {...{
        ref: wp?.ref || rootRef,
        htmlFor: uuid,
        ...checkerStyles("root", { className, style, ...rest }),
        ...wp
      }}
    >
      <input
        {...{
          ref,
          id: uuid,
          role: type,
          checked: _checked,
          multiple: ctx?.multiple ?? multiple,
          disabled: ctx?.disabled ?? disabled,
          required: ctx?.required ?? required,
          "data-state": contextProps.checked ? "checked" : undefined,
          type: cnx([(type === "switch" || type === "checkbox") && "checkbox", type === "radio" && "radio"]),
          onChange: event => {
            contextProps.onChange?.(event);
            onChange?.(event);
            handleChange(event.currentTarget.checked);
          },
          ...checkerStyles("input", rest),
          ...props
        }}
      />
      <div {...{"aria-hidden": "true", ...checkerStyles("track", rest)}}>
        {rest.type !== "switch" ? (
          icon || <IconDefault type={rest.type} indeterminate={rest.indeterminate} />
        ) : (
          <span {...checkerStyles("thumb", rest)}>{icon}</span>
        )}
        {type === "switch" && (onLabel || offLabel) && <span {...checkerStyles("trackLabel", rest)}>{_checked ? onLabel : offLabel}</span>}
      </div>
      {(label || description || error) && (
        <div {...checkerStyles("labelWrapper", rest)}>
          {label && <div {...checkerStyles("label", rest)}>{label}</div>}
          {description && <p {...checkerStyles("description", rest)}>{description}</p>}
          {error && typeof error !== "boolean" && <p {...checkerStyles("error", rest)}>{error}</p>}
        </div>
      )}
    </label>
  );
}) as CheckerComponent;
Checker.displayName = "Checker";

interface CheckerIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}
export function IconDefault(
  _props: CheckerIconProps & {
    indeterminate: boolean | undefined;
    type: CheckerType;
  }
) {
  const { indeterminate, size, className, type, ...props } = _props;
  switch (type) {
    case "checkbox":
      return (
        <svg
          {...{
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: cnx(indeterminate ? "0 0 32 6" : "0 0 10 7"),
            fill: "none",
            "aria-hidden": "true",
            className: cn("text-color", className),
            ...props
          }}
        >
          {indeterminate ? (
            <rect width="32" height="6" fill="currentColor" rx="3" />
          ) : (
            <path
              d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          )}
        </svg>
      );

    case "radio":
      return (
        <svg
          {...{
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 5 5",
            fill: "none",
            "aria-hidden": "true",
            className: cn("text-color", className),
            ...props
          }}
        >
          <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
        </svg>
      );

    default:
      return null;
  }
}

function state<T>(val: T) {
  return val ? "true" : undefined;
}
function checkerGroupStyles(selector: __Selector<"checkerGroup">, options: StylesNames<"checkerGroup"> & __CheckerGroupProps = {}) {
  const { unstyled, className, classNames, style, styles, disabled, error, required, label, round, description, checked, labelPosition } = options;
  function selected<T>(select: __Selector<"checkerGroup">, state: T) {
    return selector === select ? (state as T) : undefined;
  }
  return {
    "data-checkergroup": cn(selector),
    "data-required": selected("label", state(required)),
    "aria-disabled": disabled || undefined,
    "data-disabled": disabled || undefined,
    "data-checked": selected("card", checked),
    "aria-checked": selected("card", checked),
    "data-error": selected("root", state(error)),
    "data-label-position": selected("card", labelPosition),
    className: cn(
      !unstyled?.[selector] && [
        selected("group", label || description ? "mt-2.5" : undefined),
        classes({
          checkerGroup: selector,
          withAsterisk: selected("label", state(required))
        })
      ],
      classNames?.[selector],
      className
    ),
    style: {
      ...selected("card", { "--checker-card-round": rem(round) }),
      ...styles?.[selector],
      ...style
    }
  };
}
function checkerStyles(selector: __Selector<"checker">, options: StylesNames<"checker"> & __CheckerProps = {}) {
  const { unstyled, className, classNames, style, styles, disabled, required, error, size = 20, round, labelPosition = "right", type, indeterminate, color = "hsl(var(--constructive))" } = options;
  function selected<T>(select: __Selector<"checker">, state: T) {
    return selector === select ? (state as T) : undefined;
  }
  const rootClass = cnx([type === "switch" && "stylelayer-switch", type === "checkbox" && "stylelayer-checkbox", type === "radio" && "stylelayer-radio"]);
  return {
    "data-error": selected("root", state(error)),
    "data-label-position": selected("root", labelPosition),
    [`data-${type}`]: cn(selector),
    "data-required": selected("label", state(required)),
    "aria-disabled": disabled || undefined,
    "data-disabled": disabled || undefined,
    "data-indeterminate": selected("input", type === "checkbox" && indeterminate ? "true" : undefined),
    className: cn(
      !unstyled?.[selector] && [
        selected("root", rootClass),
        classes({
          checker: selector,
          withAsterisk: selected("label", state(required))
        })
      ],
      classNames?.[selector],
      className
    ),
    style: {
      ...selected("root", rootVars({ type, size, round, color, error })),
      ...selected("error", {
        "--switch-error-size": size === undefined ? undefined : `calc(${rem(size)} - ${rem(2)})`
      }),
      ...styles?.[selector],
      ...style
    }
  };
}
function rootVars({ type, size, round, color, error }: __CheckerProps) {
  const getRound = cnx(round || [type === "switch" && rem(9999), type === "checkbox" && `calc(${rem(size)} * (20 / 100))`, type === "radio" && rem(9999)]);
  const defaultVars = {
    [`--${type}-round`]: getRound,
    [`--${type}-color`]: error ? "hsl(var(--destructive))" : color
  };
  switch (type) {
    case "switch":
      return {
        "--switch-h": `calc(${rem(size)} + 0.125rem)`,
        "--switch-w": `calc((${rem(size)} * 2) + 0.125rem)`,
        "--switch-thumb-margin": `calc(${rem(size)} * (20 / 100))`,
        "--switch-thumb-sz": `calc(${rem(size)} - var(--switch-thumb-margin))`,
        "--switch-label-fz": `calc(${rem(size)} * (35 / 100))`,
        "--switch-thumb-padding": "calc(var(--switch-thumb-margin) / 2)",
        ...defaultVars
      };
    case "checkbox":
      return {
        "--checkbox-sz": rem(size),
        ...defaultVars
      };
    case "radio":
      return {
        "--radio-sz": rem(size),
        ...defaultVars
      };
  }
}

// Export as a composite component
type CheckerComponent = React.ForwardRefExoticComponent<CheckerProps> & {
  Group: typeof CheckerGroup;
  Card: typeof CheckerCard;
};
// Attach sub-components
Checker.Group = CheckerGroup;
Checker.Card = CheckerCard;
