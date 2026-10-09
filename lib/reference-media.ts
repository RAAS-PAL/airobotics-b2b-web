import type { StaticImageData } from "next/image";
import { media as mediaUrl } from "@/lib/media";

type MediaCommon = {
  alt: string;
  caption?: string;
  /** How the clip meets the 16:9 frame. "cover" fills it and crops whatever
   *  overhangs; "contain" fits the whole frame inside and letterboxes the
   *  rest. Site footage is filmed in whatever shape the phone was held, so a
   *  portrait clip loses two thirds of its height to a crop — use "contain"
   *  when none of it can be spared. Defaults to cover. */
  fit?: "cover" | "contain";
  /** Which part survives a "cover" crop — point it at the subject. Ignored
   *  when fit is "contain", since nothing is cropped. Defaults to center. */
  focus?: "top" | "center" | "bottom";
  /** Slug of the entry in lib/references.ts this was shot at. Footage with a
   *  slug plays on that customer's testimonial card, next to what they said,
   *  rather than in the gallery below. Leave it off for anything that isn't
   *  tied to a named customer — that still belongs in the gallery. */
  reference?: string;
};

export type MediaItem = MediaCommon &
  (
    | {
        kind: "photo";
        src: StaticImageData;
      }
    | {
        kind: "video";
        /** a file in public/reference/, or a full https:// URL (e.g. the S3 media host) */
        src: string;
        /** still frame shown before play. Local import or a URL — strongly
         *  recommended, otherwise the player shows a black rectangle. */
        poster?: StaticImageData | string;
      }
    | {
        kind: "youtube";
        /** the id only, not the full URL — e.g. "dQw4w9WgXcQ" */
        id: string;
      }
  );

/** A clip in the media bucket (lib/media.ts) and its poster still. S3 serves
 *  files as uploaded, so both are real files: `<file>` is an H.264 .mp4 with
 *  its index at the front, and `<name>-poster.jpg` its first frame. */
function s3Video(file: string) {
  const name = file.replace(/(-web)?\.mp4$/, "");
  return {
    src: mediaUrl(`AIRobotic/${file}`),
    poster: mediaUrl(`AIRobotic/${name}-poster.jpg`),
  };
}

/* Deployment photography and video. See public/reference/README.md for what
 * to shoot and how to add more. */
export const media: MediaItem[] = [
  {
    kind: "video",
    reference: "aspirus-hospital",
    ...s3Video("Aspirus_Hospital_qkjfoy-web.mp4"),
    alt: "AI Robotics deployment footage from Aspirus Hospital, Wausau, Wisconsin",
    caption: "Aspirus Hospital — Wausau, Wisconsin",
  },
  {
    kind: "video",
    reference: "beacon-hill",
    fit: "contain", // shot portrait — a 16:9 crop would lose most of it
    ...s3Video("Beacon_Hill_ifegdw-web.mp4"),
    alt: "AI Robotics deployment footage from Beacon Hill, Detroit, Michigan",
    caption: "Beacon Hill — Detroit, Michigan",
  },
  {
    kind: "video",
    reference: "inn-of-the-mountain-gods",
    ...s3Video("IMG_l9bhes.mp4"),
    alt: "AI Robotics deployment footage from Inn of the Mountain Gods, Albuquerque, New Mexico",
    caption: "Inn of the Mountain Gods — Albuquerque, New Mexico",
  },
];

/** The footage for one customer's card, if any was shot there. */
export function mediaForReference(slug: string): MediaItem | undefined {
  return media.find((m) => m.reference === slug);
}

/** What the gallery shows: everything not already playing on a card, so the
 *  same clip never appears twice on the page. */
export const galleryMedia: MediaItem[] = media.filter((m) => !m.reference);
