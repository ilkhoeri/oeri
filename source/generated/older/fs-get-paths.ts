"use server";

import fs from "fs-extra";
import path from "path";
import { getSlug } from "../../utils";
import { log } from "../../../resource/log/development";

import type { InnerRoutes, NestedRoute, SingleRoute } from "../../routes/index";
import { capitalizeFirst, toCamelCase, toSource } from "@/source/utils/text-transform";

/**
function getFilesDir(): string[] {
  const iconsDir = path.join(process.cwd(), "resource/docs/icons");
  try {
    const files = fs.readdirSync(iconsDir);
    return files.filter(file => file.endsWith(".tsx"));
  } catch (err) {
    console.error("Error reading icons directory:", err);
    return [];
  }
}
 */

// with asynchronous
export async function getFilesDir(): Promise<string[]> {
  const iconsDir = path.join(process.cwd(), "resource/docs/icons");
  try {
    const files = await fs.readdir(iconsDir);
    return files.filter(file => file.endsWith(".tsx"));
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

// Function to generate routes dynamically
export async function iconsPath(basePath: string) {
  try {
    return (await fs.readdir(basePath)).filter(file => file.endsWith(".tsx"));
  } catch (error) {
    log.error("Error reading directory:", error);
  }
}

// Function to generate routes dynamically
async function generatePath(sourcePath: string[], basePath: string): Promise<InnerRoutes[]> {
  const routes = [];
  try {
    const folders = await fs.readdir(basePath);

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const isDirectory = (await fs.stat(folderPath)).isDirectory();
      if (isDirectory) {
        routes.push({
          title: toCamelCase(folder),
          href: `/${toSource(sourcePath)}/${folder}`
        });
      }
    }
  } catch (error) {
    log.error("Error reading directory:", error);
  }
  return routes;
}

export async function getPath(sourcePath: string[]): Promise<SingleRoute[]> {
  try {
    const routeData = await generatePath(sourcePath, path.resolve(process.cwd(), `${sourcePath.join("/")}`));
    return [
      {
        title: capitalizeFirst(getSlug(sourcePath)),
        data: routeData
      }
    ];
  } catch (error) {
    log.error("Error generating routes:", error);
    return [];
  }
}

async function generatePaths(sourcePath: string[], basePath: string): Promise<SingleRoute[]> {
  const routes: SingleRoute[] = [];
  try {
    const folders = await fs.readdir(basePath);

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const isDirectory = (await fs.stat(folderPath)).isDirectory();

      if (isDirectory) {
        const subFolders = await fs.readdir(folderPath);
        const hasSubFolders = subFolders.some(async subFolder => {
          const subFolderPath = path.join(folderPath, subFolder);
          return (await fs.stat(subFolderPath)).isDirectory();
        });

        if (hasSubFolders) {
          routes.push({
            title: capitalizeFirst(folder),
            data: await generatePath(sourcePath.concat(folder), folderPath)
          });
        } else {
          const innerRoutes = subFolders.map(subFolder => ({
            title: capitalizeFirst(subFolder),
            href: `/${sourcePath.join("/")}/${folder}/${subFolder}`
          }));
          routes.push({
            title: capitalizeFirst(folder),
            data: innerRoutes
          });
        }
      }
    }
  } catch (error) {
    log("Error reading directory:", error);
  }
  return routes;
}

export async function getPaths(sourcePath: string[]): Promise<NestedRoute[]> {
  try {
    const basePath = path.resolve(process.cwd(), `${sourcePath.join("/")}`);
    const routeData = await generatePaths(sourcePath, basePath);
    return [
      {
        title: capitalizeFirst(getSlug(sourcePath)),
        data: routeData
      }
    ];
  } catch (error) {
    log("Error generating routes:", error);
    return [];
  }
}
