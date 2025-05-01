const DEFAULT_CONJUNCTIONS = ["and", "or", "of", "the", "this", "with", "dan", "atau", "yang", "untuk", "di", "ke", "dari", "oleh", "pada"];

export type FormatTransform = keyof typeof transform;

/** Transforms a given string based on the specified transformation type. */
export const transform = Object.assign(
  {},
  {
    /**
     * @param words - The input string to transform.
     * @returns string
     */
    unformated: (words: string | undefined) => {
      if (!words) return "";
      return words;
    },
    /**
     * @param words - The input string to transform.
     * @returns string exclude {@link DEFAULT_CONJUNCTIONS DEFAULT_CONJUNCTIONS}
     */
    uppercaseFirst: (words: string | undefined) => {
      if (!words) return "";
      return words
        .toLowerCase()
        .split(" ")
        .map((word, index) => (index === 0 || !DEFAULT_CONJUNCTIONS.includes(word) ? toUpper(word) : word))
        .join(" ");
    },
    /**
     * @param words - The input string to transform.
     * @returns string
     */
    uppercase: (words: string | undefined) => {
      if (!words) return "";
      return words
        .split("-")
        .map(word => word.toUpperCase())
        .join(" ");
    },
    /**
     * @param words - The input string to transform.
     * @returns string
     */
    capitalizeFirst: (words: string | undefined) => {
      if (!words) return "";
      return toUpper(
        words
          .split(" ")
          .map(word => toUpper(word.replace(/-/g, " ")))
          .join(" ")
      );
    },
    /**
     * @param words - The input string to transform.
     * @returns string
     */
    capitalize: (words: string | undefined) => {
      if (!words) return "";
      return words
        .split("-")
        .map(word => toUpper(word))
        .join(" ");
    },
    /**
     * @param words - The input string to transform.
     * @returns string
     */
    lowercase: (words: string | undefined) => {
      if (!words) return "";
      return words
        .split(" ")
        .map(word => toLower(word))
        .join(" ");
    }
  }
);

/**
 * Truncates a string to a maximum length, adding an ellipsis if necessary.
 *
 * @param {string} word - The input string to truncate.
 * @param {number} [maxWord=30] - The maximum length of the truncated string, `{default=30}`.
 * @returns {string} - The truncated string.
 */
export function truncate(word: string | null | undefined, maxWord = 30, split: "spaceslice" | "unslice" = "spaceslice"): string {
  if (!word || word.length <= maxWord) return word || "";

  if (split === "spaceslice") {
    const lastSpace = word.lastIndexOf(" ", maxWord);
    if (lastSpace > 0) return word.slice(0, lastSpace) + "...";
  }

  // Fallback or if split is "unslice"
  return word.slice(0, maxWord) + "...";
}

/**
 *
 * @param name The John of Doe
 * @param limit 3
 * @param conjunctions ["of", "the"], {default={@link DEFAULT_CONJUNCTIONS DEFAULT_CONJUNCTIONS}}
 * @returns JD
 */
export function getInitials(name: string, limit: number = 3, conjunctions: string[] = DEFAULT_CONJUNCTIONS): string {
  const limitProvide = Math.min(Math.max(limit, 1), limit);

  if (!name || limitProvide < 1) return "";

  const words = name.split(/\s+/).filter(Boolean);

  if (words.length === 1) return words[0].slice(0, limitProvide).toUpperCase();

  const filteredWords = words.filter(word => !conjunctions.includes(word.toLowerCase()));
  const targetWords = filteredWords.length ? filteredWords : words;
  const initials = targetWords.slice(0, limitProvide).map(word => word[0].toUpperCase());

  return initials.join("").slice(0, limitProvide);
}

/**
 * Converts all words in a string to lowercase and removes punctuation.
 *
 * @param {string} str - The input string.
 * @returns {string} - The processed string.
 */
export function lowerCasePunctuation(str: string): string {
  const words = str.split(" ");
  const lowerCase = words.map(word => toLower(word));
  const withoutPunctuation = lowerCase.map(lower => removePunctuation(lower));
  const punctuationLess = withoutPunctuation.join("-");
  return combineConsecutiveHyphens(punctuationLess);
}

/**
 * Sanitizes a string by converting to lowercase, removing special characters, and replacing spaces with hyphens.
 *
 * @param {string | undefined} words - The input string.
 * @returns {string} - The sanitized string.
 */
export function sanitizedWord(words: string | undefined): string {
  if (!words) return "";
  return words
    .toLowerCase()
    .replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "")
    .replace(/\s{2,}/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/-\s/g, "-")
    .replace(/\s-/g, "-")
    .replace(/\s/g, "-");
}
/**
 * Desanitizes a string, capitalizing words except for conjunctions.
 *
 * @param {string | undefined} words - The input string.
 * @param {string | RegExp} [separator=" "] - The separator for splitting words.
 * @returns {string} - The desanitized string.
 */
