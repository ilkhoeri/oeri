import chalk from "chalk";

function getEnv() {
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  return "development";
}

export const log = Object.assign(
  function log(message?: any, ...log: any[]) {
    if (getEnv() !== "production") console.log(message, ...log);
  },
  {
    error: (...args: unknown[]) => {
      if (getEnv() !== "production") console.log(chalk.red("⛔ ", ...args));
    },
    warn: (...args: unknown[]) => {
      if (getEnv() !== "production") console.log(chalk.yellow("⚠️ ", ...args));
    },
    info: (...args: unknown[]) => {
      if (getEnv() !== "production") console.log(chalk.cyan("⚡ ", ...args));
    },
    success: (...args: unknown[]) => {
      if (getEnv() !== "production") console.log(chalk.green("✨ ", ...args));
    },
    break: () => {
      if (getEnv() !== "production") console.log("");
    }
  }
);
