// initialValue -> Extracted from Params
export type ExtractInitialValue<Params> = Params extends { initialValue: infer T } ? T | undefined | null : any;

export type ConfiguratorControl<Type extends string, Params extends Record<string, any>> = {
  type: Type;
  prop: string;
  libraryValue: ExtractInitialValue<Params>;
  transformLabel?: boolean;
} & Params;
