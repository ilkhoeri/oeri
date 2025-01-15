"use client";
import { useId } from "@/hooks/use-id";
import * as React from "react";
import { cn, cvx, inferType, merge, ocx, rem, type cvxProps } from "str-merge";

export const classes = cvx({
  assign:
    "stylelayer-inputs relative flex h-[--input-h,var(--input-sz)] w-[--input-w,var(--input-sz)] max-w-[--input-w,100%] cursor-pointer appearance-none rounded-lg border bg-background px-3 py-2 text-sm ring-offset-constructive/35 transition-colors [-moz-appearance:none] [-webkit-appearance:none] placeholder:text-muted-foreground focus-visible:border-constructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 focus-visible:placeholder:text-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50",
  variants: {
    variant: {
      button: "min-w-9 justify-center active:scale-95 transition-transform",
      checkbox:
        "items-center justify-center rounded-md p-0 align-middle outline-0 transition-colors duration-200 delay-200 checked:bg-color checked:delay-0 data-[state=indeterminate]:bg-color",
      color: "rounded-xl bg-transparent bg-none py-0 px-0",
      date: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      "datetime-local": "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      email:
        "cursor-text justify-start [--bg-required:hsl(var(--background))_var(--bg-atmail)] focus-visible:[--bg-required:hsl(var(--background))] [&:where(:is(:not([value=''])))]:[--bg-required:hsl(var(--background))]",
      file: "text-muted-foreground [&:where(:is(:not([value=''])))]:text-color [&:where(:is(:not([value=''])))]:border-constructive [&:where(:is(:not([value=''])))]:bg-constructive/30 [&:where(:is(:not([value=''])))]:ring-constructive break-words items-center justify-center rounded-2xl border-2 file:border-constructive outline-none ring-1 ring-transparent ring-offset-2 ring-offset-background pb-0 pt-[25%] px-[15%] border-dashed file:border-0 file:bg-transparent file:text-sm file:font-medium",
      hidden: "sr-only !hidden",
      image:
        "bg-center text-transparent align-middle items-center justify-center rounded-2xl border py-0 px-0 outline-0 outline-none [&>*]:border-0 [&>*]:outline-0 [&>*]:outline-none",
      month: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      number: "cursor-text justify-start",
      password: "cursor-text justify-start",
      radio: "rounded-full px-0 py-0 items-center justify-center border-muted-foreground checked:border-color",
      range:
        "h-max items-center overflow-x-hidden rounded-full border-0 bg-transparent p-0 text-constructive [--thumb-border:calc(var(--thumb-sz)/3.5)] [--thumb-inner-color:--track-color-active] [--thumb-outer-color:hsl(var(--pure-white))] [--thumb-sz:1rem] [--track-color-active:hsl(var(--constructive))] [--track-height:calc(var(--thumb-sz)/2)]",
      reset: "min-w-9 justify-center active:scale-95 transition-transform",
      search: "cursor-text justify-start",
      submit: "min-w-9 justify-center active:scale-95 transition-transform",
      tel: "cursor-text justify-start",
      text: "cursor-text justify-start",
      time: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      url: "cursor-text justify-start",
      week: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      pin: "block rounded-md border bg-transparent p-0 text-center text-[20px] font-bold leading-[20px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[24px] placeholder:text-muted-foreground/80 focus:placeholder:opacity-0 focus-visible:border-transparent focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0"
    }
  }
});
const classesWrapper = cvx({
  variants: {
    selector: {
      root: "relative leading-[1.55]",
      label: "inline-block break-words text-[0.875rem] font-medium",
      description: "text-muted-foreground text-xs leading-tight [word-wrap:break-word] [word-break:break-word] [line-break:anywhere]",
      error: "text-destructive text-xs leading-tight [word-wrap:break-word]",
      required: "cursor-[inherit] relative block text-sm m-0 p-0 -mt-1 text-destructive px-1 font-semibold"
    }
  }
});

