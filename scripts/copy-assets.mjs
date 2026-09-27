// Copies runtime assets from node_modules into /public so the browser can load
// them from our own origin:
//  - the pdf.js worker (used by the live preview) into a versioned folder, so
//    it can be cached forever and always matches the bundled pdf.js version;
//  - the TTF fonts the PDF templates embed (all with full Hungarian coverage).
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

function packageDir(name) {
  try {
    return dirname(require.resolve(`${name}/package.json`));
  } catch {
    return null;
  }
}

/* --------------------------------- pdf.js --------------------------------- */

const pdfjsDir = packageDir("pdfjs-dist");
if (pdfjsDir) {
  const { version } = JSON.parse(readFileSync(join(pdfjsDir, "package.json"), "utf8"));
  const publicDir = join(root, "public", "pdfjs");
  const worker = join(publicDir, version, "pdf.worker.min.mjs");
  if (!existsSync(worker)) {
    if (existsSync(publicDir)) {
      for (const entry of readdirSync(publicDir)) rmSync(join(publicDir, entry), { recursive: true, force: true });
    }
    mkdirSync(dirname(worker), { recursive: true });
    cpSync(join(pdfjsDir, "legacy", "build", "pdf.worker.min.mjs"), worker);
    console.log(`[assets] pdf.js v${version} worker copied to public/pdfjs/${version}`);
  }
}

/* ---------------------------------- fonts --------------------------------- */

const FONTS = {
  "@expo-google-fonts/inter": {
    "Inter-Regular.ttf": "400Regular/Inter_400Regular.ttf",
    "Inter-Italic.ttf": "400Regular_Italic/Inter_400Regular_Italic.ttf",
    "Inter-SemiBold.ttf": "600SemiBold/Inter_600SemiBold.ttf",
    "Inter-Bold.ttf": "700Bold/Inter_700Bold.ttf",
  },
  "@expo-google-fonts/roboto": {
    "Roboto-Regular.ttf": "400Regular/Roboto_400Regular.ttf",
    "Roboto-Italic.ttf": "400Regular_Italic/Roboto_400Regular_Italic.ttf",
    "Roboto-SemiBold.ttf": "600SemiBold/Roboto_600SemiBold.ttf",
    "Roboto-Bold.ttf": "700Bold/Roboto_700Bold.ttf",
  },
  "@expo-google-fonts/montserrat": {
    "Montserrat-Regular.ttf": "400Regular/Montserrat_400Regular.ttf",
    "Montserrat-Italic.ttf": "400Regular_Italic/Montserrat_400Regular_Italic.ttf",
    "Montserrat-SemiBold.ttf": "600SemiBold/Montserrat_600SemiBold.ttf",
    "Montserrat-Bold.ttf": "700Bold/Montserrat_700Bold.ttf",
  },
  "@expo-google-fonts/merriweather": {
    "Merriweather-Regular.ttf": "400Regular/Merriweather_400Regular.ttf",
    "Merriweather-Italic.ttf": "400Regular_Italic/Merriweather_400Regular_Italic.ttf",
    "Merriweather-Bold.ttf": "700Bold/Merriweather_700Bold.ttf",
  },
  "@expo-google-fonts/playfair-display": {
    "PlayfairDisplay-Regular.ttf": "400Regular/PlayfairDisplay_400Regular.ttf",
    "PlayfairDisplay-Bold.ttf": "700Bold/PlayfairDisplay_700Bold.ttf",
  },
};

const fontDir = join(root, "public", "fonts");
mkdirSync(fontDir, { recursive: true });
for (const [pkg, files] of Object.entries(FONTS)) {
  const dir = packageDir(pkg);
  if (!dir) continue;
  for (const [name, file] of Object.entries(files)) {
    const target = join(fontDir, name);
    if (existsSync(target)) continue;
    cpSync(join(dir, file), target);
    console.log(`[assets] font ${name} copied to public/fonts`);
  }
}
