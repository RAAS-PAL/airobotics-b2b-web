/* Derives the site's brand assets from the delivered artwork in
 * public/brand. Re-run after replacing any of the source PNGs:
 *   node scripts/build-brand-assets.mjs
 *
 * Sources (left as delivered, never edited):
 *   AI-ROBOTICS.png         white lockup, for the graphite header and footer
 *   AI-ROBOTICS_Symbol.png  the A mark on its own, for the app icons
 *
 * Both arrive on a generous transparent canvas — the wordmark's ink is 71% of
 * its height, the symbol's 52%. Used raw they would render a third smaller
 * than the box they sit in, so everything here is trimmed to the ink first
 * and padded back deliberately.
 *
 * sharp gotcha: .extend() is applied AFTER .resize() no matter where it sits
 * in the chain, so a resize-then-pad in one pipeline silently produces the
 * wrong size. Each icon is therefore composited onto a canvas in a second
 * pass, via toBuffer().
 */
import sharp from "sharp";

const SRC_WORDMARK = "public/brand/AI-ROBOTICS.png";
const SRC_SYMBOL = "public/brand/AI-ROBOTICS_Symbol.png";

/* ── Header / footer wordmark ────────────────────────────────────────
 * Trimmed so the image box matches the ink and `h-7` means seven units of
 * actual logo. 1400px wide is well past the ~200px it renders at, leaving
 * room for 2x displays without shipping the 8750px original. */
const wordmark = await sharp(SRC_WORDMARK)
  .trim({ threshold: 8 })
  .resize({ width: 1400 })
  .png({ compressionLevel: 9 })
  .toFile("public/brand/wordmark-white.png");

console.log(
  `wordmark-white.png       ${wordmark.width}x${wordmark.height}  (aspect ${(
    wordmark.width / wordmark.height
  ).toFixed(2)})`
);

/* ── App icons ───────────────────────────────────────────────────────
 * The mark is amber and navy. On a dark browser tab the navy all but
 * disappears, and iOS composites a transparent apple-touch-icon onto a
 * background of its own choosing — so both get an opaque white ground,
 * which is the lockup's own primary colourway. */
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 255, g: 255, b: 255, alpha: 0 };

/* Margin is the share of the square left clear on each side; ground is what
 * sits behind the mark.
 *
 * The tab icon is transparent, so it sits on the browser's own chrome rather
 * than in a white chip. The mark is 56% amber and 44% navy, and each theme
 * softens one of them — amber is 6.7:1 on a dark tab against navy's 1.8:1,
 * and the reverse on a light one. The amber A carries the shape either way.
 * It also runs nearly to the edge: at 16px every pixel counts.
 *
 * The Apple touch icon can do neither. iOS composites a transparent one onto
 * black, which would erase the navy, and masks it with a rounded rectangle of
 * roughly 22% corner radius — and the mark's widest points are its two lower
 * corners, exactly what that mask cuts. So: white ground, real margin.
 *
 * public/logo.png is the logo named in the Organization structured data,
 * which Google may show beside the company in search. Google renders it on
 * white, so it is built on white, and it needs a plain URL — the app/ icons
 * are served with a hashed query string, and the brand symbol itself is a
 * 5000px original. */
for (const [file, size, margin, ground] of [
  ["app/icon.png", 512, 0.03, CLEAR],
  ["app/apple-icon.png", 180, 0.12, WHITE],
  ["public/logo.png", 512, 0.1, WHITE],
]) {
  const inner = Math.round(size * (1 - margin * 2));

  // Pass 1: trim to the ink and scale it to fit the inner box.
  const mark = await sharp(SRC_SYMBOL)
    .trim({ threshold: 8 })
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();

  // Pass 2: centre it on the square. Never .extend() after a resize.
  await sharp({
    create: { width: size, height: size, channels: 4, background: ground },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(file);

  const { width, height } = await sharp(file).metadata();
  console.log(`${file.padEnd(24)} ${width}x${height}`);
}
