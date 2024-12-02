"use server";

import fs from "fs-extra";
import path from "node:path";
import fetch from "node-fetch";
import { log } from "../log/development";

export type RawToJsonProps = {
  file: string;
  raw: string;
};

export async function generateRawToJson(basePath: string, outputPath: string) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    // Baca semua file dalam folder
    const files = await fs.readdir(basePath);

    // Filter file dengan ekstensi .tsx
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    const results: RawToJsonProps[] = [];

    // Iterasi untuk mengambil data mentah dari URL
    for (const file of tsxFiles) {
      const fileName = file.replace(".tsx", ".svg");
      const url = `https://raw.githubusercontent.com/ilkhoeri/oericons/refs/heads/master/resource/svg/${fileName}`;
      try {
        // Fetch data dari URL
        const response = await fetch(url);
        if (!response.ok) {
          log.warn(`Failed to fetch ${url}: ${response.statusText}`);
          continue;
        }

        const raw = await response.text();

        // Tambahkan hasilnya ke JSON
        results.push({ file, raw });
      } catch (error) {
        log.error(`Error fetching SVG for ${file}:`, error);
      }
    }

    // Tulis hasilnya ke file JSON
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

    log.info(`Components JSON generated at ${outputPath}`);
  } catch (error) {
    log.error("Error generating components JSON:", error);
  }
}

generateRawToJson(
  "resource/docs/icons",
  ".contentlayer/generated/resources/icons.json"
);

/**

export async function generateNameFilesToJson(
  basePath: string,
  outputPath: string
) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(outputPath); // Ambil direktori dari outputPath
    await fs.mkdir(outputDir, { recursive: true }); // Buat folder jika belum ada

    // Baca semua file dalam folder
    const files = await fs.readdir(basePath);

    // Filter file dengan ekstensi .tsx
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    // Tulis hasilnya ke file JSON
    await fs.writeFile(outputPath, JSON.stringify(tsxFiles, null, 2));

    log(`Icons JSON generated at ${outputPath}`);
  } catch (error) {
    log.error("Error generating icons JSON:", error);
  }
}


//
interface ComponentExport {
  file: string;
  rendered: string;
}

export async function generateComponentsToJson(
  basePath: string,
  outputPath: string
) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    // Baca semua file dalam folder
    const files = await fs.readdir(basePath);

    // Filter file dengan ekstensi .tsx
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    const results: ComponentExport[] = [];

    // Iterasi untuk membaca dan merender komponen dari setiap file
    for (const file of tsxFiles) {
      const filePath = path.resolve(basePath, file);
      try {
        // Impor modul secara dinamis
        // const myModule = await import(filePath);
        const myModule = React.lazy(() =>
          import(`@/resource/docs/icons/${file}`).then(mod => mod.Icon)
        );

        // Asumsikan bahwa fungsi atau komponen yang ingin dirender bernama `Icon`
        // const Component = myModule;

        if (myModule) {
          // Render komponen ke dalam string HTML
          const rendered = ReactDOMServer.renderToString(
            React.createElement(myModule)
          );

          results.push({ file, rendered });
        } else {
          log.warn(`No export named 'Icon' found in ${file}`);
        }
      } catch (error) {
        log.error(`Error importing ${file}:`, error);
      }
    }

    // Tulis hasilnya ke file JSON
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

    log.info(`Components JSON generated at ${outputPath}`);
  } catch (error) {
    log.error("Error generating components JSON:", error);
  }
}


interface ComponentExport {
  file: string;
  rendered: string;
}

export async function generateComponentsToJson(
  basePath: string,
  outputPath: string
) {
  try {
    // Pastikan folder tujuan ada
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    // Baca semua file dalam folder
    const files = await fs.readdir(basePath);

    // Filter file dengan ekstensi .tsx
    const tsxFiles = files.filter(file => file.endsWith(".tsx"));

    const results: ComponentExport[] = [];

    // Iterasi untuk membaca ekspor dari setiap file
    for (const file of tsxFiles) {
      const filePath = path.resolve(basePath, file);
      try {
        const myModule = React.lazy(() =>
          import(filePath).then(mod => mod.Icon())
        );
        log.warn(JSON.stringify(myModule));

        // Render komponen ke dalam string HTML
        const rendered = ReactDOMServer.renderToString(
          React.createElement(myModule)
        );

        results.push({ file, rendered });
      } catch (error) {
        log.error(`Error importing ${file}:`, error);
      }
    }

    // Tulis hasilnya ke file JSON
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

    log.info(`Components JSON generated at ${outputPath}`);
  } catch (error) {
    log.error("Error generating components JSON:", error);
  }
}

*/