type __Variant = NonNullable<cvxProps<typeof classes>["variant"]>;
type __Selector = NonNullable<cvxProps<typeof classesWrapper>["selector"]>;
type CSSProperties = React.CSSProperties & Record<string, any>;
type StylesNames<T extends string, Exclude extends string = never> = Omit<
  {
    className?: string;
    style?: CSSProperties;
    classNames?: Partial<Record<T, string>>;
    styles?: Partial<Record<T, CSSProperties>>;
    unstyled?: boolean | Partial<Record<T, boolean>>;
  },
  Exclude
>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__Selector, Exclude> &
  React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | Exclude>>;

type CtxProps = {
  getStyles(selector: __Selector, options?: Options): inferType<typeof getStyles>;
  offsetTop: boolean;
  offsetBottom: boolean;
  describedBy: string | undefined;
  inputId: string | undefined;
  labelId: string | undefined;
};

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useInputWrapperCtx = () => React.useContext(ctx)!;

function is<T>(state: T) {
  return (state as T) ? "true" : undefined;
}

export function getInputOffsets(
  inputWrapperOrder: ("label" | "input" | "description" | "error")[],
  { hasDescription, hasError }: { hasDescription: boolean; hasError: boolean }
) {
  const inputIndex = inputWrapperOrder.findIndex(part => part === "input");
  const aboveInput = inputWrapperOrder.slice(0, inputIndex);
  const belowInput = inputWrapperOrder.slice(inputIndex + 1);
  const offsetTop = (hasDescription && aboveInput.includes("description")) || (hasError && aboveInput.includes("error"));
  const offsetBottom = (hasDescription && belowInput.includes("description")) || (hasError && belowInput.includes("error"));
  return { offsetBottom, offsetTop };
}

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

function getDefaultSize({ variant, size }: InputStyles): InputStyles["size"] {
  if (size) return size;
  switch (variant) {
    case "text":
      return { h: 36, w: "100%" };
    case "checkbox":
      return 22;
    case "radio":
      return 20;
    case "file":
      return { h: 208, w: 320 };
    case "image":
      return { h: 208, w: 320 };
    case "pin":
      return 40;
    case "color":
      return 32;
    default:
      return { h: 36, w: "100%" };
  }
}

type Options = StylesNames<__Selector> & { size?: (string & {}) | number };
function getStyles(selector: __Selector, options: Options = {}) {
  const { className, classNames, style, styles, unstyled, size } = options;

  const isUnstyled = typeof unstyled === "object" ? unstyled?.[selector] : unstyled;
  return {
    className: cn(!isUnstyled && classesWrapper({ selector }), classNames?.[selector], className),
    style: ocx(
      styles?.[selector],
      style,
      selector === "label" && { "--input-asterisk-color": undefined },
      selector === "error" && { "--input-error-size": size === undefined ? undefined : `calc(${rem(size)} - ${rem(2)})` },
      selector === "description" && { "--input-description-size": size === undefined ? undefined : `calc(${rem(size)} - ${rem(2)})` }
    )
  };
}

