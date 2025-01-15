import {
  CSSProperties,
  GetStylesApiOptions,
  StyleProp,
  Theme
} from "./factory-types";

export interface ResolveStylesInput {
  theme: Theme;
  styles: _Styles | _Styles[];
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}
export function resolveStyles({
  theme,
  styles,
  props,
  stylesCtx
}: ResolveStylesInput) {
  const arrayStyles = Array.isArray(styles) ? styles : [styles];

  return arrayStyles.reduce<Record<string, any>>((acc, style) => {
    if (typeof style === "function") {
      return { ...acc, ...style(theme, props, stylesCtx) };
    }

    return { ...acc, ...style };
  }, {});
}

interface ResolveStyleInput {
  style: StyleProp | undefined;
  theme: Theme;
}
export function resolveStyle({
  style,
  theme
}: ResolveStyleInput): CSSProperties {
  if (Array.isArray(style)) {
    return [...style].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {}
    );
  }

  if (typeof style === "function") {
    return style(theme);
  }

  if (style == null) {
    return {};
  }

  return style;
}

interface GetThemeStylesOptions {
  theme: Theme;
  themeName: string[];
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  selector: string;
}
export function getThemeStyles({
  theme,
  themeName,
  props,
  stylesCtx,
  selector
}: GetThemeStylesOptions) {
  return themeName
    .map(
      n =>
        resolveStyles({
          theme,
          styles: theme?.components[n]?.styles,
          props,
          stylesCtx
        })[selector]
    )
    .reduce((acc, val) => ({ ...acc, ...val }), {});
}

export type _Styles =
  | undefined
  | Partial<Record<string, CSSProperties>>
  | ((
      theme: Theme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined
    ) => Partial<Record<string, CSSProperties>>);

export interface GetStyleInput {
  theme: Theme;
  themeName: string[];
  selector: string;
  rootSelector: string;
  options: GetStylesApiOptions | undefined;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
  styles: _Styles;
  style: StyleProp | undefined;
}

export function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style
}: GetStyleInput): CSSProperties {
  return {
    ...resolveStyles({ theme, styles, props, stylesCtx })[selector],
    ...resolveStyles({
      theme,
      styles: options?.styles,
      props: options?.props || props,
      stylesCtx
    })[selector],
    ...(rootSelector === selector ? resolveStyle({ style, theme }) : null),
    ...getThemeStyles({ theme, themeName, props, stylesCtx, selector }),
    ...resolveStyle({ style: options?.style, theme })
  };
}
