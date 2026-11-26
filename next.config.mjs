import { DEVICE_SIZES, IMAGE_SIZES } from "./scripts/image-config.mjs"

/**
 * The site is exported as plain HTML/CSS/JS files (folder `out/`) for GitHub Pages.
 *
 * NEXT_PUBLIC_BASE_PATH is the sub-folder the site is served from, e.g. "/my-repo" for
 * https://user.github.io/my-repo. Leave it empty with a custom domain. The GitHub Actions
 * workflow sets it automatically.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  // Every page is exported as folder/index.html, which every static host serves.
  trailingSlash: true,
  images: {
    // No image server on a static host: scripts/optimize-images.mjs pre-builds every size at build time.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
}

export default nextConfig
