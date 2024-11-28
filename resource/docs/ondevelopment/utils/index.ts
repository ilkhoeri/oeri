export { getCSX } from "./cnx";
export type { CSXType } from "./cnx";

export {
  onChangeStartsWith,
  destructureAnchorHref
} from "./onchange-startwith-input";

export { attr, extendedAttr, getStyleObject } from "./record-types";

export type {
  RecordNested,
  RecordNestedString,
  RecordString,
  RecordNumber,
  RecordBoolean,
  RecordClasses,
  RecordStyles,
  CSSProperties,
  CssVariable,
  CssVariables,
  CssVars,
  CssVarsProp,
  StyleProp,
  RecordElements,
  StyleObject,
  AttrType,
  ExtendedAttrType
} from "./record-types";

export {
  capitalizeFirst,
  capitalizeString,
  capitalizeWords,
  getFirstString,
  lowerCasePunctuation,
  lowerCaseWords,
  sanitizedWord,
  sanitizedToTag,
  sanitizedName,
  truncate,
  camelToKebab,
  sanitizedToParams,
  desanitizeFromParams,
  desanitizeParams,
  kebabToCamelCase,
  toPascalCase
} from "./text-transform";

export { convertBytesToMB } from "./bytes";
export {
  formatPrice,
  formatterIDR,
  formatterIDRK,
  formatterLong
} from "./currency";
export {
  getTimeAgo,
  getTimeInterval,
  longStringDate,
  sortStringDate,
  getPostDate
} from "./time";

export {
  fuzzySearch,
  levenshteinDistance,
  levenshteinDistanceIncludes
} from "./fuzzy-search";

export { UUID } from "./uuid";

// function - placeholder - others
export const PLACEHOLDER_IMAGESRC =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
