import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RobotCard } from "@/components/robot-card";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { QuoteBand } from "@/components/quote-band";
import { pageMetadata } from "@/lib/page-metadata";
import { getDictionary, translator, type T } from "@/lib/i18n/dictionary";
import { localizeRobots } from "@/lib/i18n/localize-robots";
import { isLocale, localePath, localeUnits, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/robots">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = translator(await getDictionary(lang));
  return pageMetadata({
    t,
    locale: lang,
    path: "/robots",
    title: t("FLEET.meta_title"),
    description: t("FLEET.meta_description"),
  });
}

/** slug → row value */
type CompareRow = { label: string; values: Record<string, string> };

/* Rows are built per-locale: the label and the prose cells come from the
   dictionary, and the productivity figures switch to metric for Thai so they
   agree with the metric prose everywhere else on the page. */
function buildCompareRows(t: T, units: "metric" | "imperial"): CompareRow[] {
  const imperial = units === "imperial";
  return [
  {
    label: t("FLEET.table.row_job"),
    values: {
      l3: t("FLEET.table.l3.job"),
      l4: t("FLEET.table.l4.job"),
      l50: t("FLEET.table.l50.job"),
      sp50: t("FLEET.table.sp50.job"),
      s5: t("FLEET.table.s5.job"),
    },
  },
  {
    label: t("FLEET.table.row_productivity"),
    // Metric in both locales: m²/h is the figure the manufacturer
    // publishes first, and the market this sells into works in it.
    values: {
      l3: "2,016 m²/h",
      l4: "1,944 m²/h",
      l50: "2,203 m²/h",
      sp50: `15,550 m²/h ${t("FLEET.table.productivity_spot")}`,
      s5: "2,500 m²/h",
    },
  },
  {
    label: t("FLEET.table.row_passage"),
    values: imperial
      ? {
          l3: "700 mm / 27.6 in",
          l4: "810 mm / 31.9 in",
          l50: "920 mm / 36.2 in",
          sp50: "800 mm / 31.5 in",
          s5: "810 mm / 31.9 in",
        }
      : { l3: "700 mm", l4: "810 mm", l50: "920 mm", sp50: "800 mm", s5: "810 mm" },
  },
  {
    label: t("FLEET.table.row_tank"),
    values: {
      l3: `25 L ${t("FLEET.table.tank_solution")}`,
      l4: `38 L ${t("FLEET.table.tank_solution")}`,
      l50: `55 L ${t("FLEET.table.tank_solution")}`,
      sp50: `18 L ${t("FLEET.table.tank_dustbag")}`,
      s5: `50 L ${t("FLEET.table.tank_hopper")}`,
    },
  },
  {
    label: t("FLEET.table.row_compute"),
    values: {
      l3: "100 TOPS",
      l4: "32 TOPS",
      l50: t("FLEET.table.l50.compute"),
      sp50: t("FLEET.table.sp50.compute"),
      s5: "100 TOPS",
    },
  },
  {
    label: t("FLEET.table.row_lidar"),
    values: {
      l3: "96-beam 3D",
      l4: "32-beam 3D",
      l50: t("FLEET.table.l50.lidar"),
      sp50: t("FLEET.table.sp50.lidar"),
      s5: "32-beam 3D",
    },
  },
  {
    label: t("FLEET.table.row_runtime"),
    values: {
      l3: t("FLEET.table.l3.runtime"),
      l4: t("FLEET.table.l4.runtime"),
      l50: t("FLEET.table.l50.runtime"),
      sp50: t("FLEET.table.sp50.runtime"),
      s5: t("FLEET.table.s5.runtime"),
    },
  },
  {
    label: t("FLEET.table.row_bestfor"),
    values: {
      l3: t("FLEET.table.l3.bestfor"),
      l4: t("FLEET.table.l4.bestfor"),
      l50: t("FLEET.table.l50.bestfor"),
      sp50: t("FLEET.table.sp50.bestfor"),
      s5: t("FLEET.table.s5.bestfor"),
    },
  },
  ];
}

export default async function FleetPage({
  params,
}: PageProps<"/[lang]/robots">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = translator(dict);
  const robots = localizeRobots(dict, locale);
  const compareRows = buildCompareRows(t, localeUnits[locale]);
  const cardStrings = {
    view: t("ROBOTDETAIL.card_view"),
    photoPlaceholder: t("ROBOTDETAIL.card_photo_placeholder"),
  };

  return (
    <>
      <section className="border-b border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:pt-20">
          <Reveal>
            <Eyebrow>{t("FLEET.hero.eyebrow")}</Eyebrow>
            <h1 className="display mt-4 max-w-3xl text-4xl text-snow sm:text-5xl">
              {t("FLEET.hero.heading")}
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-fog">
              {t("FLEET.hero.body")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {robots.map((robot, i) => (
              <Reveal key={robot.slug} delay={(i % 3) * 80} className="h-full">
                <RobotCard robot={robot} locale={locale} strings={cardStrings} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────── */}
      <section className="border-t border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <Eyebrow>{t("FLEET.table.eyebrow")}</Eyebrow>
            <h2 className="display mt-4 text-3xl text-snow sm:text-4xl">
              {t("FLEET.table.heading")}
            </h2>
          </Reveal>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="sr-only">{t("FLEET.table.row_job")}</th>
                  {robots.map((r) => (
                    <th
                      key={r.slug}
                      scope="col"
                      className="border-b-2 border-amber px-4 pb-4 text-left"
                    >
                      <Link
                        href={localePath(locale, `/robots/${r.slug}`)}
                        className="display text-lg text-snow hover:text-amber"
                      >
                        {r.model}
                      </Link>
                      <p className="mt-1 font-sans text-xs font-normal normal-case tracking-normal text-fog">
                        {r.kind}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th
                      scope="row"
                      className="stencil py-4 pr-4 text-left align-top text-fog"
                    >
                      {row.label}
                    </th>
                    {robots.map((r) => (
                      <td
                        key={r.slug}
                        className="px-4 py-4 align-top font-mono text-xs text-cloud"
                      >
                        {row.values[r.slug]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="sr-only" scope="row">
                    {t("FLEET.table.cta")}
                  </th>
                  {robots.map((r) => (
                    <td key={r.slug} className="px-4 py-5 align-top">
                      <Link
                        href={localePath(locale, `/quote?robot=${r.slug}`)}
                        className="stencil text-amber hover:text-amber-hot"
                      >
                        {t("FLEET.table.cta")}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <QuoteBand locale={locale} />
    </>
  );
}
