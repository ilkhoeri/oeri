export enum Cookies {
  dir = "__dir",
  theme = "__theme",
  isOpenAside = "__is_open_aside"
}

export type Theme = "dark" | "light" | "system";

export interface UserAgent {
  isBot: boolean;
  ua: string;
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  engine: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  cpu: {
    architecture?: string;
  };
}
