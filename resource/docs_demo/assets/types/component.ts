import React from "react";

export type CSSProperties = React.CSSProperties & { [key: string]: any };
type Component<T extends React.ElementType, Exclude extends string = never> = Omit<React.ComponentProps<T>, Exclude> & {
  style?: CSSProperties;
};
export type ComponentProps<T extends React.ElementType, Exclude extends string = never> = React.PropsWithoutRef<Component<T, Exclude>>;
export type ComponentPropsWithRef<T extends React.ElementType, Exclude extends string = never> = React.PropsWithRef<Component<T, Exclude>>;
