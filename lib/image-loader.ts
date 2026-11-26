/**
 * next/image loader for the static export: points to the WebP files pre-built by
 * scripts/optimize-images.mjs ("/img_guide/guide_04.jpg" at 640px → "/img-opt/img_guide/guide_04-640.webp").
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  // Remote images and SVGs are used as they are.
  if (!src.startsWith("/") || src.endsWith(".svg")) return src
  const name = src.replace(/\.(jpe?g|png|webp|avif)$/i, "")
  return encodeURI(`${basePath}/img-opt${name}-${width}.webp`)
}