type InputStyles = {
  type?: React.HTMLInputTypeAttribute;
  unstyled?: boolean;
  className?: string;
  style?: CSSProperties;
  size?: (number | (string & {})) | { h?: React.CSSProperties["height"]; w?: React.CSSProperties["width"] };
} & cvxProps<typeof classes>;
function getInputStyles(options: InputStyles = {}) {
  const { className, style, type, unstyled, variant, size } = options;
  const defaultVariants = (variant || type) as __Variant;
  const sizing = getDefaultSize({ size, variant: defaultVariants });
  return {
    className: cn(!unstyled && classes({ variant: defaultVariants }), className),
    style: {
      ...style,
      ...(typeof sizing === "object" ? { "--input-h": rem(sizing.h), "--input-w": rem(sizing.w) } : { "--input-sz": rem(sizing) })
    }
  };
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style" | "size" | "placeholder">, InputStyles {
  indeterminate?: boolean;
  placeholder?: string | null | undefined;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>((_props, ref) => {
  const {
    className,
    style,
    value,
    disabled,
    type = "text",
    spellCheck = false,
    autoComplete = "off",
    unstyled,
    indeterminate,
    variant,
    size,
    placeholder,
    "aria-invalid": aI = "false",
    "aria-disabled": aD,
    onChange,
    id,
    ...props
  } = _props;
  const [numb, setNumb] = React.useState(value || "");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const ctx = useInputWrapperCtx();

  const mergedRef = React.useMemo(() => {
    if (!ref) return inputRef;
    return (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };
  }, [ref]);

  React.useEffect(() => {
    if (type === "checkbox" && indeterminate !== undefined && inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const numeric = e.target.value.replace(/[^0-9]/g, "");
      if (/^\d*$/.test(numeric)) setNumb(numeric);
    }
    if (type === "date") {
      formatDate(new Date(e.target.value));
    }
    onChange?.(e);
  };

  return (
    <input
      {...{
        ref: mergedRef,
        disabled,
        spellCheck,
        autoComplete,
        placeholder: placeholder === null ? undefined : (placeholder ?? type),
        id: ctx?.inputId ?? id,
        onChange: handleChange,
        "aria-invalid": aI,
        "aria-disabled": aD || (disabled ? "true" : undefined),
        "data-state": indeterminate ? "indeterminate" : undefined,
        type: type === "number" ? "text" : type,
        value: type === "number" ? numb : value,
        ...getInputStyles({ variant, type, className, style, unstyled, size }),
        ...props
      }}
    />
  );
}) as InputComponent;
Input.displayName = "Input";

export interface __InputWrapperProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  withAsterisk?: boolean;
  labelProps?: Record<string, any>;
  descriptionProps?: Record<string, any>;
  errorProps?: Record<string, any>;
  inputContainer?: (children: React.ReactNode) => React.ReactNode;
  inputWrapperOrder?: ("label" | "input" | "description" | "error")[];
}

export interface InputWrapperProps extends __InputWrapperProps, ComponentProps<"div"> {
  __staticSelector?: string;
  // __stylesApiProps?: Record<string, any>;
  id?: string;
  size?: (string & {}) | number;
  labelElement?: "label" | "div";
}
export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>((_props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    size,
    label,
    error,
    description,
    labelProps,
    descriptionProps,
    errorProps,
    children,
    withAsterisk,
    id,
    required,
    __staticSelector,
    labelElement = "label",
    inputContainer = children => children,
    inputWrapperOrder = ["label", "description", "input", "error"],
    ...props
  } = _props;

  const idBase = useId(id);
  const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
  const errorId = errorProps?.id || `${idBase}-error`;
  const descriptionId = descriptionProps?.id || `${idBase}-description`;
  const inputId = idBase;
  const hasError = !!error && typeof error !== "boolean";
  const hasDescription = !!description;
  const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : undefined;
  const labelId = labelProps?.id || `${idBase}-label`;

  const isUnstyled = (selector: __Selector) => (typeof unstyled === "object" ? unstyled?.[selector] : unstyled);
  const stylesApi = { size, __staticSelector };

  const _label = label && (
    <InputLabel
      key="label"
      labelElement={labelElement}
      id={labelId}
      htmlFor={inputId}
      required={isRequired}
      unstyled={isUnstyled("label")}
      className={merge(classNames?.label, labelProps?.className)}
      style={ocx(styles?.label, labelProps?.style)}
      {...stylesApi}
      {...labelProps}
    >
      {label}
    </InputLabel>
  );

  const _description = hasDescription && (
    <InputDescription
      key="description"
      {...descriptionProps}
      {...stylesApi}
      size={descriptionProps?.size || stylesApi.size}
      id={descriptionProps?.id || descriptionId}
      unstyled={isUnstyled("description")}
      className={merge(classNames?.description, descriptionProps?.className)}
      style={ocx(styles?.description, descriptionProps?.style)}
    >
      {description}
    </InputDescription>
  );

  const _input = <React.Fragment key="input">{inputContainer!(children)}</React.Fragment>;

  const _error = hasError && (
    <InputError
      key="error"
      {...errorProps}
      {...stylesApi}
      size={errorProps?.size || stylesApi.size}
      id={errorProps?.id || errorId}
      unstyled={isUnstyled("error")}
      className={merge(classNames?.error, errorProps?.className)}
      style={ocx(styles?.error, errorProps?.style)}
    >
      {error}
    </InputError>
  );

  const content = inputWrapperOrder!.map(part => {
    switch (part) {
      case "label":
        return _label;
      case "input":
        return _input;
      case "description":
        return _description;
      case "error":
        return _error;
      default:
        return null;
    }
  });

  return (
    <ctx.Provider value={{ getStyles, describedBy, inputId, labelId, ...getInputOffsets(inputWrapperOrder!, { hasDescription, hasError }) }}>
      <div ref={ref} data-error={is(!!error)} {...getStyles("root", { className, classNames, style, styles, unstyled, ...stylesApi })} {...props}>
        {content}
      </div>
    </ctx.Provider>
  );
});
InputWrapper.displayName = "InputWrapper";

