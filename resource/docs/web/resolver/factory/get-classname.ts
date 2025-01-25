import { merge, cnx, cvxResult } from "cretex";
import { GetStylesApiOptions, Theme } from "./factory-types";

interface GetThemeClassNamesOptions {
  theme: Theme;
  themeName: string[];
  selector: string;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}
export function getThemeClassNames({ themeName, theme, selector, props, stylesCtx }: GetThemeClassNamesOptions) {
  return themeName.map(
    n =>
      resolveClassNames({
        theme,
        classNames: theme?.components[n]?.classNames,
        props,
        stylesCtx
      })?.[selector]
  );
}

interface GetStaticClassNamesInput {
  themeName: string[];
  selector: string;
  classNamesPrefix?: string;
}
/** Returns static component classes, for example, `.Input-wrapper` */
export function getStaticClassNames({ themeName, classNamesPrefix, selector }: GetStaticClassNamesInput) {
  return themeName.map(n => `${classNamesPrefix}-${n}-${selector}`).join(" ");
}

interface GetOptionsClassNamesInput extends Omit<ResolveClassNamesInput, "classNames"> {
  selector: string;
  options: GetStylesApiOptions | undefined;
}
export function getOptionsClassNames({ selector, stylesCtx, options, props, theme }: GetOptionsClassNamesInput) {
  return resolveClassNames({
    theme,
    classNames: options?.classNames,
    props: options?.props || props,
    stylesCtx
  })[selector];
}

interface GetRootClassNameInput {
  rootSelector: string;
  selector: string;
  className: string | undefined;
}
/** Adds `className` to the list if given selector is root */
export function getRootClassName({ rootSelector, selector, className }: GetRootClassNameInput) {
  return rootSelector === selector ? className : undefined;
}

const EMPTY_CLASS_NAMES: Partial<Record<string, string>> = {};

function mergeClassNames(objects: Partial<Record<string, string>>[]) {
  const merged: Partial<Record<string, string>> = {};

  objects.forEach(obj => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = cnx(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });

  return merged;
}

export interface ResolveClassNamesInput {
  theme: Theme;
  classNames: _ClassNames;
  props: Record<string, any>;
  stylesCtx: Record<string, any> | undefined;
}
export function resolveClassNames({ theme, classNames, props, stylesCtx }: ResolveClassNamesInput) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map(item => (typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES));

  return mergeClassNames(resolvedClassNames);
}

interface GetSelectorClassNameInput {
  selector: string;
  classes: (variant?: cvxResult<{ selector: { [key: string]: string } }>) => string;
  unstyled: boolean | undefined;
}
export function getSelectorClassName({ selector, classes, unstyled }: GetSelectorClassNameInput) {
  return unstyled ? undefined : classes({ selector });
}

interface GetVariantClassNameInput {
  options: GetStylesApiOptions | undefined;
  classes: (variant?: cvxResult<{ selector: { [key: string]: string } }>) => string;
  selector: string;
  unstyled: boolean | undefined;
}
/** Returns variant className, variant is always separated from selector with `--`, for example, `tab--default` */
export function getVariantClassName({ options, classes, selector, unstyled }: GetVariantClassNameInput) {
  // return options?.variant && !unstyled ? classes.variant.as[`${selector}--${options.variant}`] : undefined;
  return options?.variant && !unstyled ? classes({ selector }) : undefined;
}

interface GetGlobalClassNamesOptions {
  theme: Theme;
  unstyled: boolean | undefined;
  options: GetStylesApiOptions | undefined;
}
/** Returns classes that are defined globally (focus and active styles) based on options */
export function getGlobalClassNames({ theme, options, unstyled }: GetGlobalClassNamesOptions) {
  return cnx(options?.focusable && !unstyled && theme?.focusClassName, options?.active && !unstyled && theme?.activeClassName);
}

interface GetResolvedClassNamesOptions extends ResolveClassNamesInput {
  selector: string;
}
export function getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }: GetResolvedClassNamesOptions) {
  return resolveClassNames({ theme, classNames, props, stylesCtx })[selector];
}

type __ClassNames =
  | undefined
  | Partial<Record<string, string>>
  | ((theme: Theme, props: Record<string, any>, ctx: Record<string, any> | undefined) => Partial<Record<string, string>>);

export type _ClassNames = __ClassNames | __ClassNames[];

export interface GetClassNameOptions {
  /** Theme object, resolved by hook */
  theme: Theme;
  /** Options for specified selector, may include `classNames` or `className` */
  options: GetStylesApiOptions | undefined;
  /** Prefix for all class names, resolved by hook */
  classNamesPrefix?: string;
  /** `classNames` specified in the hook, only resolved `classNames[selector]` is added to the list */
  classNames: _ClassNames;
  /** Classes object, usually imported from `*.module.css` */
  classes: (variant?: cvxResult<{ selector: { [key: string]: string } }>) => string;
  // classes: Record<string, string>;
  /** Determines whether classes from `classes` should be added to the list */
  unstyled: boolean | undefined;
  /** If set, removes all classes */
  headless?: boolean;
  /** `className` specified in the hook, added to the list if `selector` is `rootSelector` */
  className: string | undefined;
  /** Class part specified in `getStyles` */
  selector: string;
  /** `rootSelector` specified in the hook, determines whether `className` should be added to the list */
  rootSelector: string;
  /** Component props, used as context for `classNames` and `options.classNames` */
  props: Record<string, any>;
  /** Component styles context, used as context for `classNames` and `options.classNames` */
  stylesCtx?: Record<string, any> | undefined;
}

export function getClassName({
  theme,
  options,
  classNames,
  classes,
  unstyled,
  headless,
  stylesCtx,
  className,
  selector,
  rootSelector,
  props
  // classNamesPrefix,
}: GetClassNameOptions) {
  return merge(
    cnx(
      getSelectorClassName({
        selector,
        classes,
        unstyled: unstyled || headless
      }),
      getVariantClassName({ options, selector, classes, unstyled }),
      getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
      getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
      getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
      getRootClassName({ rootSelector, selector, className }),
      options?.className
    )
  );
}
