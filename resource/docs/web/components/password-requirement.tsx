"use client";
import * as React from "react";
import { Svg } from "@/ui/svg";
import { cn } from "@/utils/cn";

export const requirements = (min: number = 10, max: number = 100) => [
  { regex: new RegExp(`^.{${min},${max}}$`), label: `Minimum ${min} characters and maximum ${max} characters` },
  { regex: /[a-z]/, label: "Minimum one lowercase character" },
  { regex: /[A-Z]/, label: "Minimum one uppercase character" },
  { regex: /[0-9]/, label: "Minimum one number" },
  { regex: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "At least one special character, e.g, !@#?" }
];

const meetsSvgMap = {
  true: ["M5 12l5 5l10 -10"],
  false: ["M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"]
} as const;

function getStrengthPassword(psw: string, min: number, required: readonly { regex: RegExp; label: string }[]): number {
  let multiplier = psw.length > min - 1 ? 0 : 1;
  required.forEach(rq => {
    if (!rq.regex.test(psw)) {
      multiplier += 1;
    }
  });
  return Math.max(100 - (100 / (required.length + 1)) * multiplier, 10);
}

type Selector = "root" | "item" | "icon" | "label" | "progressRoot" | "progressIndicator";
interface Requirements {
  regex: RegExp;
  label: string;
}
interface CtxProps {
  value: string;
  onValueChange: (value: SetStateAction<string>) => void;
  requirements: Requirements[];
  strength: number;
  withProgressBars: boolean;
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
export const usePasswordRequirementCtx = () => React.useContext(ctx)!;

interface RequirementState {
  meets(): {
    isPass(): boolean;
  }[];
}
export interface PasswordRequirementProviderProps extends Partial<Omit<CtxProps, "strength">> {
  children: React.ReactNode | ((state: RequirementState) => React.ReactNode);
  strength?: { min?: number; max?: number };
}

export function PasswordRequirementProvider(_props: PasswordRequirementProviderProps) {
  const { children, value: valueProp, onValueChange: onValueChangeProp, requirements: requirementsProp, strength: strengthProp = {}, withProgressBars = false } = _props;

  const { min = 10, max = 100 } = strengthProp;

  const [_value, _setValue] = React.useState<string>("");

  const onValue = valueProp ?? _value;
  const onValueChange = React.useCallback(
    (value: SetStateAction<string>) => {
      const valueState = typeof value === "function" ? value(onValue) : value;
      if (onValueChangeProp) onValueChangeProp(valueState);
      else _setValue(valueState);
    },
    [onValueChangeProp, onValue]
  );

  const required = requirementsProp ?? requirements(min, max);
  const strength = getStrengthPassword(onValue, min, required);
  const isMeets = required.map(rq => ({ isPass: () => rq.regex.test(onValue) }));

  const contextValue = React.useMemo<CtxProps>(
    () => ({
      value: onValue,
      onValueChange,
      requirements: required,
      strength,
      withProgressBars
    }),
    [onValue, onValueChange, required, strength, withProgressBars]
  );

  return (
    <ctx.Provider value={contextValue}>
      {typeof children === "function"
        ? children({
            meets() {
              return isMeets;
            }
          })
        : children}
    </ctx.Provider>
  );
}

interface PasswordRequirementProps extends React.ComponentProps<"ul"> {
  value?: string;
  withProgressBars?: boolean;
  classNames?: Partial<Record<Selector, string>>;
  styles?: Partial<Record<Selector, React.CSSProperties & Record<string, any>>>;
  style?: React.CSSProperties & Record<string, any>;
  requirements?: Requirements[];
  strength?: { min?: number; max?: number };
}
export const PasswordRequirement = React.forwardRef<HTMLUListElement, PasswordRequirementProps>((_props, ref) => {
  const { value: valueProp, role = "list", withProgressBars: withProgressBarsProp = false, style, styles, className, classNames, requirements: requirementsProp, strength: strengthProp = {}, ...props } = _props;

  const { min = 10, max = 100 } = strengthProp;

  const ctx = usePasswordRequirementCtx();
  const value = ctx ? ctx.value : (valueProp ?? "");
  const withProgressBars = ctx ? ctx.withProgressBars : withProgressBarsProp;
  const required = ctx ? ctx.requirements : (requirementsProp ?? requirements(min, max));
  const strength = ctx ? ctx.strength : getStrengthPassword(value, min, required);

  const rqLength = required.length;

  const progressBars = Array(rqLength)
    .fill(0)
    .map((_, index) => {
      const position = value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / rqLength) * 100 ? 100 : 0;
      return (
        <div
          key={index}
          {...{
            "aria-valuemax": 100,
            "aria-valuemin": 0,
            "data-state": "indeterminate",
            "data-max": "100",
            "aria-label": `rqpsw-progress-${index + 1}`,
            role: "progressbar",
            className: cn("relative flex h-[10px] w-full overflow-hidden rounded-full border", classNames?.progressRoot),
            style: styles?.progressRoot
          }}
        >
          <div
            {...{
              "data-state": "indeterminate",
              "data-max": "100",
              className: cn("h-full w-full flex-1 transition-all", strength > 90 ? "bg-[#22c55e]" : strength > 50 ? "bg-[#ca8a04]" : "bg-[#dc2626]", classNames?.progressIndicator),
              style: { ...styles?.progressIndicator, transform: `translateX(-${100 - position}%)` }
            }}
          />
        </div>
      );
    });

  return (
    <ul ref={ref} className={cn("flex w-full flex-col text-[13px] md:col-span-2 md:text-sm", className, classNames?.root)} {...{ role, style: { ...style, ...styles?.root }, ...props }}>
      {withProgressBars && (
        <li role="listitem" className={cn("my-2 grid w-full grid-cols-5 gap-2", classNames?.item)} {...{ style: styles?.item }}>
          {progressBars}
        </li>
      )}
      {required.map((rq, index) => {
        const meets = rq.regex.test(value);
        return (
          <li key={index} role="listitem" data-state={meets ? "pass" : undefined} className={cn("relative flex w-full flex-row flex-nowrap items-start gap-1.5 truncate text-wrap font-normal text-color data-[state=pass]:text-[#22c55e]", classNames?.item)} {...{ style: styles?.item }}>
            <Svg size={12} className={cn("relative top-1", classNames?.icon)} {...{ style: styles?.icon }}>
              {meetsSvgMap[String(meets) as keyof typeof meetsSvgMap].map(i => (
                <path key={i} d={i} />
              ))}
            </Svg>
            <p data-state={meets ? "pass" : undefined} className={classNames?.label} {...{ style: styles?.label }}>
              {rq.label}
            </p>
          </li>
        );
      })}
    </ul>
  );
});
PasswordRequirement.displayName = "PasswordRequirement";