export function desanitizeWord(words: string | undefined, separator: string | RegExp = " "): string {
  if (!words) return "";
  return words
    .toLowerCase()
    .split(separator)
    .map((word, index) => {
      if (DEFAULT_CONJUNCTIONS.includes(word) && index !== 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Compares two strings for equality after normalizing.
 *
 * @param {string | undefined | null} word1 - The first string to compare.
 * @param {string | undefined | null} word2 - The second string to compare.
 * @returns {boolean} - True if the strings are equal, otherwise false.
 */
export function compareWords(word1: string | undefined | null, word2: string | undefined | null): boolean {
  if (!word1 || !word2) return false;
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")
      .trim();
  return normalize(word1) === normalize(word2);
}

/**
 * Extracts the first word from a string based on spaces or delimiters.
 *
 * @param {string} name - The input string.
 * @returns {string} - The first word.
 */
export function getFirstString(name: string) {
  const nameParts = name.split(/\s|[-~]/);
  const firstName = nameParts[0];
  return firstName;
}

/**
 * Converts camelCase strings to kebab-case or snake_case.
 *
 * @param {string} words - The input camelCase string.
 * @param {"underscores" | "hyphens"} [kebab="hyphens"] - The desired delimiter.
 * @returns {string} - The converted string.
 */
export function camelToKebab(words: string, kebab: "underscores" | "hyphens" = "hyphens"): string {
  if (words === undefined) return "";
  let kebabCase: string = "$1$2";
  if (kebab === "underscores") kebabCase = "$1_$2";
  if (kebab === "hyphens") kebabCase = "$1-$2";
  return words.replace(/([a-z])([A-Z])/g, kebabCase).toLowerCase();
}

/**
 * Converts kebab-case strings to camelCase.
 *
 * @param {string} words - The input kebab-case string.
 * @returns {string} - The camelCase string.
 */
export function kebabToCamel(words: string): string {
  return words.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

/**
 * Converts kebab-case strings to PascalCase.
 * @param words - The input kebab-case string.
 * @returns - The PascalCase string.
 */
export function toPascal(words: string) {
  return words
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Formats a string or number input for progress display.
 * @param input - The input string or number.
 * @returns - The formatted progress or null if invalid.
 */
export function formatedProgress(input: string | undefined) {
  if (!input) return null;
  if (/^\d+$/.test(input)) return `${input}`;
  return input;
}

/**
 * Splits a string into an array of words, each wrapped in an object.
 * @param words - The input string.
 * @returns - The array of word objects.
 */
export function splitWordsToArray(words: string) {
  const wordsArray = words.split(" ");
  return wordsArray.map(word => ({ text: word }));
}

function toUpper(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function toLower(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1).toLowerCase();
}

function removePunctuation(str: string): string {
  return str.replace(/[.,'"+[\]{}]/g, "").replace(/[^-=!?\w\s]/g, "");
}

function combineConsecutiveHyphens(str: string): string {
  return str.replace(/-+/g, "-");
}

/**
 * @param text `string | null | undefined`
 * @returns string
 * @example
 * console.log(formatText("web-analitics"));  // Output: "Web Analitics"
 * console.log(formatText("webAnalitics"));   // Output: "Web Analitics"
 * console.log(formatText("web_analitics"));  // Output: "Web Analitics"
 * console.log(formatText("WebAnalitics"));   // Output: "Web Analitics"
 */
export function formatTitle(text: string | null | undefined, formatTransform: FormatTransform = "uppercaseFirst"): string {
  if (!text) return "";
  const currentFormat = text.replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
  return transform[formatTransform](currentFormat);
}

const round = (num: number) => Math.round(num * 100) / 100;
export const roundNumber = (value: number) => (isNaN(value) ? 0 : round(value));

type CounterType = number | `${number}` | null | undefined;
export function getPercentage(countIs: CounterType, countAll: CounterType): string {
  const safeValue = (value: number) => (isNaN(value) ? 0 : value);

  const _countIs = safeValue(Number(countIs));
  const _countAll = safeValue(Number(countAll));

  if (_countAll === 0) return "0%"; // Hindari pembagian dengan nol

  const percentage = (_countIs / _countAll) * 100;
  return `${percentage.toFixed(2)}%`; // Format agar lebih rapi
}

// get size helper
export function getByteSize<T>(obj: T): number {
  const json = JSON.stringify(obj);
  // UTF-8 byte size
  return new TextEncoder().encode(json).length;
}

/**
 * @param bytes number
 * @returns string
 */
export function formatBytesToMB(bytes: number | null | undefined) {
  const MB = "MB";
  if (!bytes || bytes === 0) return `0 ${MB}`;
  const mbSize = (bytes / (1024 * 1024)).toFixed(1);
  return `${mbSize} ${MB}`;
}

export function formatBytes<T>(obj: T): string {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const bytes: number = getByteSize(obj);
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * This function will return true if the value is one of JavaScript's `falsy` values, including `NaN`.
 * @param value `T`
 * @returns `value is T`
 */
export function isFalsy<T = unknown>(value: T): value is T {
  return value === false || value === 0 || value === "" || value === null || value === undefined || (typeof value === "number" && Number.isNaN(value));
}

/**
 * Function to filter falsy values from an array
 * @param arr `T[]`
 * @returns `Exclude<T, falsy>[]`
 * @example
 * const mixed = [0, 1, false, true, null, "hello", "", undefined, NaN];
 * const truthyValues = filterFalsy(mixed);
 * // truthyValues: [1, true, "hello"]
 */
export function filterFalsy<T>(arr: T[]): Exclude<T, falsy>[] {
  return arr.filter((item): item is Exclude<T, falsy> => !isFalsy(item));
}

/**
 * Function to get only falsy values
 * @param arr `T[]`
 * @returns `Extract<T, falsy>[]`
 * @example
 * const falsyValues = getFalsy(mixed);
 * // falsyValues: [0, false, null, "", undefined, NaN]
 * getFalsy([1, "", false, "ok"]); // ["", false]
 */
export function getFalsy<T>(arr: T[]): Extract<T, falsy>[] {
  return arr.filter(isFalsy) as Extract<T, falsy>[];
}

export function isNumber<T>(value: T): boolean {
  return !isNaN(Number(value)) && Number(value) > 0;
}

export function validNumber<T, R>(value: T, defaultValue: R): number | R {
  return isNumber(value) ? Number(value) : defaultValue;
}

/**
 * Check if path is a UUID version 4
 * @param input - The input string.
 * @returns
 */
export function isUUID(input: string): boolean {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(input);
}

/**
 * Pola CUID dimulai dengan "c" diikuti 24 karakter alphanumeric
 * @param input `string`
 * @returns `boolean`
 */
export function isCUID(input: string): boolean {
  return /^c[a-z0-9]{24}$/.test(input);
}

/**
 * ObjectId MongoDB adalah 24 karakter hex
 * @param input `string`
 * @returns `boolean`
 */
export function isMongoObjectId(input: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(input);
}

/**
 * Mengecek input apakah valid `uuid` atau `cuid` atau `ObjectId`
 * @param input `string`
 * @returns `boolean`
 */
export function isValidId(input: string): boolean {
  return isUUID(input) || isCUID(input) || isMongoObjectId(input);
}

export function isValidURL(url: string): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol (http or https)
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // domain name
      // '(([a-zA-Z\\d-]+\\.)?[a-zA-Z\\d-]+\\.[a-zA-Z]{2,}|' + // Maksimal satu subdomain atau tidak ada
      "localhost|" + // localhost
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IP (v4)
      "\\[?[a-fA-F\\d:]+\\]?)" + // IP (v6)
      "(\\:\\d+)?" + // port
      "(\\/[-a-zA-Z\\d%@_.~+&:]*)*" + // path
      "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" + // query string
      "(\\#[-a-zA-Z\\d_]*)?$", // fragment
    "i"
  );
  return pattern.test(url);
}

export const strictUrlRegexMultiSubDomain = /^https?:\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[\w-./?%&=]*)?$/;
export const strictUrlRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[\w-./?%&=]*)?$/;
export function isValidUrl(url: string, model: "one-sub-domain" | "multi-sub-domain" = "one-sub-domain") {
  switch (model) {
    case "one-sub-domain":
      return strictUrlRegex.test(url);
    case "multi-sub-domain":
      return strictUrlRegexMultiSubDomain.test(url);

    default:
      return false;
  }
}

export const htmlCharacterEntities = [
  { char: "<", entity: "&lt;" },
  { char: ">", entity: "&gt;" },
  { char: "&", entity: "&amp;" },
  { char: '"', entity: "&quot;" },
  { char: "'", entity: "&apos;" },
  { char: "{", entity: "&#123;" },
  { char: "}", entity: "&#125;" },
  { char: "[", entity: "&#91;" },
  { char: "]", entity: "&#93;" },
  { char: "(", entity: "&#40;" },
  { char: ")", entity: "&#41;" },
  { char: "#", entity: "&#35;" },
  { char: "%", entity: "&#37;" },
  { char: "+", entity: "&#43;" },
  { char: "=", entity: "&#61;" },
  { char: "`", entity: "&#96;" },
  { char: "~", entity: "&#126;" },
  { char: "/", entity: "&#47;" },
  { char: "\\", entity: "&#92;" },
  { char: "^", entity: "&#94;" },
  { char: "|", entity: "&#124;" },
  { char: ":", entity: "&#58;" },
  { char: ";", entity: "&#59;" },
  { char: ",", entity: "&#44;" },
  { char: ".", entity: "&#46;" },
  { char: "?", entity: "&#63;" },
  { char: "!", entity: "&#33;" },
  { char: "@", entity: "&#64;" },
  { char: "$", entity: "&#36;" },
  { char: "*", entity: "&#42;" },
  { char: "_", entity: "&#95;" },
  { char: "-", entity: "&#45;" },
  { char: " ", entity: "&nbsp;" }
];
