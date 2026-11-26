/**
 * Shared by next.config.mjs (srcset widths) and scripts/optimize-images.mjs (files to generate).
 * Every width listed here gets a pre-built WebP file, so next/image can only ask for these.
 */
export const DEVICE_SIZES = [640, 828, 1080, 1280, 1920]
export const IMAGE_SIZES = [256, 384]
export const IMAGE_WIDTHS = [...IMAGE_SIZES, ...DEVICE_SIZES]

/** Folder in public/ that receives the generated files (git-ignored, rebuilt by `npm run build`). */
export const OPTIMIZED_DIR = "img-opt"

/** Social preview images (Open Graph, WhatsApp, Facebook) are cropped to this size. */
export const OG_WIDTH = 1200
export const OG_HEIGHT = 630
