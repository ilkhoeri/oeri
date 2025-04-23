import * as React from "react";
import { Svg } from "./svg";
import { cn, cvx, rem, type cvxProps } from "cretex";
import { UnstyledButton, type UnstyledButtonProps } from "./button";

export interface BurgerProps extends UnstyledButtonProps<"children"> {
  setOpen?: (open: boolean) => void;
  open?: boolean;
  size?: number | string;
  unstyled?: boolean;
}
export const Burger = React.forwardRef<HTMLButtonElement, BurgerProps>(function Burger(_props, ref) {
  const { setOpen, open, unstyled, className, style, size = 32, color = "hsl(var(--color))", ...props } = _props;
  return (
    <UnstyledButton
      {...{
        ref,
        ...getStyles({ classes: "root", open, size, className, unstyled, style, color }),
        onClick: e => {
          setOpen?.(!open);
          props?.onClick?.(e);
        },
        ...props
      }}
    >
      <Svg currentFill="fill" {...getStyles({ classes: "svg", open })}>
        {[...Array(3)].map((_, index) => (
          <path key={index} {...getStyles({ path: String(index) as Index, open, index })} />
        ))}
      </Svg>
    </UnstyledButton>
  );
});

type Index = "0" | "1" | "2";
type Selector = cvxProps<typeof burger>;
type Options = {
  className?: string;
  unstyled?: boolean;
  open?: boolean;
  index?: number;
  style?: React.CSSProperties & { [key: string]: any };
  color?: React.CSSProperties["color"];
  size?: string | number;
};
function getStyles(selector: Selector & Options = {}) {
  const { className, open, index, classes, path, unstyled, style, size, color } = selector;
  return {
    "data-state": classes ? (open ? "open" : "closed") : undefined,
    className: cn(!unstyled && burger(selector), className),
    d: (path ? burger({ path: String(index) as Index }) : undefined) as React.SVGAttributes<SVGPathElement>["d"],
    style: {
      ...(path
        ? {
            transition: "transform .35s ease",
            transform: open ? burger({ isOpen: String(index) as Index }) : "none"
          }
        : undefined),
      ...(selector.classes === "root" ? { "--burger-size": rem(size), "--burger-color": color } : undefined),
      ...style
    } as React.CSSProperties
  };
}

const burger = cvx({
  variants: {
    classes: {
      root: "size-[--burger-size] rounded-[calc(var(--burger-size)/5.333)] text-[--burger-color] border-solid border-[--burger-color] flex items-center justify-center relative cursor-pointer outline-none focus-visible:outline-0",
      svg: "size-[calc(var(--burger-size)/1.333)] shrink-0 overflow-visible [transition:transform_.35s_ease] data-[state=open]:[transition-delay:.15s] data-[state=open]:rotate-45"
    },
    path: {
      "0": "m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z",
      "1": "m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z",
      "2": "m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
    },
    isOpen: {
      "0": "rotate(112.5deg) translate(-27.2%,-80.2%)",
      "1": "rotate(22.5deg) translate(15.5%,-23%)",
      "2": "rotate(112.5deg) translate(-15%,-149.5%)"
    }
  }
});
