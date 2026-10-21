"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Robot } from "@/lib/robots";
import { Eyebrow } from "@/components/ui";
import { localePath, type Locale } from "@/lib/i18n/config";

import l3 from "@/public/robots/fleet/l3.webp";
import l4 from "@/public/robots/fleet/l4.webp";
import l50 from "@/public/robots/fleet/l50.webp";
import sp50 from "@/public/robots/fleet/sp50.webp";
import s5 from "@/public/robots/fleet/s5.webp";
import v3 from "@/public/robots/fleet/v3.webp";

/* Front-facing trimmed cutouts, so every machine sits at a predictable scale
   as you flip through — mixed 3/4 views made the stage jump around. */
const stage: Record<
  string,
  { img: StaticImageData; beacon: { x: number; y: number } }
> = {
  l3: { img: l3, beacon: { x: 33, y: 7 } },
  l4: { img: l4, beacon: { x: 31, y: 8 } },
  l50: { img: l50, beacon: { x: 50, y: 4 } },
  sp50: { img: sp50, beacon: { x: 50, y: 4 } },
  s5: { img: s5, beacon: { x: 30, y: 6 } },
  v3: { img: v3, beacon: { x: 54, y: 8 } },
};

/* Readouts sit at the edges of the stage, NOT tethered to parts of the machine.
   An earlier pass drew a dot and leader line into the robot, which is the visual
   language of a technical annotation and implied we knew which component each
   figure belonged to. We don't — and most of these are performance rates
   (coverage, runtime, charge time) that have no physical location at all. */
const READOUTS = ["left-5 top-14", "left-5 bottom-16", "right-5 bottom-16"];

/* Fixed point-cloud: deterministic positions so server and client agree. */
const POINTS: ReadonlyArray<{ x: number; y: number; d: number; hot?: boolean }> = [
  { x: 8, y: 18, d: 0.0 }, { x: 14, y: 62, d: 1.1 }, { x: 6, y: 44, d: 2.3 },
  { x: 12, y: 82, d: 0.6 }, { x: 20, y: 30, d: 1.8, hot: true }, { x: 26, y: 10, d: 0.9 },
  { x: 88, y: 24, d: 1.4 }, { x: 93, y: 48, d: 0.3, hot: true }, { x: 86, y: 70, d: 2.0 },
  { x: 94, y: 86, d: 1.2 }, { x: 80, y: 8, d: 2.6 }, { x: 74, y: 90, d: 0.2 },
  { x: 30, y: 92, d: 1.6 }, { x: 60, y: 94, d: 2.2 }, { x: 44, y: 6, d: 1.9 },
  { x: 68, y: 14, d: 0.4 }, { x: 4, y: 70, d: 2.8, hot: true }, { x: 96, y: 12, d: 1.7 },
  { x: 10, y: 6, d: 2.1 }, { x: 90, y: 60, d: 0.8 }, { x: 24, y: 74, d: 2.5 },
  { x: 78, y: 40, d: 1.0 },
];

const CORNERS = [
  "top-3 left-3 border-t-2 border-l-2",
  "top-3 right-3 border-t-2 border-r-2",
  "bottom-3 left-3 border-b-2 border-l-2",
  "bottom-3 right-3 border-b-2 border-r-2",
] as const;

/** Machine finder. The selector is labelled by *situation* rather than model
 *  number, because a first-time visitor knows their building, not our SKUs —
 *  so the section answers "which one do I need?" instead of listing what we
 *  happen to sell. Picking a situation names the machine and says why. */
export type SpotlightStrings = {
  eyebrow: string;
  heading: string;
  intro: string;
  tablistLabel: string;
  worksIn: string;
  compare: string;
  /** contains {model} */
  viewTemplate: string;
};

