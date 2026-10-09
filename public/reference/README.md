# Reference media drop

Photos and video from live deployments. Drop files here, then wire them up in
`lib/reference-media.ts` — the gallery reads from that file, not from this
folder directly, so nothing appears until it is listed there.

Until then the page shows an honest "footage in progress" panel. **Do not fill
the gap with stock imagery** — invented proof on a reference page is worse than
no proof.

## Photos

Any filename. Prefer real sites over studio shots: a machine working a hospital
corridor at 2am is worth more than a clean render, because the render is what
every competitor already has.

| Want | Why |
|---|---|
| The machine *working*, not posed | proof of deployment |
| Recognisable environment | buyers picture their own building |
| Wide enough to read the space | a close-up could be anywhere |
| 1600px+ on the long edge | the gallery crops to 16:9 |

Avoid anything with identifiable patient faces, staff badges, or customer
signage you do not have permission to publish.

## Video

**Short clips (under ~10 MB)** — drop the `.mp4` here and reference it by path,
e.g. `/reference/aspirus-night.mp4`. Also supply a poster still; without one the
player shows a black rectangle until it loads.

**Clips kept in the media bucket** (S3, folder `AIRobotic/`; the current site
footage lives there) — upload the `.mp4` with its poster as `<name>-poster.jpg`
next to it, then add it with `s3Video("<file>.mp4")`. How to prepare the files
is at the top of `lib/media.ts`; the address can be moved with
`NEXT_PUBLIC_MEDIA_BASE_URL`.

**Anything longer** — put it on YouTube and use the `youtube` kind with just the
video id. Self-hosting large files bloats the repo and slows the page, and the
embed is privacy-friendly (`youtube-nocookie`).

Encode as H.264 MP4. Silent, looping B-roll works well; if there is narration,
it needs captions.

## Wiring it up

Open `lib/reference-media.ts` and add entries to the `media` array. The file has
a worked example in its comments. Three kinds are supported: `photo`, `video`
and `youtube`.

Ask and I'll wire the files in — it takes a minute and I'll write the alt text.
