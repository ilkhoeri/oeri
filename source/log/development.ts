import chalk from "chalk";

export const log = Object.assign(
  function log(message?: any, ...log: any[]) {
    if (process.env.NODE_ENV === "development") console.log(message, ...log);
  },
  {
    error: (...args: unknown[]) => {
      if (process.env.NODE_ENV === "development")
        console.log(chalk.red(...args));
    },
    warn: (...args: unknown[]) => {
      if (process.env.NODE_ENV === "development")
        console.log(chalk.yellow(...args));
    },
    info: (...args: unknown[]) => {
      if (process.env.NODE_ENV === "development")
        console.log(chalk.cyan(...args));
    },
    success: (...args: unknown[]) => {
      if (process.env.NODE_ENV === "development")
        console.log(chalk.green(...args));
    },
    break: () => {
      if (process.env.NODE_ENV === "development") console.log("");
    }
  }
);
