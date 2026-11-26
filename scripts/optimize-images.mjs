/**
 * Pre-builds the images for the static export (runs before `npm run dev` and `npm run build`):
 * - one WebP per width used by next/image (see lib/image-loader.ts),
 * - one 1200×630 JPEG per photo for social previews (WhatsApp, Facebook…).
 * Files that are already up to date are skipped.
 */
import { mkdir, readdir, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import { IMAGE_WIDTHS, OG_HEIGHT, OG_WIDTH, OPTIMIZED_DIR } from "./image-config.mjs"

const PUBLIC_DIR = "public"
const OUTPUT_DIR = path.join(PUBLIC_DIR, OPTIMIZED_DIR)
/** Not photos: app icons are used as they are. */
const SKIPPED_DIRS = new Set([OUTPUT_DIR, path.join(PUBLIC_DIR, "icons")])
const SOURCE_PATTERN = /\.(jpe?g|png|webp|avif)$/i

async function* findImages(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIPPED_DIRS.has(entryPath)) yield* findImages(entryPath)
    } else if (SOURCE_PATTERN.test(entry.name)) {
      yield entryPath
    }
  }
}

async function isUpToDate(target, sourceTime) {
  try {
    return (await stat(target)).mtimeMs >= sourceTime
  } catch {
    return false
  }
}

const started = Date.now()
let generated = 0
let total = 0

for await (const source of findImages(PUBLIC_DIR)) {
  const name = path.relative(PUBLIC_DIR, source).replace(SOURCE_PATTERN, "")
  const sourceTime = (await stat(source)).mtimeMs

  const targets = [
    ...IMAGE_WIDTHS.map((width) => ({
      file: path.join(OUTPUT_DIR, `${name}-${width}.webp`),
      render: (image) => image.resize({ width, withoutEnlargement: true }).webp({ quality: 75 }),
    })),
    {
      file: path.join(OUTPUT_DIR, "og", `${name}.jpg`),
      render: (image) =>
        image
          .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: sharp.strategy.attention })
          .jpeg({ quality: 80, mozjpeg: true }),
    },
  ]

  for (const target of targets) {
    total++
    if (await isUpToDate(target.file, sourceTime)) continue
    await mkdir(path.dirname(target.file), { recursive: true })
    // rotate() applies the EXIF orientation of phone photos.
    await target.render(sharp(source).rotate()).toFile(target.file)
    generated++
  }
}

console.log(`Images: ${generated} generated, ${total - generated} up to date (${((Date.now() - started) / 1000).toFixed(1)}s)`)