export interface InputLabelProps extends ComponentProps<"label", "classNames" | "styles" | "unstyled"> {
  unstyled?: boolean;
  __staticSelector?: string;
  required?: boolean;
  size?: (string & {}) | number;
  labelElement?: "label" | "div";
}
export const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>((_props, ref) => {
  const { className, style, unstyled, labelElement: el = "label", size, required, htmlFor, onMouseDown, children, __staticSelector, ...props } = _props;

  const ctx = useInputWrapperCtx();
  const _getStyles = ctx?.getStyles ?? getStyles;

  const Comp = el;
  return (
    <Comp
      // @ts-ignore
      ref={ref}
      htmlFor={el === "label" ? htmlFor : undefined}
      {..._getStyles("label", { className, style, unstyled, size })}
      data-required={required}
      aria-required={required}
      onMouseDown={e => {
        onMouseDown?.(e as React.MouseEvent<HTMLLabelElement, MouseEvent>);
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      }}
      {...props}
    >
      {children}
      {required && (
        <span {...getStyles("required")} aria-hidden>
          {" *"}
        </span>
      )}
    </Comp>
  );
});
InputLabel.displayName = "InputLabel";

export interface InputDescriptionProps extends ComponentProps<"p", "classNames" | "styles" | "unstyled"> {
  unstyled?: boolean;
  __staticSelector?: string;
  __inheritStyles?: boolean;
  size?: (string & {}) | number;
}
export const InputDescription = React.forwardRef<HTMLParagraphElement, InputDescriptionProps>((_props, ref) => {
  const { className, style, unstyled, size, __staticSelector, __inheritStyles = true, ...props } = _props;
  const ctx = useInputWrapperCtx();
  const _getStyles = (__inheritStyles && ctx?.getStyles) || getStyles;
  return <p ref={ref} {..._getStyles("description", { className, style, unstyled, size })} {...props} />;
});
InputDescription.displayName = "InputDescription";

export interface InputErrorProps extends ComponentProps<"p", "classNames" | "styles" | "unstyled"> {
  unstyled?: boolean;
  __staticSelector?: string;
  __inheritStyles?: boolean;
  size?: (string & {}) | number;
}
export const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>((_props, ref) => {
  const { className, style, unstyled, size, __staticSelector, __inheritStyles = true, ...props } = _props;
  const ctx = useInputWrapperCtx();
  const _getStyles = (__inheritStyles && ctx?.getStyles) || getStyles;
  return <p ref={ref} {..._getStyles("error", { className, style, unstyled, size })} {...props} />;
});
InputError.displayName = "InputError";

// Export as a composite component
type InputComponent = React.ForwardRefExoticComponent<InputProps> & {
  Wrapper: typeof InputWrapper;
  Label: typeof InputLabel;
  Description: typeof InputDescription;
  Error: typeof InputError;
};
// Attach sub-components
Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Description = InputDescription;
Input.Error = InputError;
