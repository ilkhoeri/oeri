"use client";

import * as React from "react";
import { twMerge, cvx, cn } from "str-merge";
import {
  capitalizeWords,
  sanitizedToParams
} from "@/modules/ondevelopment/utils";

const inputVariants = cvx({
  variants: {
    variant: {
      inputBase: "input_classt",
      inputPassword: "input_class",
      inputPin:
        "block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0"
    }
  }
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  unstyled?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function (
  {
    className,
    value,
    disabled,
    onChange,
    type = "text",
    spellCheck = false,
    autoComplete = "off",
    unstyled,
    ...props
  },
  ref
) {
  const [numb, setNumb] = React.useState(value ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = e.target.value.replace(/[^0-9]/g, "");
    if (/^\d*$/.test(numeric)) {
      setNumb(numeric);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      {...{
        ref,
        disabled,
        spellCheck,
        autoComplete,
        onChange: handleChange,
        "aria-invalid": "false",
        "aria-disabled": disabled ? "true" : undefined,
        type: type === "number" ? "text" : type,
        value: type === "number" ? numb : value,
        className: twMerge(
          !unstyled &&
            "max-w-full aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50",
          !unstyled && inputVariants({ variant: "inputBase" }),
          className
        ),
        ...props
      }}
    />
  );
});
Input.displayName = "Input";

export function FilterDocs({
  id,
  value,
  onChange,
  className,
  autoFocus = true
}: {
  id: string;
  value: string;
  className?: string;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <input
        type="text"
        name={sanitizedToParams(id)}
        id={sanitizedToParams(id)}
        value={value}
        onChange={onChange}
        placeholder="Search"
        autoComplete="true"
        autoFocus={autoFocus}
        className={twMerge(
          "peer mb-12 mt-1 w-full min-w-full border-b bg-transparent pb-3 leading-none transition-colors placeholder:min-h-8 placeholder:leading-none placeholder-shown:bg-transparent autofill:bg-transparent valid:bg-transparent focus:bg-transparent focus-visible:border-b-color focus-visible:outline-0 focus-visible:ring-0",
          className
        )}
      />
      <label
        role="presentation"
        htmlFor={sanitizedToParams(id)}
        className={cn(
          "absolute left-0 z-9 cursor-pointer font-bold tracking-normal transition-all",
          value
            ? "top-[-24px] text-[100%]"
            : "translate-y-0 text-h3 peer-focus:top-[-28px] peer-focus:text-[100%] peer-focus-visible:top-[-28px] peer-focus-visible:text-[100%]"
        )}>
        {capitalizeWords(id)}
      </label>
    </>
  );
}
