/**
 * Deployment footage lives in the S3 bucket `findmyrobo-media` (Singapore),
 * shared with FindMyRobo and served through CloudFront. The bucket is
 * private; only the CloudFront distribution can read it. This site's files
 * are under `AIRobotic/`.
 *
 * S3 serves files exactly as uploaded — unlike Cloudinary, it converts
 * nothing on request. So upload an H.264 .mp4 with its index at the front
 * (`ffmpeg -i in.mov -c copy -movflags +faststart out-web.mp4`) and a poster
 * still beside it (`-poster.jpg`). A `-web` file next to an original is the
 * copy the site actually plays.
 *
 * NEXT_PUBLIC_MEDIA_BASE_URL moves every media link to another address
 * without a code change. On Vercel, redeploy after changing it — NEXT_PUBLIC_
 * values are fixed when the site is built. Unset, the CloudFront address is
 * used.
 */

const DEFAULT_MEDIA_BASE_URL = "https://d5hk9n8my7l32.cloudfront.net";

export const mediaBaseUrl = (
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim() || DEFAULT_MEDIA_BASE_URL
).replace(/\/$/, "");

/** Full URL for a bucket key; folder names with spaces are encoded. */
export const media = (key: string) =>
  `${mediaBaseUrl}/${key.split("/").map(encodeURIComponent).join("/")}`;
