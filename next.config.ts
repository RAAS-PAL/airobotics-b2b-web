import type { NextConfig } from "next";
import { mediaBaseUrl } from "./lib/media";

const mediaHost = new URL(mediaBaseUrl);

const nextConfig: NextConfig = {
  images: {
    /* Next 16 restricts /_next/image to an allowlist of quality values —
       without one, any caller could request q=1..100 and mint a hundred
       cache entries per image. 92 is here for the hero plate, whose dark
       gradients band at the default 75. */
    qualities: [75, 92],

    /* Reference media is hosted in S3 (lib/media.ts) rather than committed,
       so deployment footage never bloats the repo. Scoped to that host's
       AIRobotic/ folder only — remote image config is a fetch-on-behalf-of
       primitive, so it stays as narrow as it can be. The host follows
       NEXT_PUBLIC_MEDIA_BASE_URL. */
    remotePatterns: [
      {
        protocol: mediaHost.protocol.replace(":", "") as "https" | "http",
        hostname: mediaHost.hostname,
        pathname: `${mediaHost.pathname.replace(/\/$/, "")}/AIRobotic/**`,
      },
    ],
  },

  async redirects() {
    return [
      /* /contact used to be the quote form and is now the contact details,
         so links carrying a machine — sent in emails, or bookmarked from a
         robot page — would land somewhere that ignores the parameter. Only
         requests that actually carry ?robot= are moved on; a plain /contact
         is a real page and stays put. Temporary, because the destination is
         a redirect target rather than the canonical home of those links. */
      {
        source: "/:lang(en|th)/contact",
        has: [{ type: "query", key: "robot", value: "(?<robot>.*)" }],
        destination: "/:lang/quote?robot=:robot",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
