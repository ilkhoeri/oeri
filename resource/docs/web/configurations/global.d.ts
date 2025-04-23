type RequiredKeys<T> = T extends string ? T | `${T}.required` : never;

/** Parses a key string like `'field-required'` into { key: 'field', required: true } */
type SplitKey<K> = K extends `${infer Key}.required` ? { key: Key; required: true } : { key: K; required: false };

/** Extracts keys from `K` that should be optional or required based on suffix. */
type ExtractParsedKey<T, K extends string, IsRequired extends boolean> = {
  [P in K]: SplitKey<P> extends infer R ? (R extends { key: infer K2; required: infer R2 } ? (K2 extends keyof T ? (R2 extends IsRequired ? K2 : never) : never) : never) : never;
}[K];

/** Builds union of key names parsed from `K` (ignoring suffix). */
type ParsedKeyUnion<K extends string> = {
  [P in K]: SplitKey<P>["key"];
}[K];

/**
 * Joins two string keys `K` and `P` with a dot for key paths.
 * Example: Join<'a', 'b'> = 'a.b'
 */
type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

/**
 * Used to decrease depth level in recursive type `Paths<T, D>`.
 * Extend this array to allow deeper nesting.
 */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

type IgnoringSuffix<T> = Date | string[] | number[] | Array<T>;

type DeepValueType<T, P extends string> = P extends `${infer K}.${infer Rest}` ? (K extends keyof T ? DeepValueType<T[K], Rest> : never) : P extends keyof T ? T[P] : never;

declare global {
  type nullable = null | undefined;
  type falsy = false | 0 | "" | null | undefined | (number & { __falsyNaN__: void });
  type Booleanish = boolean | "true" | "false";
  type Direction = "ltr" | "rtl";
  /**
   * A utility type that infers the return type of a given function type.
   *
   * @template T - The input type, which should ideally be a function.
   * @returns The inferred return type of the function if `T` is a function type; otherwise, `never`.
   *
   * @example
   * const MyFunction = () => '';
   * type Result = inferType<typeof MyFunction>; // Result will be `string`.
   *
   * @example
   * type NotAFunction = string | number;
   * type Result = inferType<NotAFunction>; // Result will be `never`.
   */
  type InferType<T> = T extends (...args: any[]) => infer R ? R : never;

  /**
   * Recursively generates dot-separated key paths from a nested object `T`.
   * Stops recursion at arrays.
   *
   * Example:
   * ```ts
   * type Example = { a: { b: { c: number }, d: string[] } };
   * type Paths = DeepPaths<Example>; // "a" | "a.b" | "a.b.c" | "a.d"
   * ```
   */
  type DeepPaths<T, Prev extends string = ""> = {
    [K in keyof T & string]: T[K] extends object
      ? T[K] extends Array<T>
        ? `${Prev}${K}` // Array, stop recursion
        : `${Prev}${K}` | `${Prev}${K}.${DeepPaths<T[K], "">}`
      : `${Prev}${K}`;
  }[keyof T & string];

  /**
   * Recursively generates dot-separated key paths from a nested object `T`,
   * up to a specified maximum depth `D` (default: 4).
   *
   * Example:
   * ```ts
   * type Example = { a: { b: { c: number }, d: string[] } };
   * type Paths = Paths<Example, 2>; // "a" | "a.b" | "a.d"
   * ```
   */
  type Paths<T, D extends number = 4> = [D] extends [never]
    ? never
    : T extends object
      ? {
          [K in keyof T & string]: T[K] extends IgnoringSuffix<T[K]> ? K : T[K] extends object ? K | Join<K, Paths<T[K], Prev[D]>> : K;
        }[keyof T & string]
      : never;

  /** Merges intersected types into a single flat object type. @merges `{a} & {b}` to `{a, b}` */
  type Merge<T> = {
    [K in keyof T]: T[K];
  };

  /**
   * Transforms the properties of an object type `T` into nullable types, with fine-grained control over which keys become optional.
   *
   * @template T The base type to transform. Can be an object or a primitive.
   * @template K Keys of `T` to make optional + nullable, or suffixed with `.required` to make them required + nullable.
   *             - If omitted (`never`), all keys become optional + nullable.
   *             - Example: `'name' | 'age.required'`
   * @template N The `nullable` type to apply. Defaults to `null`.
   *
   * @example
   * type User = {
   *   id: string;
   *   name: string;
   *   age: number;
   * };
   *
   * // All keys optional + nullable (default behavior)
   * type A = Nullable<User>;
   * // Result: { id?: string | null; name?: string | null; age?: number | null; }
   *
   * // Specific keys control: 'id' optional + nullable, 'name' required + nullable
   * type B = Nullable<User, 'id' | 'name.required', null | undefined>;
   * // Result: { id?: string | null | undefined; name: string | null | undefined; age: number; }
   *
   * // Applied to primitive type (e.g., string)
   * type C = Nullable<string>;
   * // Result: string | null
   */
  type Nullable<T, K extends RequiredKeys<keyof T> | void = never, N extends nullable = null> = T extends object
    ? [K] extends [never]
      ? { [P in keyof T]?: T[P] | N }
      : [K] extends [void]
        ? { [P in keyof T]: T[P] | N }
        : Merge<
            {
              [P in ExtractParsedKey<T, K, true>]: T[P] | N;
            } & {
              [P in ExtractParsedKey<T, K, false>]?: T[P] | N;
            } & {
              [P in Exclude<keyof T, ParsedKeyUnion<K>>]: T[P];
            }
          >
    : T | N;

  /** Extended construct a type with the properties of T except for those in type K. */
  type Except<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

  type NonNullables<T> = {
    [K in keyof Required<T>]: NonNullable<T[K]>;
  };
  //Clarity
  // type NonNullableConstructor<T, N = never> = T extends object ? { [K in keyof Required<T>]: NonNullable<T[K]> | N } : NonNullable<T> | N;
  type NonNullableConstructor<T, N = never> = T extends object
    ? T extends Function
      ? NonNullable<T> | N
      : T extends Date
        ? NonNullable<T> | N
        : T extends Array<T>
          ? NonNullable<T> | N
          : {
              [K in keyof Required<T>]: NonNullableConstructor<T[K], N>;
            }
    : NonNullable<T> | N;

  type KeysConstructor<U extends [string, unknown]> = {
    [K in U as K[0]]: `${K[0]}-${Extract<keyof K[1], string>}`;
  }[U[0]];
}

export {}; // <- Required (DO NOT REMOVE), so that TypeScript treats this as a module and applies the global declaration.
