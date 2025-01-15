import { useClipboard } from "@/hooks/use-clipboard";

type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}

export function useProps<T extends Record<string, any>, U extends Partial<T> = {}>(
  defaultProps: U,
  props: T
): T & {
  [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
} {
  return { ...defaultProps, ...filterProps(props) };
}

export interface CopyButtonProps {
  children: (payload: { copied: boolean; copy: () => void }) => React.ReactNode;
  value: string;
  timeout?: number;
}

const defaultProps: Partial<CopyButtonProps> = {
  timeout: 1000
};

export function CopyButton(props: CopyButtonProps) {
  const { children, timeout, value, ...others } = useProps(defaultProps, props);
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);
  return <>{children({ copy, copied: clipboard.copied, ...others })}</>;
}