export function RobotSpotlight({
  locale,
  robots,
  strings,
}: {
  locale: Locale;
  robots: Robot[];
  strings: SpotlightStrings;
}) {
  const [active, setActive] = useState(0);
  const still = useReducedMotion() ?? false;

  const robot = robots[active];
  const { img, beacon } = stage[robot.slug];
  const readouts = robot.heroStats.slice(0, 3).map((stat, i) => ({
    pos: READOUTS[i],
    value: stat.value,
    unit: stat.unit,
    label: stat.label,
  }));

  return (
    <section
      id="finder"
      aria-labelledby="finder-title"
      className="scroll-mt-16 border-b border-line bg-base"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
        {/* ── Finder ── */}
        <div>
          <Eyebrow>{strings.eyebrow}</Eyebrow>
          <h2
            id="finder-title"
            className="display mt-5 max-w-md text-3xl text-snow sm:text-4xl"
          >
            {strings.heading}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">
            {strings.intro}
          </p>

          {/* Situation-led selector: what you have, not what we stock */}
          <div
            role="tablist"
            aria-label={strings.tablistLabel}
            className="mt-7 grid grid-cols-3 gap-px border border-line bg-line"
          >
            {robots.map((r, i) => (
              <button
                key={r.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`px-2 py-3 text-center transition-colors ${
                  i === active
                    ? "bg-amber text-ink"
                    : "bg-surface hover:bg-raise"
                }`}
              >
                <span
                  className={`block text-[0.7rem] font-semibold leading-tight ${
                    i === active ? "text-ink" : "text-snow"
                  }`}
                >
                  {r.bestFor}
                </span>
                <span
                  className={`mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.1em] ${
                    i === active ? "text-ink/70" : "text-fog"
                  }`}
                >
                  {r.model}
                </span>
              </button>
            ))}
          </div>

          {/* The answer, keyed so it replays on every swap */}
          <motion.div
            key={robot.slug}
            initial={still ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <p className="flex items-baseline gap-3">
              <span className="display text-4xl text-snow sm:text-5xl">
                {robot.model}
              </span>
              <span className="stencil text-fog">{robot.kind}</span>
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-cloud">
              {robot.pickIf}
            </p>

            <div className="mt-6">
              <p className="stencil text-amber">{strings.worksIn}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {robot.environments.map((env) => (
                  <li
                    key={env}
                    className="border border-line px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-cloud"
                  >
                    {env}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localePath(locale, `/robots/${robot.slug}`)}
              className="stencil rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
            >
              {strings.viewTemplate.replace("{model}", robot.model)}
            </Link>
            <Link
              href={localePath(locale, "/robots")}
              className="stencil rounded-sm border border-snow/40 px-7 py-4 text-snow transition-colors hover:border-snow hover:bg-snow/10"
            >
              {strings.compare}
            </Link>
          </div>
        </div>

        {/* ── Scanner stage ── */}
        <div className="relative">
          <div className="grid-plate relative overflow-hidden border border-line bg-surface">
            {CORNERS.map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute z-20 h-4 w-4 border-amber/70 ${pos}`}
              />
            ))}

            <p className="absolute right-5 top-4 z-20 font-mono text-xs tabular-nums text-fog">
              <span className="text-amber">
                {String(active + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(robots.length).padStart(2, "0")}
            </p>

            {POINTS.map((p, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`absolute z-0 h-1 w-1 rounded-full ${
                  p.hot ? "bg-amber" : "bg-fog"
                }`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                animate={still ? { opacity: 0.3 } : { opacity: [0.08, 0.55, 0.08] }}
                transition={
                  still
                    ? undefined
                    : {
                        duration: 3 + (i % 5) * 0.7,
                        delay: p.d,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
            ))}

            {!still && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-4 z-10 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-amber) 20%, var(--color-amber) 80%, transparent)",
                  boxShadow: "0 0 18px 2px rgba(255, 154, 31, 0.35)",
                }}
                animate={{ top: ["7%", "90%", "7%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* keyed on slug so swapping replays the machine entrance */}
            <div
              key={robot.slug}
              className="relative mx-auto my-10 w-[52%] max-w-xs sm:my-12"
            >
              <motion.div
                initial={still ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={img}
                  alt={`${robot.model} ${robot.kind}, front view`}
                  className="relative z-[5] h-auto w-full"
                  sizes="(min-width: 1024px) 340px, 52vw"
                />
              </motion.div>

              <motion.span
                aria-hidden="true"
                className="absolute z-[6] h-6 w-6 rounded-full bg-amber blur-md"
                style={{
                  left: `${beacon.x}%`,
                  top: `${beacon.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={
                  still ? { opacity: 0.5 } : { opacity: [0.15, 0.7, 0.15] }
                }
                transition={
                  still
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>

            {/* ── Edge readouts: figures about the machine, not labels of parts ── */}
            {readouts.map((r, i) => (
              <motion.div
                key={`${robot.slug}-${r.label}`}
                className={`absolute z-20 hidden w-32 border border-line bg-base/90 px-3 py-2 backdrop-blur-sm sm:block ${r.pos}`}
                initial={still ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.18, duration: 0.4 }}
              >
                <span className="flex items-center gap-2">
                  <motion.span
                    aria-hidden="true"
                    className="block h-1.5 w-1.5 shrink-0 bg-amber"
                    animate={still ? { opacity: 0.8 } : { opacity: [0.35, 1, 0.35] }}
                    transition={
                      still
                        ? undefined
                        : {
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }
                    }
                  />
                  <span className="font-mono text-sm font-semibold tabular-nums text-snow">
                    {r.value}
                    <span className="ml-0.5 text-xs font-normal text-fog">
                      {r.unit}
                    </span>
                  </span>
                </span>
                <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fog">
                  {r.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* mobile fallback for the hidden readouts */}
          <dl className="mt-4 grid grid-cols-3 gap-px border border-line bg-line sm:hidden">
            {readouts.map((r) => (
              <div key={r.label} className="bg-surface p-3">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fog">
                  {r.label}
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-snow">
                  {r.value}
                  <span className="ml-0.5 text-xs text-fog">{r.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
