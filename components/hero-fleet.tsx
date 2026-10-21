import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Robot } from "@/lib/robots";
import { localePath, type Locale } from "@/lib/i18n/config";

import l3 from "@/public/robots/fleet/l3.webp";
import l4 from "@/public/robots/fleet/l4.webp";
import l50 from "@/public/robots/fleet/l50.webp";
import sp50 from "@/public/robots/fleet/sp50.webp";
import s5 from "@/public/robots/fleet/s5.webp";
import v3 from "@/public/robots/fleet/v3.webp";

/* The fleet stands in a single line across the aisle, all at one depth.
   `items-end` puts every machine's wheels on the same line — which works
   because the cutouts are pre-trimmed (public/robots/fleet/), so the image
   edge IS the machine's edge.

   Real machine heights sit within 9% of each other (990–1075 mm), so a
   uniform render height is visually honest as well as tidier. */
/* The floor line is svh-based so it tracks the plate, but the copy block
   below it is content-sized in px. On a short viewport svh shrinks while the
   text does not, and the machines land on the paragraph — hence the px floor.
   MIN_BASE ≈ the copy block at its tallest (subcopy + CTAs + scroll + pad). */
const LINE_BASE = 32; // svh up from the bottom of the hero — the floor line
const MIN_BASE = 290; // px — never closer to the bottom than the copy block
const LINE_HEIGHT = 18; // svh — identical for every machine

const fleet: { slug: string; img: StaticImageData }[] = [
  { slug: "l3", img: l3 },
  { slug: "l4", img: l4 },
  { slug: "l50", img: l50 },
  { slug: "sp50", img: sp50 },
  { slug: "s5", img: s5 },
  { slug: "v3", img: v3 },
];

/** Keeps the card on screen for the machines at either end of the line. */
function cardAlign(i: number, total: number) {
  if (i === 0) return "left-0";
  if (i === total - 1) return "right-0";
  return "left-1/2 -translate-x-1/2";
}

/** The fleet lined up down the aisle behind the hero copy. Hovering or
 *  focusing a machine opens its spec card; clicking opens its page. */
export function HeroFleet({
  locale,
  robots,
  viewTemplate = "View the {model} →",
}: {
  locale: Locale;
  robots: Robot[];
  viewTemplate?: string;
}) {
  const bySlug = new Map(robots.map((r) => [r.slug, r]));
  return (
    <div
      className="pointer-events-none absolute inset-x-[5%] z-20 hidden items-end justify-between lg:flex [@media(max-height:640px)]:!hidden"
      style={{ bottom: `max(${LINE_BASE}svh, ${MIN_BASE}px)` }}
    >
      {fleet.map((unit, i) => {
        const robot = bySlug.get(unit.slug);
        if (!robot) return null;

        return (
          <Link
            key={unit.slug}
            href={localePath(locale, `/robots/${unit.slug}`)}
            aria-label={`${robot.model} — ${robot.kind}`}
            className="fleet-unit group pointer-events-auto relative block hover:z-30 focus-visible:z-30"
            style={{ animationDelay: `${0.3 + i * 0.12}s` }}
          >
            {/* Light spilling from under the chassis onto the wet floor.
                Sits behind the machine so the chassis stays crisp against it.
                Positioning lives here; the child owns the animated transform. */}
            <span
              className="absolute bottom-0 left-1/2 block -translate-x-1/2 translate-y-[38%]"
              style={{
                width: "165%",
                height: `calc(${LINE_HEIGHT}svh * 0.3)`,
              }}
            >
              <span
                className="fleet-glow block h-full w-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,193,96,0.55) 0%, rgba(255,154,31,0.24) 42%, transparent 72%)",
                  animationDelay: `${i * 0.53}s`,
                }}
              />
            </span>

            {/* Hover affordance: a pinging marker above the machine. Retreats
                as soon as the pointer arrives and the card takes over. */}
            <span className="absolute bottom-full left-1/2 mb-3 block h-2.5 w-2.5 -translate-x-1/2 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
              <span className="hotspot-ring absolute inset-0 block rounded-full border border-amber" />
              <span className="absolute inset-0 block rounded-full bg-amber/80" />
            </span>

            <Image
              src={unit.img}
              alt=""
              className="relative w-auto transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.07]"
              style={{ height: `${LINE_HEIGHT}svh` }}
              sizes="14vw"
            />

            {/* Spec card — hidden until the machine is hovered or focused.
                It opens upward, which needs about 290px of clear space above
                the machine. The fleet is anchored to the bottom of the hero,
                so on a short viewport the machines sit high and that space
                isn't there: the card ran past the top of the section, where
                `overflow-hidden` clipped it and the sticky header (z-50, in
                an outer stacking context this one can't escape) covered what
                was left. Below 820svh it opens downward instead, where the
                290px the fleet is held off the floor is exactly the room it
                needs. It crosses the hero copy while open, which is a fair
                trade for a state that only exists under the pointer. */}
            <span
              className={`invisible absolute bottom-full mb-5 block w-72 translate-y-2 border border-line bg-surface/95 p-5 opacity-0 shadow-2xl backdrop-blur-md transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(max-height:820px)]:bottom-auto [@media(max-height:820px)]:top-full [@media(max-height:820px)]:mb-0 [@media(max-height:820px)]:mt-3 ${cardAlign(
                i,
                fleet.length
              )}`}
            >
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fog">
                {robot.kind}
              </span>
              <span className="display mt-1 block text-2xl text-snow">
                {robot.model}
              </span>
              <span className="display mt-1 block text-sm text-amber">
                {robot.tagline}
              </span>

              <span className="mt-4 block border-t border-line pt-3">
                {robot.heroStats.slice(0, 3).map((stat) => (
                  <span
                    key={stat.label}
                    className="flex items-baseline justify-between gap-3 py-1"
                  >
                    <span className="text-[0.7rem] text-fog">{stat.label}</span>
                    <span className="font-mono text-xs tabular-nums text-snow">
                      {stat.value}
                      <span className="ml-0.5 text-fog">{stat.unit}</span>
                    </span>
                  </span>
                ))}
              </span>

              <span className="mt-3 block border-t border-line pt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-amber">
                {viewTemplate.replace("{model}", robot.model)}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
