import chalk from "chalk";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Destination = {
  height: number;
};

const LOGOS_INPUTS = [
  "raw/agora/agora (dark).png",
  "raw/agora/agora (light).png",
  "raw/agora/agora icon (dark).png",
  "raw/agora/agora icon (light).png",

  "raw/studio/studio (dark).png",
  "raw/studio/studio (light).png",
  "raw/studio/studio icon (dark).png",
  "raw/studio/studio icon (light).png",

  "raw/storyverse/storyverse (dark).png",
  "raw/storyverse/storyverse (light).png",
];

const ICONS_INPUTS = [
  "raw/agora/agora icon (dark).png",
  "raw/agora/agora icon (light).png",

  "raw/studio/studio icon (dark).png",
  "raw/studio/studio icon (light).png",
];

const LOGOS_DESTINATIONS: Record<string, Destination> = {
  "logos/4k": {
    height: 3840,
  },
  "logos/HD": {
    height: 1080,
  },
  "logos/integrated": {
    height: 300,
  },
};

const ICONS_DESTINATIONS: Record<string, Destination> = {
  "icons/app": {
    height: 64,
  },
  "icons/browser": {
    height: 32,
  },
  "icons/sd": {
    height: 16,
  },
};

const BASE_PATH = path.join(__dirname, "../assets");

sharp.cache(false);

async function compute(sources: string[], destinations: Record<string, Destination>) {
  for (const dest of Object.keys(destinations)) {
    const { height } = destinations[dest];

    for (const file of sources) {
      const filePath = path.normalize(path.join(BASE_PATH, file));
      const fileName = path.basename(filePath);
      const destPath = path.normalize(path.join(BASE_PATH, dest, fileName));

      console.log(chalk.blue(`writing to file`), chalk.green(`"${destPath}"`), chalk.dim(`(from "${filePath}")`));
      await sharp(filePath)
        .resize(null, height)
        .png()
        .toFile(destPath)
        .catch((e) => console.error(`\t`, chalk.red(e.toString().replaceAll("\n", "\n\t"))));
    }
  }
}

console.log(chalk.magenta("\nComputing logos..."));
await compute(LOGOS_INPUTS, LOGOS_DESTINATIONS);
console.log(chalk.magenta("\bComputing icons..."));
await compute(ICONS_INPUTS, ICONS_DESTINATIONS);

console.log("\n", chalk.green(`Computed ${LOGOS_INPUTS.length + ICONS_INPUTS.length} files successfully!`));
